
const AddCommentUseCase = require('../AddCommentUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');


describe('AddCommentUseCase', () => {
    it('should throw error if there is no token', async () => {
        // Arrange
        const useCasePayload = {};
        const addCommentUseCase = new AddCommentUseCase({}, {},);

        // Action & Assert
        await expect(addCommentUseCase.execute(useCasePayload))
            .rejects
            .toThrowError('ADD_COMMENT_USE_CASE.AUTHENTICATION_NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error if threadId type is not string', async () => {
        // Arrange
        const useCasePayload = {
            userId: 'user-123',
            content: 'Comment content',
            threadId: 123,
        };
        const addCommentUseCase = new AddCommentUseCase({}, {}, );

        // Action & Assert
        await expect(addCommentUseCase.execute(useCasePayload))
            .rejects
            .toThrowError('ADD_COMMENT_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should throw error if thread is not found', async () => {
        // Arrange
        const useCasePayload = {
            userId: 'user-123',
            content: 'Comment content',
            threadId: '123',
        };
        const mockThreadRepository = new ThreadRepository();
        mockThreadRepository.getThreadById = jest.fn()
            .mockImplementation(() => Promise.resolve(null));
        const addCommentUseCase = new AddCommentUseCase({ threadRepository: mockThreadRepository});

        // Action & Assert
        await expect(addCommentUseCase.execute(useCasePayload))
            .rejects
            .toThrowError('ADD_COMMENT_USE_CASE.THREAD_NOT_FOUND');
    });


    it('should throw error if use case payload not contain content', async () => {
        // Arrange
        const useCasePayload = {
            userId: 'user-123',
            threadId: 'thread-123',
        };
        const addCommentUseCase = new AddCommentUseCase({},{},);

        // Action & Assert
        await expect(addCommentUseCase.execute(useCasePayload))
            .rejects
            .toThrowError('ADD_COMMENT_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error if content not string', async () => {
        // Arrange
        const useCasePayload = {
            userId: 'user-123',
            threadId: 'thread-123',
            content: 123,
        };
        const addCommentUseCase = new AddCommentUseCase({}, {});

        // Action & Assert
        await expect(addCommentUseCase.execute(useCasePayload))
            .rejects
            .toThrowError('ADD_COMMENT_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should orchestrating the add comment action correctly', async () => {
        // Arrange
        const useCasePayload = {
            userId: 'user-123',
            threadId: 'thread-123',
            content: 'Comment content',
        };
        
        const expectedAddedComment = {
            id: 'comment-123',
            content: useCasePayload.content,
            userId: useCasePayload.userId,
        };

        const mockThreadRepository = new ThreadRepository();
        const mockCommentRepository = new CommentRepository();
        
        
        mockThreadRepository.getThreadById = jest.fn()
            .mockImplementation(() => Promise.resolve({ id: useCasePayload.threadId }));
        mockCommentRepository.addComment = jest.fn()
            .mockImplementation(() => Promise.resolve({
                id: 'comment-123',
                content: 'Comment content',
                userId: 'user-123',
            }));

        const addCommentUseCase = new AddCommentUseCase({
            threadRepository: mockThreadRepository,
            commentRepository: mockCommentRepository,          
        });
        // Action
        const addedComment = await addCommentUseCase.execute(useCasePayload);
        // Assert
        expect(addedComment).toStrictEqual(expectedAddedComment);
        
        expect(mockThreadRepository.getThreadById).toBeCalledWith(useCasePayload.threadId);
        expect(mockCommentRepository.addComment).toBeCalledWith({threadId: useCasePayload.threadId,content:  useCasePayload.content, userId: useCasePayload.userId,});

    });

});