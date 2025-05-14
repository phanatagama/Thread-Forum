const RegisterThread = require('../../Domains/threads/entities/RegisterThread');

class AddThreadUseCase {
    constructor({ threadRepository}) {
        this._threadRepository = threadRepository;
    }

    async execute(useCasePayload) {
        this._verifyPayload(useCasePayload);

        const { userId, title, body } = useCasePayload;


        const registerThread = new RegisterThread({
            title,
            body,
            userId,
        });
        const { id: threadId } = await this._threadRepository.addThread(registerThread);
        const { id, username: owner } = await this._threadRepository.getThreadById(threadId);
        return {
            id,
            title,
            owner,
        };
    }

    _verifyPayload({ title, body, userId }) {
        if (!userId) {
            throw new Error('ADD_THREAD_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
        }
        if (!title || !body) {
            throw new Error('ADD_THREAD_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
        }


        if (typeof title !== 'string' || typeof body !== 'string' || typeof userId !== 'string') {
            throw new Error('ADD_THREAD_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = AddThreadUseCase;