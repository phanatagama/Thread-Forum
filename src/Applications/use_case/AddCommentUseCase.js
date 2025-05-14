class AddCommentUseCase {
  constructor({ commentRepository,  threadRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    
  }

  async execute(useCasePayload) {
    
    this._verifyPayload(useCasePayload);
    const { threadId, content, userId } = useCasePayload;
    // const { threadId, content, token } = useCasePayload;
    // const accessToken = token.split(' ')[1];
    // const { id: userId } = await this._authenticationTokenManager.decodePayload(accessToken);
    const thread = await this._threadRepository.getThreadById(threadId);
    if (!thread) {
      throw new Error('ADD_COMMENT_USE_CASE.THREAD_NOT_FOUND');
    }

    return this._commentRepository.addComment({ threadId, content, userId });
  }

  _verifyPayload({ threadId, content, userId }) {
    if (!userId) {
      throw new Error('ADD_COMMENT_USE_CASE.AUTHENTICATION_NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (!threadId || !content ) {
      throw new Error('ADD_COMMENT_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
    }


    if (typeof threadId !== 'string' || typeof content !== 'string' || typeof userId !== 'string') {
      throw new Error('ADD_COMMENT_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddCommentUseCase;