class GetThreadByIdUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(threadId) {

    const thread = await this._threadRepository.getThreadById(threadId);
    if (!thread) {
      throw new Error('GET_THREAD_USE_CASE.THREAD_NOT_FOUND');
    }
    
    const comments = await this._commentRepository.getCommentsByThreadId(threadId);
    // const mappedComments = comments.map((comment) => ({
    //   id: comment.id,
    //   username: comment.username,
    //   date: comment.date,
    //   content: comment.content,
    // }));

    return {
      id: thread.id,
      title: thread.title,
      body: thread.body,
      date: thread.date,
      username: thread.username,
      comments: comments,
    }
  }

}

module.exports = GetThreadByIdUseCase;