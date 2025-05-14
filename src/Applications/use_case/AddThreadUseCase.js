const RegisterThread = require('../../Domains/threads/entities/RegisterThread');

class AddThreadUseCase {
    constructor({ threadRepository, authenticationTokenManager }) {
        this._threadRepository = threadRepository;
        
        this._authenticationTokenManager = authenticationTokenManager;
    }

    async execute(useCasePayload) {
        this._verifyPayload(useCasePayload);
        const { refreshToken } = useCasePayload;
        const accessToken = refreshToken.split(' ')[1];

        const { id: userId } = await this._authenticationTokenManager.decodePayload(accessToken);
        const { title, body } = useCasePayload;


        const registerThread = new RegisterThread({
            title,
            body,
            userId,
        });
        const {id: threadId} = await this._threadRepository.addThread(registerThread);
        const {id, username:owner} = await this._threadRepository.getThreadById(threadId);
        return {
            id,
            title,
            owner,
        };
    }

    _verifyPayload({ title, body, refreshToken }) {
        if (!refreshToken) {
            throw new Error('ADD_THREAD_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
        }
        if (!title || !body ) {
            throw new Error('ADD_THREAD_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
        }


        if (typeof title !== 'string' || typeof body !== 'string' || typeof refreshToken !== 'string') {
            throw new Error('ADD_THREAD_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = AddThreadUseCase;