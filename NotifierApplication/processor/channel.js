const DOUBLE_HASHTAG = "##";

class Channel {
    constructor(secret, value){
        this.subscriber = secret;
        this.value = value;

        const pos = String.isEmpty(value) ? 0 : value.indexOf(DOUBLE_HASHTAG);
        if (pos > 0) {
            this.channelId = value.substring(0, pos);
            this.credential = value.substring(pos+2);
        } else {
            this.channelId = secret;
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