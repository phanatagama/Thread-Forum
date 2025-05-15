const container = require('../../container');
const createServer = require('../createServer');

const LikesTableTestHelper = require('../../../../tests/LikesTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');

const pool = require('../../database/postgres/pool');

describe('Likes Endpoints', () => {
    let server = null;
    let accessToken;
    beforeEach(async () => {
        await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dicoding', password: 'secret', fullname: 'Dicoding Indonesia' });
        await UsersTableTestHelper.addUser({ id: 'user-456', username: 'budi', password: 'secret', fullname: 'Budi' });
        accessToken = await AuthenticationsTableTestHelper.generateToken({ username: 'dicoding', id: 'user-123' });
    });

    beforeAll(async () => {
        server = await createServer(container);
    });

    afterEach(async () => {
        await LikesTableTestHelper.cleanTable();
        await CommentsTableTestHelper.cleanTable();
        await ThreadsTableTestHelper.cleanTable();
        await UsersTableTestHelper.cleanTable();
        await AuthenticationsTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('when PUT /threads/{threadId}/comments/{commentId}/likes', () => {
        it('should response 200 when like comment', async () => {
            // Arrange
    
            // Create a Thread
            await ThreadsTableTestHelper.addThread({
                id: 'thread-123',
                title: 'Thread Title',
                username: 'user-123',
            });

            
            // Create a Comment

            await CommentsTableTestHelper.addComment({
                id: 'comment-123',
                content: 'Comment Content',
                threadId: 'thread-123',
                userId: 'user-123',
            });

            // Action
            const likeRequest = {
                threadId: 'thread-123',
                commentId: 'comment-123',
            };

            const response = await server.inject({
                method: 'PUT',
                url: `/threads/${likeRequest.threadId}/comments/${likeRequest.commentId}/likes`,
                headers: {
                    authorization: accessToken,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');
        });
    });
});