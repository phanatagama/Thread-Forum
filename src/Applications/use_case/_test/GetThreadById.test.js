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
            .mockImplementation(() => Promise.resolve(new Thread({
                id: 'thread-123',
                title: 'Thread Title',
                body: 'Thread Body',
                date: '2023-10-01T00:00:00.000Z',
                username: 'dicoding',
            })));
        const getThreadByIdUseCase = new GetThreadByIdUseCase({
            threadRepository: mockThreadRepository,
            commentRepository: mockCommentRepository,
        });

        // Action
        const thread = await getThreadByIdUseCase.execute(useCasePayload.threadId);

        // Assert
        expect({...thread, }).toStrictEqual({...expectedThread, comments: []});
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

    it('should map comments correctly when mappingComments is called', async () => {
        // Arrange
        const comments = [
            {
                id: 'comment-123',
                username: 'user1',
                date: '2023-10-01T00:00:00.000Z',
                content: 'This is a comment',
                isDeleted: false,
                likecount: '0',
            },
            {
                id: 'comment-124',
                username: 'user2',
                date: '2023-10-02T00:00:00.000Z',
                content: 'This comment is deleted',
                isDeleted: true,
                likecount: '0',
            },
        ];
        const expectedMappedComments = [
            {
                id: 'comment-123',
                username: 'user1',
                date: '2023-10-01T00:00:00.000Z',
                content: 'This is a comment',
                likeCount: 0,
            },
            {
                id: 'comment-124',
                username: 'user2',
                date: '2023-10-02T00:00:00.000Z',
                content: '**komentar telah dihapus**',
                likeCount: 0,
            },
        ];
        const getThreadByIdUseCase = new GetThreadByIdUseCase({});

        // Action
        const mappedComments= [];
        comments.forEach((comment) => {
            const mappedComment = getThreadByIdUseCase.mappingComments(comment);
            mappedComments.push(mappedComment);
        });

        // Assert
        expect(mappedComments).toStrictEqual(expectedMappedComments);
    });
});