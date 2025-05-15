const AddThreadUseCase = require('../AddThreadUseCase');
const RegisterThread = require('../../../Domains/threads/entities/RegisterThread');
const RegisteredThread = require('../../../Domains/threads/entities/RegisteredThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const Thread = require('../../../Domains/threads/entities/Thread');

describe('AddThreadUseCase', () => {
    it('should orchestrating the add thread action correctly', async () => {
        // Arrange
        const useCasePayload = {
            title: 'Thread Title',
            body: 'Thread Body',
            userId: 'user-123',
        };
        const expectedValue = new RegisteredThread({
            id: 'thread-123',
            title: useCasePayload.title,
            body: useCasePayload.body,
        });
        const mockThreadRepository = new ThreadRepository();
        mockThreadRepository.addThread = jest.fn()
            .mockImplementation(() => Promise.resolve(new RegisteredThread({
                id: 'thread-123',
                title: useCasePayload.title,
                body: useCasePayload.body,
            })));
        mockThreadRepository.getThreadById = jest.fn()
            .mockImplementation(() => Promise.resolve(new Thread({
                id: 'thread-123',
                title: useCasePayload.title,
                body: useCasePayload.body,
                date: '2023-10-01T00:00:00.000Z',
                username: 'user-123',
            })));
        const addThreadUseCase = new AddThreadUseCase({
            threadRepository: mockThreadRepository,
        });

        // Action
        const registeredThread = await addThreadUseCase.execute(useCasePayload);

        // Assert
        expect(registeredThread).toStrictEqual({
            id: expectedValue.id,
            title: useCasePayload.title,
            owner: useCasePayload.userId,
        });
        expect(mockThreadRepository.addThread).toBeCalledWith(new RegisterThread({
            title: useCasePayload.title,
            body: useCasePayload.body,
            userId: useCasePayload.userId,
        }));
        expect(mockThreadRepository.getThreadById).toBeCalledWith(expectedValue.id);
    }
    );
    it('should throw error when payload did not contain token', async () => {
        // Arrange
        const useCasePayload = {
            title: 'Thread Title',
            body: 'Thread Body',
        };
        const addThreadUseCase = new AddThreadUseCase({});

        // Action & Assert
        await expect(addThreadUseCase.execute(useCasePayload)).rejects.toThrowError('ADD_THREAD_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
    }
    );
    it('should throw error when payload did not meet data type specification', async () => {
        // Arrange
        const useCasePayload = {
            title: 'Thread Title',
            body: 'Thread Body',
            userId: 123,
        };

        const addThreadUseCase = new AddThreadUseCase({});    
        // Action & Assert
        await expect(addThreadUseCase.execute(useCasePayload)).rejects.toThrowError('ADD_THREAD_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
    );

    it('should throw error when payload did not contain needed property', async () => {
        // Arrange
        const useCasePayload = {
            userId: 'user-123',
        };
        const addThreadUseCase = new AddThreadUseCase({});    
        // Action & Assert
        await expect(addThreadUseCase.execute(useCasePayload)).rejects.toThrowError('ADD_THREAD_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    );  

});