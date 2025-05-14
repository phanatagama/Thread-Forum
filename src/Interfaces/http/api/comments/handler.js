const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');

class CommentsHandler {
    constructor(container) {
        
        this._container = container;

        this.postCommentHandler = this.postCommentHandler.bind(this);
        this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
    }

    async postCommentHandler(request, h) {
        
        const token = request.headers.authorization;
        const { id } = request.params;
        
        const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name);
        
        const addedComment = await addCommentUseCase.execute({ ...request.payload, threadId: id, token: token });

        const response = h.response({
            status: 'success',
            data: {
                addedComment: {
                    id: addedComment.id,
                    content: addedComment.content,
                    owner: addedComment.userId,
                },
            },
        });
        response.code(201);
        return response;
    }
    async deleteCommentHandler(request) {
        const token = request.headers.authorization;
        const { threadId, commentId } = request.params;
        const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name);
        await deleteCommentUseCase.execute({ threadId, commentId, token });

        return {
            status: 'success',
            message: 'komentar berhasil dihapus',
        };
    }
}

module.exports = CommentsHandler;