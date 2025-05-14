const RegisteredComment = require('../RegisteredComment');

describe('RegisteredComment entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
        content: 'Comment Content',
        };
    
        // Action & Assert
        expect(() => new RegisteredComment(payload)).toThrowError('REGISTERED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });
    
    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
        id: 123,
        content: 'Comment Content',
        userId: 'dicoding',
        };
    
        // Action & Assert
        expect(() => new RegisteredComment(payload)).toThrowError('REGISTERED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });
    
    it('should create RegisteredComment object correctly', () => {
        // Arrange
        const payload = {
        id: 'comment-123',
        content: 'Comment Content',
        userId: 'dicoding',
        };
    
        // Action
        const registeredComment = new RegisteredComment(payload);
    
        // Assert
        expect(registeredComment.id).toEqual(payload.id);
        expect(registeredComment.content).toEqual(payload.content);
        expect(registeredComment.userId).toEqual(payload.userId);
    });
    });