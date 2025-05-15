const InvariantError = require('../../../Commons/exceptions/InvariantError');
const pool = require('../../database/postgres/pool');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
describe('CommentRepositoryPostgres', () => {
    afterEach(async () => {
        await CommentsTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('add comment function', () => {
        it('should persist register comment and return registered comment correctly', async () => {
            // Arrange
            const registerComment = {
                content: 'Comment Content',
                threadId: 'thread-123',
                userId: 'user-123',
            };
            const fakeIdGenerator = () => '123'; // stub!
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            // Action
            await commentRepositoryPostgres.addComment(registerComment);

            // Assert
            const comments = await CommentsTableTestHelper.getCommentById('comment-123');
            expect(comments).toHaveLength(1);
            expect(comments[0].content).toEqual(registerComment.content);
            expect(comments[0].threadId).toEqual(registerComment.threadId);
            expect(comments[0].userId).toEqual(registerComment.userId);
            expect(comments[0].id).toEqual('comment-123');
            expect(comments[0].isDeleted).toEqual(false);
            expect(comments[0].date).toBeDefined();
        });

        it('should return registered comment correctly', async () => {
            // Arrange
            const registerComment = {
                content: 'Comment Content',
                threadId: 'thread-123',
                userId: 'user-123',
            };
            const fakeIdGenerator = () => '123'; // stub!
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            // Action
            const registeredComment = await commentRepositoryPostgres.addComment(registerComment);

            // Assert
            expect(registeredComment).toStrictEqual({
                id: 'comment-123',
                content: registerComment.content,
                userId: registerComment.userId,
            });
        });
    }
    );

    describe('get comment by id function', () => {
        it('should return null when comment not found', async () => {
            // Arrange
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

            // Action & Assert
            const comment = await commentRepositoryPostgres.getCommentById('comment-123');
            expect(comment).toStrictEqual(null);
        });

        it('should return comment when comment is found', async () => {
            // Arrange
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});


            const payload = {
                id: 'comment-123',
                threadId: 'thread-123',
                content: 'Comment Content',
                userId: 'user-123',
                isDeleted: false,
            }
            await CommentsTableTestHelper.addComment(payload);

            // Action
            const comment = await commentRepositoryPostgres.getCommentById(payload.id);

            // Assert
            expect(comment.id).toStrictEqual(payload.id);
            expect(comment.threadId).toStrictEqual(payload.threadId);
            expect(comment.content).toStrictEqual(payload.content);
            expect(comment.userId).toStrictEqual(payload.userId);
            expect(comment.isDeleted).toStrictEqual(payload.isDeleted);
            expect(comment.date).toBeDefined();
        });
    }
    );

    describe('delete comment function', () => {
        it('should delete comment correctly', async () => {
            // Arrange
            const registerComment = {
                content: 'Comment Content',
                threadId: 'thread-123',
                userId: 'user-123',
            };
            const fakeIdGenerator = () => '123'; // stub!
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);
            await commentRepositoryPostgres.addComment(registerComment);

            // Action
            await commentRepositoryPostgres.deleteCommentById('comment-123');

            // Assert
            const comments = await CommentsTableTestHelper.getCommentById('comment-123');
            expect(comments).toHaveLength(1);
            expect(comments[0].isDeleted).toEqual(true);
            expect(comments[0].content).toEqual(registerComment.content);
            expect(comments[0].threadId).toEqual(registerComment.threadId);
            expect(comments[0].userId).toEqual(registerComment.userId);
            expect(comments[0].id).toEqual('comment-123');
            expect(comments[0].date).toBeDefined();

        });
    });

    describe('get comments by thread id function', () => {
        it('should return comments when comments are found', async () => {
            // Arrange
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

            const payload = {
                id: 'comment-123',
                threadId: 'thread-123',
                content: 'Comment Content',
                userId: 'user-123',
                isDeleted: false,
            }
            await CommentsTableTestHelper.addComment(payload);

            // Action
            const comments = await commentRepositoryPostgres.getCommentsByThreadId('thread-123');

            // Assert
            expect(comments).toHaveLength(1);
            expect(comments[0].id).toEqual(payload.id);
            expect(comments[0].content).toEqual(payload.content);
            expect(comments[0].date).toBeDefined();
            expect(comments[0].username).toBeDefined();
            expect(comments[0].isDeleted).toEqual(false);
        });

        it('should return empty array when comments are not found', async () => {
            // Arrange
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

            // Action
            const comments = await commentRepositoryPostgres.getCommentsByThreadId('thread-123');

            // Assert
            expect(comments).toHaveLength(0);
            expect(comments).toEqual([]);

        });
    }
    );
});