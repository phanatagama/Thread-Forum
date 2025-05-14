const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const Thread = require('../../../Domains/threads/entities/Thread');
const GetThreadByIdUseCase = require('../GetThreadByIdUseCase');

describe('GetThreadByIdUseCase', () => {
    it('should orchestrating the get thread by id action correctly', async () => {
        // Arrange
        const useCasePayload = {
            threadId: 'thread-123',
        };
        const expectedThread = new Thread({
            id: 'thread-123',
            title: 'Thread Title',
            body: 'Thread Body',
            date: '2023-10-01T00:00:00.000Z',
            username: 'dicoding',
        });
        const mockThreadRepository = new ThreadRepository();
        const mockCommentRepository = new CommentRepository();
        mockCommentRepository.getCommentsByThreadId = jest.fn()
            .mockImplementation(() => Promise.resolve([]));
        mockThreadRepository.getThreadById = jest.fn()
            .mockImplementation(() => Promise.resolve(expectedThread));
        const getThreadByIdUseCase = new GetThreadByIdUseCase({
            threadRepository: mockThreadRepository,
            commentRepository: mockCommentRepository,
        });

        // Action
        const thread = await getThreadByIdUseCase.execute(useCasePayload.threadId);

        // Assert
        expect({...thread, comments: []}).toStrictEqual({...expectedThread, comments: []});
        expect(mockThreadRepository.getThreadById).toBeCalledWith(useCasePayload.threadId);
        expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith(useCasePayload.threadId);
    });

    it('should throw error if thread not found', async () => {
        // Arrange
        const useCasePayload = {
            threadId: 'thread-123',
        };
        const mockThreadRepository = new ThreadRepository();
        
        mockThreadRepository.getThreadById = jest.fn()
            .mockImplementation(() => Promise.resolve(null));
        const getThreadByIdUseCase = new GetThreadByIdUseCase({
            threadRepository: mockThreadRepository,
            commentRepository: {},
        });

        // Action & Assert
        await expect(getThreadByIdUseCase.execute(useCasePayload.threadId))
            .rejects
            .toThrowError('GET_THREAD_USE_CASE.THREAD_NOT_FOUND');

        expect(mockThreadRepository.getThreadById).toBeCalledWith(useCasePayload.threadId);
        
    });
});