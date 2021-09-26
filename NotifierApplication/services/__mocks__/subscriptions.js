const subscriptions = jest.createMockFromModule('./subscriptions');

const resp = [{
    id: '1',
    api: '1',
    subscriber: 'John',
    clientId: '1',
    sessionId: '111111111',
    channelId: '1',
    subscribedAt: '2021-06-19T18:00:00',
    unsubscribedAt: null,
    sessionRemovedAt: null
},
{
    id: '2',
    api: '1',
    subscriber: 'Jane',
    clientId: '1',
    sessionId: '999999999',
    channelId: '1',
    subscribedAt: '2021-06-18T21:02:00'
}];

function getActive (channel) {
    return resp;
}

module.exports = {
    getActive
}    