const AddThreadUseCase = require('../AddThreadUseCase');
const RegisterThread = require('../../../Domains/threads/entities/RegisterThread');
const RegisteredThread = require('../../../Domains/threads/entities/RegisteredThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');


describe('AddThreadUseCase', () => {
    it('should orchestrating the add thread action correctly', async () => {
        // Arrange
        const useCasePayload = {
            title: 'Thread Title',
            body: 'Thread Body',
            userId: 'user-123',
            // refreshToken: 'Bearer refresh_token',
        };
        const mockRegisteredThread = new RegisteredThread({
            id: 'thread-123',
            title: useCasePayload.title,
            body: useCasePayload.body,
        });
        const mockThreadRepository = new ThreadRepository();
        mockThreadRepository.addThread = jest.fn()
            .mockImplementation(() => Promise.resolve(mockRegisteredThread));
        mockThreadRepository.getThreadById = jest.fn()
            .mockImplementation(() => Promise.resolve({
                id: 'thread-123',
                title: useCasePayload.title,
                body: useCasePayload.body,
                username: 'user-123',
            }));
        const addThreadUseCase = new AddThreadUseCase({
            threadRepository: mockThreadRepository,
        });

        // Action
        const registeredThread = await addThreadUseCase.execute(useCasePayload);

        // Assert
        expect(registeredThread).toStrictEqual({
            id: 'thread-123',
            title: useCasePayload.title,
            owner: 'user-123',
        });
        expect(mockThreadRepository.addThread).toBeCalledWith(new RegisterThread({
            title: useCasePayload.title,
            body: useCasePayload.body,
            userId: 'user-123',
        }));
    }
    );
    it('should throw error when payload did not contain token', async () => {
        // Arrange
        const useCasePayload = {
            title: 'Thread Title',
            body: 'Thread Body',
        };
        const addThreadUseCase = new AddThreadUseCase({},{},{});

    
        await expect(addThreadUseCase.execute(useCasePayload)).rejects.toThrowError('ADD_THREAD_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
    }
    );
    it('should throw error when payload did not meet data type specification', async () => {
        // Arrange
        const useCasePayload = {
            title: 'Thread Title',
            body: 'Thread Body',
            // refreshToken: 123,
            userId: 123,
        };
        const addThreadUseCase = new AddThreadUseCase({});

    
        await expect(addThreadUseCase.execute(useCasePayload)).rejects.toThrowError('ADD_THREAD_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
    );

});