class RegisterComment {
  constructor({ threadId, userId, content }) {
    this._verifyPayload({ threadId, userId, content });

    this.threadId = threadId;
    this.userId = userId;
    this.content = content;
  }

  _verifyPayload({ threadId, userId, content }) {
    if (!threadId || !userId || !content) {
      throw new Error('REGISTER_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof threadId !== 'string' || typeof userId !== 'string' || typeof content !== 'string') {
      throw new Error('REGISTER_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RegisterComment;