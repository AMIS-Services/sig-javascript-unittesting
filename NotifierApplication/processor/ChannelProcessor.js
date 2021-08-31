

var ChannelProcessor = function (channel, notificationService) {
    this._channel = channel;
};

module.exports = {
    ChannelProcessor
}


// class ChannelProcessor {

//     instant = Instant.EPOCH;
//     notificationService = 1;
//     channel = new Channel();

//     ChannelProcessor(channel, notificationService) {
//         this.channel = channel;
//         this.notificationService = notificationService;
//     }

//     run() {
//         var notificationList = notificationService.getNotifications(channel.getChannelId(), instant);
//         var optional = notificationList.stream().filter(notification => notification.getCreatedAt() != null).map(Notification => Notification.getCreatedAt).max(Instant => Instant.compareTo);
//         if (optional.isPresent()) this.instant = optional.get();
//         notificationsList.forEach(notification => System.out.println(notification.getMessage()));
//     }
// }
