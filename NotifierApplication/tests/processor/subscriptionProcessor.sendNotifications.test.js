const subscriptionService = require('../../services/subscriptions');
const notificationService = require('../../services/notifications');
const processor = require('../../processor/subscriptionProcessor');


jest.mock('../../services/subscriptions');
jest.mock('../../services/notifications');

afterEach(() => {
    jest.clearAllMocks();
  });

test('send notifications', () => {
    const testlist = [{
        id: '1',
        api: '1',
        subscriber: 'Hein',
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
        subscriber: 'Suzanne',
        clientId: '55',
        sessionId: '87776',
        channelId: '2',
        subscribedAt: '2021-06-19T18:00:00',
        unsubscribedAt: '2021-06-20T19:00:00',
        sessionRemovedAt: '2021-06-20T20:00:00'
    }];
    subscriptionService.getActive = jest.fn();
    subscriptionService.getAdded = jest.fn();
    const mockGetActive = subscriptionService.getActive.mockReturnValue(testlist);

    const notificationList1 = [{
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
    const notificationList2 = [
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

    // Mock is called 3 times
    expect(mockSendNotification.mock.calls.length).toBe(3);
    // First argument of first call is Hein
    expect(mockSendNotification.mock.calls[0][0]).toBe('Hein');
    // Second argument of first call is first element of notificationList1
    expect(mockSendNotification.mock.calls[0][1]).toEqual(notificationList1[0]);
    // First argument of second call is Hein
    expect(mockSendNotification.mock.calls[1][0]).toBe('Hein');
    expect(mockSendNotification.mock.calls[1][1]).toEqual(notificationList1[1]);
    expect(mockSendNotification.mock.calls[2][0]).toBe('Suzanne');
    expect(mockSendNotification.mock.calls[2][1]).toEqual(notificationList2[0]);
});

test('send notifications added', () => {
    const testlist = [{
        id: '1',
        api: '1',
        subscriber: 'Hein',
        clientId: '1',
        sessionId: '111111111',
        channelId: '1',
        subscribedAt: '2021-06-18T18:00:00',
        unsubscribedAt: '2021-06-20T19:00:00',
        sessionRemovedAt: '2021-06-20T20:00:00'
    },
    {
        id: '2',
        api: '1',
        subscriber: 'Suzanne',
        clientId: '55',
        sessionId: '87776',
        channelId: '2',
        subscribedAt: '2021-06-19T18:00:00',
        unsubscribedAt: '2021-06-20T19:00:00',
        sessionRemovedAt: '2021-06-20T20:00:00'
    }];
    const testlist2 = [{
        id: '3',
        api: '1',
        subscriber: 'Kees',
        clientId: '34',
        sessionId: '233455',
        channelId: '4',
        subscribedAt: '2021-06-19T18:00:00',
        unsubscribedAt: '2021-06-20T19:00:00',
        sessionRemovedAt: '2021-06-20T20:00:00'
    }];

    subscriptionService.getActive = jest.fn();
    subscriptionService.getAdded = jest.fn();
    const mockGetActive = subscriptionService.getActive.mockReturnValue(testlist);
    const mockGetAdded = subscriptionService.getAdded.mockReturnValue(testlist2);

    const notificationList1 = [{
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
    const notificationList2 = [
    {
        id: '2',
        channelId: '2',
        message: 'message3',
        createdAt: '2021-07-18T21:02:00'
    }]
    const notificationList3 = [
        {
            id: '4',
            channelId: '4',
            message: 'message4',
            createdAt: '2021-07-18T21:02:00'
        }]
    const mockGetNotifications = notificationService.getNotifications.mockImplementation((x, y) => { if (x === '1') {return notificationList1;} else if (x === '2') {return notificationList2;} else { return notificationList3;}});
    const mockSendNotification = notificationService.sendNotification;

    processor.sendNotifications();

    expect(mockGetActive).toHaveBeenCalled();
    expect(mockGetAdded).toHaveBeenCalled();
    expect(mockGetNotifications).toHaveBeenCalled();
    expect(mockGetActive).toHaveBeenCalled();
    expect(mockSendNotification).toHaveBeenCalled();

    // Mock is called 4 times
    expect(mockSendNotification.mock.calls.length).toBe(4);
    // First argument of first call is Hein
    expect(mockSendNotification.mock.calls[0][0]).toBe('Hein');
    // Second argument of first call is first element of notificationList1
    expect(mockSendNotification.mock.calls[0][1]).toEqual(notificationList1[0]);
    // First argument of second call is Hein
    expect(mockSendNotification.mock.calls[1][0]).toBe('Hein');
    expect(mockSendNotification.mock.calls[1][1]).toEqual(notificationList1[1]);
    expect(mockSendNotification.mock.calls[2][0]).toBe('Suzanne');
    expect(mockSendNotification.mock.calls[2][1]).toEqual(notificationList2[0]);
});