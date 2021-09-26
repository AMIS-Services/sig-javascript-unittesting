const subscriptionService = require('../../services/subscriptions');
const notificationService = require('../../services/notifications');
const processor = require('../../processor/subscriptionProcessor');

jest.mock('../../services/subscriptions');
jest.mock('../../services/notifications');

test('send notifications', () => {
    testlist = [{
        id: '1',
        api: '1',
        subscriber: 'Piet',
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
        subscriber: 'Jan',
        clientId: '55',
        sessionId: '87776',
        channelId: '2',
        subscribedAt: '2021-06-19T18:00:00',
        unsubscribedAt: '2021-06-20T19:00:00',
        sessionRemovedAt: '2021-06-20T20:00:00'
    }];
    const mockGetActive = subscriptionService.getActive.mockReturnValue(testlist);

    notificationList1 = [{
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
    }]
    notificationList2 = [
    {
        id: '2',
        channelId: '2',
        message: 'message3',
        createdAt: '2021-07-18T21:02:00'
    }]
    const mockGetNotifications = notificationService.getNotifications.mockImplementation((x, y) => { if (x === '1') {return notificationList1;} else { return notificationList2;}});
    const mockSendNotification = notificationService.sendNotification;

    processor.sendNotifications();

    expect(mockGetActive).toHaveBeenCalled();
    expect(mockGetNotifications).toHaveBeenCalled();
    expect(mockGetActive).toHaveBeenCalled();
    expect(mockSendNotification).toHaveBeenCalled();

    expect(mockSendNotification.mock.calls.length).toBe(3);
    expect(mockSendNotification.mock.calls[0][0]).toBe('Piet');
    expect(mockSendNotification.mock.calls[0][1]).toEqual(notificationList1[0]);
    expect(mockSendNotification.mock.calls[1][0]).toBe('Piet');
    expect(mockSendNotification.mock.calls[1][1]).toEqual(notificationList1[1]);
    expect(mockSendNotification.mock.calls[2][0]).toBe('Jan');
    expect(mockSendNotification.mock.calls[2][1]).toEqual(notificationList2[0]);
});