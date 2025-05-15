const RegisteredThread = require('../../Domains/threads/entities/RegisteredThread');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const Thread = require('../../Domains/threads/entities/Thread');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(registerThread) {
    const { title, body, userId } = registerThread;
    const id = `thread-${this._idGenerator()}`;

    const date = new Date().toISOString();

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5) RETURNING id, title, body',
      values: [id, title, body, date, userId],
    };

    const result = await this._pool.query(query);

    return new RegisteredThread({ ...result.rows[0]});
  }

  async getThreadById(id) {
    const query = {
      text: 'SELECT threads.id, threads.title, threads.body, threads.date, users.username FROM threads LEFT JOIN users ON users.id = threads."userId" WHERE threads.id = $1',
      values: [id],
    };

    
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Thread not found');
    }

    
    const { date } = result.rows[0];

    const thread = {
      ...result.rows[0],
      date: new Date(date).toISOString(),
    }

    return new Thread(thread);
  }
  async checkAvailableThread(threadId) {
    const query = {
      text: 'SELECT id FROM threads WHERE id = $1',
      values: [threadId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('thread tidak ditemukan');
    }

    return true;
  }
}

module.exports = ThreadRepositoryPostgres;