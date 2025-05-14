class RegisteredThread {
    constructor({id, title, body}){
        this._verifyPayload({id, title, body});
        this.title = title;
        this.body = body;
        this.id = id;
    }

    _verifyPayload({id, title, body}){
        if (!id || !title || !body) {
            throw new Error('REGISTERED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
        }
        if (typeof id !== 'string' || typeof title !== 'string' || typeof body !== 'string') {
            throw new Error('REGISTERED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = RegisteredThread;