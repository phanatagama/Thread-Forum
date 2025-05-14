const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
const GetThreadByIdUseCase = require('../../../../Applications/use_case/GetThreadByIdUseCase');
class ThreadsHandler {
    constructor(container) {
        this._container = container;

        this.postThreadHandler = this.postThreadHandler.bind(this);
        this.getThreadByIdHandler = this.getThreadByIdHandler.bind(this);
    }

    async postThreadHandler(request, h) {
        const  token  = request.headers.authorization;
        const addedThread = this._container.getInstance(AddThreadUseCase.name)
        const result = await addedThread.execute({ ...request.payload, refreshToken: token });

        const response = h.response({
            status: 'success',
            data: {
                'addedThread':result,
            },
        });
        response.code(201);
        return response;
    }

    async getThreadByIdHandler(request,h) {
        const { threadId } = request.params;
        const thread = this._container.getInstance(GetThreadByIdUseCase.name)
        const result = await thread.execute(threadId);
        
        return h.response({
            status: 'success',
            data: {
                thread: result,
            },
        }).code(200);
    }

}

module.exports = ThreadsHandler;