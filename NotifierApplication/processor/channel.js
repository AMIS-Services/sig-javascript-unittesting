const DOUBLE_HASHTAG = "##";

class Channel {
    subscriber;
    channelId;
    value;
    credential;
  
    constructor(secret, value){
        this.subscriber = secret;
        this.value = value;

        var pos = String.isEmpty(value) ? 0 : value.indexOf(DOUBLE_HASHTAG);
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



//     /**
//      * Constructor method
//      * @param secret a name that uniquely identifies a channel
//      * @param value a combined value of channel name, double hash tag and password
//      */
//     public Channel(final String secret, final String value) {
//         this.subscriber = secret;
//         this.value = value;
//         final int pos = StringUtils.isEmpty(value) ? 0 : value.indexOf(DOUBLE_HASHTAG);
//         if (pos > 0) {
//             this.channelId = value.substring(0, pos);
//             this.credential = value.substring(pos+2);
//         } else {
//             this.channelId = secret;
//             this.credential = StringUtils.EMPTY;
//         }
//     }

//     public boolean equals(Object other) {
//         if (this == other) {
//             return true;
//         }
//         if (other instanceof Channel) {
//             if (this.subscriber.equals(((Channel) other).getSubscriber())) {
//                 return true;
//             }
//         }
//         return false;
//     }
// }

