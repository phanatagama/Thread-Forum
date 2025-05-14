class DeleteCommentUseCase {
    constructor({ commentRepository, authenticationTokenManager }) {
        this._commentRepository = commentRepository;
        this._authenticationTokenManager = authenticationTokenManager;
    }

    async execute(useCasePayload) {
        this._verifyPayload(useCasePayload);
        const { threadId, commentId, token } = useCasePayload;
        const accessToken = token.split(' ')[1];
        const { id: userId } = await this._authenticationTokenManager.decodePayload(accessToken);
        const comment = await this._commentRepository.getCommentById(commentId);
        if (!comment) {
            throw new Error('DELETE_COMMENT_USE_CASE.COMMENT_NOT_FOUND');
        }
        if (comment.threadId !== threadId) {
            throw new Error('DELETE_COMMENT_USE_CASE.THREAD_ID_NOT_MATCH');
        }
        if (comment.userId !== userId) {
            throw new Error('DELETE_COMMENT_USE_CASE.USER_ID_NOT_MATCH');
        }


        return this._commentRepository.deleteCommentById(commentId);
    }

    _verifyPayload({ threadId, commentId, token }) {
        if (!commentId || !token || !threadId) {
            throw new Error('DELETE_COMMENT_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof commentId !== 'string' || typeof token !== 'string' || typeof threadId !== 'string') {
            throw new Error('DELETE_COMMENT_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = DeleteCommentUseCase;