list = [{
        id: '1',
        channelId: '1',
        message: 'message1',
        createdAt: '2021-06-18T21:02:00'
    },
    {
        id: '2',
        channelId: '1',
        message: 'message2',
        createdAt: '2021-07-18T21:02:00'
    },
    {
        id: '3',
        channelId: '2',
        message: 'message3',
        createdAt: '2021-06-18T21:02:00'
    },
    {
        id: '4',
        channelId: '2',
        message: 'message4',
        createdAt: '2021-07-18T21:02:00'
    },
    {
        id: '5',
        channelId: '2',
        message: 'message5',
        createdAt: '2021-08-18T21:02:00'
    }]

function getNotifications(channelId, instant) {
    assert(channelId != null, "Channel must not be null");
    assert(channelId.size() > 0, "Channel must not be empty");
    return list.filter(function (e) {
        return e.channelId == channelId &&
            e.createdAt > instant;
    });
}

function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}

function getAll() {
    return list;
}

module.exports = {
    getNotifications,
    getAll
}