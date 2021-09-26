const notificationService = require('../services/notifications');

module.exports = class ChannelProcessor {
    constructor(channel) {
        this.channel = channel;
        this.instant = new Date(0);
    }

    run() {
        const notificationList = notificationService.getNotifications(this.channel.channelId, this.instant);
        // notificationList.forEach(notification => console.log(this.channel.subscriber + " " + notification['message']));
        notificationList.forEach(notification => notificationService.sendNotification(this.channel.subscriber, notification));
    }
}

