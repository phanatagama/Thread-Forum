class RegisteredComment {
  constructor({ id, content, userId }) {
    this.id = id;
    this.content = content;
    this.userId = userId;

    this._verifyPayload({ id, content, userId });
  }

  _verifyPayload({ id, content, userId }) {
    if (!id || !content || !userId) {
      throw new Error('REGISTERED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof content !== 'string' || typeof userId !== 'string') {
      throw new Error('REGISTERED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RegisteredComment;