const RegisterComment = require('../RegisterComment');

describe('RegisterComment entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
            content: 'Comment Content',
        };

        // Action & Assert
        expect(() => new RegisterComment(payload)).toThrowError('REGISTER_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            content: 'Comment Content',
            userId: 123,
            threadId: 'thread-123',
        };

        // Action & Assert
        expect(() => new RegisterComment(payload)).toThrowError('REGISTER_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create RegisterComment object correctly', () => {
        // Arrange
        const payload = {
            content: 'Comment Content',
            userId: 'dicoding',
            threadId: 'thread-123',
        };

        // Action
        const registerComment = new RegisterComment(payload);

        // Assert
        expect(registerComment.content).toEqual(payload.content);
        expect(registerComment.userId).toEqual(payload.userId);
        expect(registerComment.threadId).toEqual(payload.threadId);
    });
}
);