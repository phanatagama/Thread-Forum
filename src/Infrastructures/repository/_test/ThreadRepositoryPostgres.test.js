const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const RegisteredThread = require('../../../Domains/threads/entities/RegisteredThread');
const RegisterThread = require('../../../Domains/threads/entities/RegisterThread');
const Thread = require('../../../Domains/threads/entities/Thread');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');

describe('ThreadRepositoryPostgres', () => {
    afterEach(async () => {
        await ThreadsTableTestHelper.cleanTable();
        await UsersTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });


    it('should persist register thread and return registered thread correctly', async () => {
        // Arrange
        const registerThread = new RegisterThread({
            title: 'Thread Title',
            body: 'Thread Body',
            userId: 'user-123',
        });
        const fakeIdGenerator = () => '1234'; // stub!
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

        // Action
        await threadRepositoryPostgres.addThread(registerThread);

        // Assert
        const threads = await ThreadsTableTestHelper.getThreadById('thread-1234');
        expect(threads).toHaveLength(1);
    });

    it('should return registered thread correctly', async () => {
        // Arrange
        const registerThread = new RegisterThread({
            title: 'Thread Title',
            body: 'Thread Body',
            userId: 'user-123',
        });
        const fakeIdGenerator = () => '123'; // stub!
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

        // Action
        const registeredThread = await threadRepositoryPostgres.addThread(registerThread);

        // Assert
        expect(registeredThread).toStrictEqual(new RegisteredThread({
            id: 'thread-123',
            title: registerThread.title,
            body: registerThread.body,
        }));
    });

    it('should throw InvariantError when thread not found', async () => {
        // Arrange
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

        // Action & Assert
        await expect(threadRepositoryPostgres.getThreadById('thread-123')).rejects.toThrowError(NotFoundError);
    });

    it('should return thread correctly', async () => {

        await UsersTableTestHelper.addUser({
            id: 'user-123',
            username: 'dicoding',
        });
        // Arrange
        const registerThread = new RegisterThread({
            title: 'Thread Title',
            body: 'Thread Body',
            userId: 'user-123',
        });
        const fakeIdGenerator = () => '123'; // stub!
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
        await threadRepositoryPostgres.addThread(registerThread);

        // Action
        const thread = await threadRepositoryPostgres.getThreadById('thread-123');

        // Assert
        expect(thread).toStrictEqual(new Thread({
            id: 'thread-123',
            title: registerThread.title,
            body: registerThread.body,
            date: expect.any(String),
            username: 'dicoding',
        }));
    });



});