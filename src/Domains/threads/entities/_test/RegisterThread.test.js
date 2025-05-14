const RegisterThread = require('../RegisterThread');

describe('RegisterThread entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
            title: 'Thread Title',
        };

        // Action & Assert
        expect(() => new RegisterThread(payload)).toThrowError('REGISTER_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            title: 'Thread Title',
            body: 123,
            userId: 'dicoding',
        };

        // Action & Assert
        expect(() => new RegisterThread(payload)).toThrowError('REGISTER_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create RegisterThread object correctly', () => {
        // Arrange
        const payload = {
            title: 'Thread Title',
            body: 'Thread Body',
            userId: 'dicoding',
        };

        // Action
        const registerThread = new RegisterThread(payload);

        // Assert
        expect(registerThread.title).toEqual(payload.title);
        expect(registerThread.body).toEqual(payload.body);
        expect(registerThread.userId).toEqual(payload.userId);
    });
});