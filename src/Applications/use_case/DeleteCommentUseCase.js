class DeleteCommentUseCase {
    constructor({ commentRepository}) {
        this._commentRepository = commentRepository;   
    }

    async execute(useCasePayload) {
        this._verifyPayload(useCasePayload);
        const { threadId, commentId, userId } = useCasePayload;
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

    _verifyPayload({ threadId, commentId, userId }) {
        if (!commentId || !userId || !threadId) {
            throw new Error('DELETE_COMMENT_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof commentId !== 'string' || typeof userId !== 'string' || typeof threadId !== 'string') {
            throw new Error('DELETE_COMMENT_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = DeleteCommentUseCase;