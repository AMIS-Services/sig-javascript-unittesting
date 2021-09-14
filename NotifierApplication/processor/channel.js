const DOUBLE_HASHTAG = "##";

module.exports = class Channel {
    constructor(channelId, secret, value){
        this.channelId = channelId;
        this.subscriber = secret;
        this.value = value;

        const pos = value ? value.indexOf(DOUBLE_HASHTAG) : 0;
        if (pos > 0) {
            this.credential = value.substring(pos+2);
        } else {
            this.credential = "";
        }
    }

    equals(other){
        if (this == other) {
            return true;
        }
        if (other instanceof Channel) {
            if (this.subscriber.equals((other).getSubscriber())) {
                return true;
            }
        }
        return false;
    }
}
