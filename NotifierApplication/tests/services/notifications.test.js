notifications = require('../../services/notifications');

test('testGetNotification', () => {
    const testList = [{
        id: '1',
        channelId: '1',
        message: 'testMessage1',
        createdAt: '2021-06-18T21:02:00'
    },
    {
        id: '2',
        channelId: '1',
        message: 'testMessage2',
        createdAt: '2021-07-18T21:02:00'
    },
    {
        id: '3',
        channelId: '2',
        message: 'testMessage3',
        createdAt: '2021-06-18T21:02:00'
    },
    {
        id: '4',
        channelId: '2',
        message: 'testMessage4',
        createdAt: '2021-07-18T21:02:00'
    },
    {
        id: '5',
        channelId: '2',
        message: 'testMessage5',
        createdAt: '2021-08-18T21:02:00'
    }]

    let channelId = "1";
    let instant = Date.parse("2021-06-01T12:00:00");

    notifications.notificationList

    let result = notifications.getNotifications(channelId, instant);

    console.log(result);
    //verify the outcome
    expect(result.length).toBe(2);
    expect(result[0]['message']).toBe('message1');
});
