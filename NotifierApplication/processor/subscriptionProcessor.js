const subscriptionService = require("../services/subscriptions");
const vaultService = require("../services/vault");
const channelProcessor = require("./channelProcessor");
let notificationService = 1;

let channelProcessors = new Map();

function getProcessorsForActiveSubscriptions() {
    activeList = subscriptionService.getActive("Api01");
    channels = determineChannelMap(activeList);
    return createChannelProcessors(channels, activeList);
}

function getProcessorsForAddedSubscriptions() {
    mostRecent = determineMostRecent(channelProcessors.keys());
    addedList = subscriptionService.getAdded("Api01", mostRecent);
    channels = determineChannelMap(addedList);
    return createChannelProcessors(channels, addedList);
}

function determineMostRecent(subscriptions) {
    mostRecentSub = subscriptions.next();
    maxValue = new Date(mostRecentSub['subscribedAt']);
    for (const subscription of subscriptions) {
        currValue = new Date(subscription['subscribedAt']);
        if (currValue > maxValue) {
            maxValue = currValue;
            mostRecentSub = subscription;
        }
    }
    return mostRecentSub;
}

// function determineLastEnded(subscriptions) {
//     return subscriptions.stream().filter(subscription -> subscription.getEnd() != null).map(Subscription::getUnsubscribedAt).max(Instant::compareTo);
// }

function determineChannelMap(subscriptions) {
    channels = new Map();
    subscriptions.forEach(subscription => {
        secret = subscription['subscriber'];
        if (!channels.get(secret)) {
            channel = new Channel(secret, vaultService.getSecret(secret));
            channels.set(secret, channel);
        }
    });
    return channels;
}

function createChannelProcessors(channels, subscriptions) {
    result = new Map();
    subscriptions.forEach(subscription => {
        channel = channels.get(subscription.subscriber);
        if (channel != null) {
            proc = new channelProcessor.ChannelProcessor(channel, notificationService);
            result.set(subscription, proc);
        }
    });
    return result;
}

function sendNotifications() {
    channelProcessors = getProcessorsForActiveSubscriptions();
    added = getProcessorsForAddedSubscriptions();
    if (added.size > 0) {
        added.forEach((value, key) => {
            channelProcessors.set(key, value);
        });
    }
    // ended = getProcessorsForEndedSubscriptions();
    // if (!ended.isEmpty()) {
    //     ended.values().forEach(channelProcessor -> channelProcessors.remove(channelProcessor));
    // }
    if (channelProcessors.size > 0) {
        channelProcessors.forEach((value) => {
            console.log("channel = " + value._channel._channelId);
            // channelProcessor.run();
        });
    }
    return;
}

var Channel = function (secret, value) {
    this.secret = secret;
    this._value = value;
    pos = value ? 0 : value.indexOf("##");
    if (pos > 0) {
        this._channelId = value.substring(0, pos);
        this._credential = value.substring(pos+2);
    } else {
        this._channelId = secret;
        this._credential = "";
    }
};


module.exports = {
    sendNotifications
}