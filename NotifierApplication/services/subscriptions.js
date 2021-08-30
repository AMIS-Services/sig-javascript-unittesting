list = [{
    id: '1',
    api: '1',
    subscriber: '1',
    clientId: '1',
    sessionId: '111111111',
    channelId: '1',
    subscribedAt: '2021-06-19T18:00:00',
    unsubscribedAt: '2021-06-20T19:00:00',
    sessionRemovedAt: '2021-06-20T20:00:00'
},
{
    id: '2',
    api: '1',
    subscriber: '3',
    clientId: '1',
    sessionId: '999999999',
    channelId: '1',
    subscribedAt: '2021-06-18T21:02:00'
}]

addedList = [{
    id: '20',
    api: '1',
    subscriber: '1',
    clientId: '1',
    sessionId: '5432534',
    channelId: '1',
    subscribedAt: '2021-07-19T18:00:00',
},
{
    id: '21',
    api: '1',
    subscriber: '3',
    clientId: '1',
    sessionId: '411234',
    channelId: '1',
    subscribedAt: '2021-07-18T21:02:00'
}]

function getActive (channel) {
    return list.filter(function(e) {
        return e.unsubscribedAt == null &&
            e.sessionRemovedAt == null;
    });
}

function getAdded (channel, instant) {
    return addedList.filter(function(e) {
        return e.unsubscribedAt == null &&
            e.sessionRemovedAt == null;
    });
}

function getEnded (channel, instant) {
    return list.filter(function(e) {
        return e.sessionRemovedAt != null;
    });
}

module.exports = {
    getActive,
    getAdded,
    getEnded
}