const Thread = require('../Thread');


describe('Thread entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
            id: 'thread-123',
            title: 'Thread Title',
            body: 'Thread Body',
        };

        // Action & Assert
        expect(() => new Thread(payload)).toThrowError('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            id: 123,
            title: 'Thread Title',
            body: 'Thread Body',
            date: '2023-10-01T00:00:00.000Z',
            username: 'dicoding',
        };

        // Action & Assert
        expect(() => new Thread(payload)).toThrowError('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create Thread object correctly', () => {
        // Arrange
        const payload = {
            id: 'thread-123',
            title: 'Thread Title',
            body: 'Thread Body',
            date: '2023-10-01T00:00:00.000Z',
            username: 'dicoding',
        };

        // Action
        const thread = new Thread(payload);

        // Assert
        expect(thread.id).toEqual(payload.id);
        expect(thread.title).toEqual(payload.title);
        expect(thread.body).toEqual(payload.body);
        expect(thread.date).toEqual(payload.date);
        expect(thread.username).toEqual(payload.username);
    });
});