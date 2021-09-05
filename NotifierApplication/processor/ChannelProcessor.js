const instant = instant.EPOCH;
const channel = require('./channel');
const notificationService = require('../services/notificationService');

class ChannelProcessor {
    constructor(channel, notificationService) {
        this.channel = channel;
        this.notificationService = notificationService;
    }

    run() {
        const notificationList = notificationService.getNotifications(channel.getChannelId(), instant);
        const optional = notificationList.stream().filter(notification => notification.getCreatedAt() != null).map(Notification => Notification.getCreatedAt).max(Instant => Instant.compareTo);
        if (optional.isPresent()) this.instant = optional.get();
        notificationList.forEach(notification => System.out.println(notification.getMessage()));
    }
}

module.exports = {
    ChannelProcessor,
    run
}