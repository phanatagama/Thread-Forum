const CommentRepository = require('../../../Domains/comments/CommentRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const { token } = require('@hapi/jwt');

describe('DeleteCommentUseCase', () => {
    it('should throw error if use case payload not contain commentId', async () => {
        // Arrange
        const useCasePayload = {};
        const deleteCommentUseCase = new DeleteCommentUseCase({},{});

        // Action & Assert
        await expect(deleteCommentUseCase.execute(useCasePayload))
            .rejects
            .toThrowError('DELETE_COMMENT_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error if commentId not string', async () => {
        // Arrange
        const useCasePayload = {
            commentId: 123,
            token: 'Bearer token',
            threadId: 'thread-123',
        };
        const deleteCommentUseCase = new DeleteCommentUseCase({},{});

        // Action & Assert
        await expect(deleteCommentUseCase.execute(useCasePayload))
            .rejects
            .toThrowError('DELETE_COMMENT_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should throw error if comment not found', async () => {
        // Arrange
        const useCasePayload = {
            commentId: 'comment-123',
            token: 'Bearer token',
            threadId: 'thread-123',
        };
        const mockCommentRepository = new CommentRepository();
        const mockAuthenticationTokenManager = new AuthenticationTokenManager();
        mockCommentRepository.getCommentById = jest.fn()
            .mockImplementation(() => Promise.resolve(null));
        mockAuthenticationTokenManager.decodePayload = jest.fn()
            .mockImplementation(() => Promise.resolve({ id: 'user-123' }));
        const deleteCommentUseCase = new DeleteCommentUseCase({
            commentRepository: mockCommentRepository,
            authenticationTokenManager: mockAuthenticationTokenManager,
        });
        // Action & Assert
        await expect(deleteCommentUseCase.execute(useCasePayload))
            .rejects
            .toThrowError('DELETE_COMMENT_USE_CASE.COMMENT_NOT_FOUND');
    }
    );

    it('should throw error if threadId not the same as comment threadId', async () => {
        // Arrange
        const useCasePayload = {
            commentId: 'comment-123',
            token: 'Bearer token',
            threadId: 'thread-123',
        };
        const mockCommentRepository = new CommentRepository();
        const mockAuthenticationTokenManager = new AuthenticationTokenManager();
        mockCommentRepository.getCommentById = jest.fn()
            .mockImplementation(() => Promise.resolve({ id: 'comment-123', threadId: 'thread-456', userId: 'user-123' }));
        mockAuthenticationTokenManager.decodePayload = jest.fn()
            .mockImplementation(() => Promise.resolve({ id: 'user-123' }));
        const deleteCommentUseCase = new DeleteCommentUseCase({
            commentRepository: mockCommentRepository,
            authenticationTokenManager: mockAuthenticationTokenManager,
        });
        // Action & Assert
        await expect(deleteCommentUseCase.execute(useCasePayload))
            .rejects
            .toThrowError('DELETE_COMMENT_USE_CASE.THREAD_ID_NOT_MATCH');
    }
    );
            

    it('should throw error if userId not the same as comment owner', async () => {
        // Arrange
        const useCasePayload = {
            commentId: 'comment-123',
            token: 'Bearer token',
            threadId: 'thread-123',
        };
        const mockCommentRepository = new CommentRepository();
        const mockAuthenticationTokenManager = new AuthenticationTokenManager();
        mockCommentRepository.getCommentById = jest.fn()
            .mockImplementation(() => Promise.resolve({ id: 'comment-123', threadId: 'thread-123', userId: 'user-456' }));
        mockAuthenticationTokenManager.decodePayload = jest.fn()
            .mockImplementation(() => Promise.resolve({ id: 'user-123' }));
        const deleteCommentUseCase = new DeleteCommentUseCase({
            commentRepository: mockCommentRepository,
            authenticationTokenManager: mockAuthenticationTokenManager,
        });
        // Action & Assert
        await expect(deleteCommentUseCase.execute(useCasePayload))
            .rejects
            .toThrowError('DELETE_COMMENT_USE_CASE.USER_ID_NOT_MATCH');
    }
    );

    it('should orchestrating the delete comment action correctly', async () => {
        // Arrange
        const useCasePayload = {
            commentId: 'comment-123',
            threadId: 'thread-123',
            token: 'Bearer token',
            userId: 'user-123',
        };
        const mockCommentRepository = new CommentRepository();
        const mockAuthenticationTokenManager = new AuthenticationTokenManager();
        
        mockCommentRepository.getCommentById = jest.fn()
            .mockImplementation(() => Promise.resolve({ id: 'comment-123', threadId: 'thread-123', userId: 'user-123' }));
        mockCommentRepository.deleteCommentById = jest.fn()
            .mockImplementation(() => Promise.resolve());

        mockAuthenticationTokenManager.decodePayload = jest.fn()
            .mockImplementation(() => Promise.resolve({ id: 'user-123' }));
        

        const deleteCommentUseCase = new DeleteCommentUseCase({
            commentRepository: mockCommentRepository,
            authenticationTokenManager: mockAuthenticationTokenManager,

        });

        // Act
        await deleteCommentUseCase.execute(useCasePayload);

        // Assert
        expect(mockCommentRepository.getCommentById)
            .toHaveBeenCalledWith(useCasePayload.commentId);

        expect(mockCommentRepository.deleteCommentById)
            .toHaveBeenCalledWith(useCasePayload.commentId);
    }
    );
}
);