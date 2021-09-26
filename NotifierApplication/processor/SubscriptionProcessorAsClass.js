const subscriptionService = require("../services/subscriptions");
const vaultService = require("../services/vault");
const ChannelProcessor = require("./channelProcessor");
const Channel = require("./channel");

module.exports = class SubscriptionProcessor {

    channelProcessors;

    channels;

    activeList;

    constructor() {
        this.channelProcessors = new Map();
        this.channels = new Map();
    }

    determineChannelMap(subscriptions) {
        let channels = new Map();
        subscriptions.forEach(subscription => {
            secret = subscription['channelId'];
            subscriber = subscription['subscriber'];
            key = subscriber + "|" + secret;
            if (!channels.get(key)) {
                channel = new Channel(secret, subscriber, vaultService.getSecret(secret));
                channels.set(key, channel);
            }
        });
        return channels;
    }

    getProcessorsForActiveSubscriptions() {
        //let activeList = [];
        let activeList = subscriptionService.getActive("Api01");        
        let channels = this.determineChannelMap(activeList);
        return this.createChannelProcessors(channels, activeList);
        //return createChannelProcessors(channels, activeList);
    }

    getProcessorsForAddedSubscriptions() {
        mostRecent = determineMostRecent(channelProcessors.keys());
        addedList = subscriptionService.getAdded("Api01", mostRecent);
        channels = determineChannelMap(addedList);
        return createChannelProcessors(channels, addedList);
    }

    determineMostRecent(subscriptions) {
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

    createChannelProcessors(channels, subscriptions) {
        result = new Map();
        subscriptions.forEach(subscription => {
            channel = channels.get(subscription.subscriber + "|" + subscription.channelId);
            if (channel != null) {
                proc = new ChannelProcessor(channel);
                result.set(subscription, proc);
            }
        });
        return result;
    }

    sendNotifications() {
        channelProcessors = getProcessorsForActiveSubscriptions();
        added = getProcessorsForAddedSubscriptions();
        if (added.size > 0) {
            added.forEach((value, key) => {
                channelProcessors.set(key, value);
            });
        }

        if (channelProcessors.size > 0) {
            channelProcessors.forEach((channelProcessor) => {
                console.log("channel = " + channelProcessor.channel.channelId);
                channelProcessor.run();
            });
        }
        return;
    }
}

// module.exports = {
//     sendNotifications
// }