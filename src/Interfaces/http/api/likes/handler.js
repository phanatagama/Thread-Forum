const LikeUseCase = require('../../../../Applications/use_case/LikeUseCase');

class LikeHandler {
    constructor(container) {
        this._container = container;
        this.postLikeHandler = this.postLikeHandler.bind(this);
    }

    async postLikeHandler(request, h) {
        const { commentId, threadId } = request.params;
        const { id: userId } = request.auth.credentials;
        const likeUseCase = this._container.getInstance(LikeUseCase.name);
        await likeUseCase.toggleLike({
            commentId,
            threadId,
            userId,
        });

        return h.response({
            status: 'success',
        });
    }
}

module.exports = LikeHandler;