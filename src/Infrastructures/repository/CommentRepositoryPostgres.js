const CommentRepository = require('../../Domains/comments/CommentRepository');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
class CommentRepositoryPostgres extends CommentRepository {
    constructor(pool, idGenerator) {
        super();
        this._pool = pool;
        this._idGenerator = idGenerator;
    }

    async addComment({ content, threadId, userId, isDeleted = false }) {
        const id = `comment-${this._idGenerator()}`;
        const date = new Date().toISOString();
        const query = {
            text: 'INSERT INTO comments VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, content, "userId"',
            values: [id, content, date, userId, threadId, isDeleted],
        };

        const result = await this._pool.query(query);
        return result.rows[0];
    }

    async getCommentById(id) {
        const query = {
            text: 'SELECT * FROM comments WHERE id = $1',
            values: [id],
        };

        const result = await this._pool.query(query);
        if (!result.rows.length) {
            return null;
        }
        return result.rows[0];
    }

    async deleteCommentById(id) {
        const query = {
            text: 'UPDATE comments SET "isDeleted" = true WHERE id = $1',
            values: [id],
        };

        await this._pool.query(query);

    }

    async getCommentsByThreadId(threadId) {
        const query = {
            text: `SELECT comments.id, 
                  comments.content,
                  comments.date,
                    comments."isDeleted", 
                  users.username,
                  COUNT(likes.id) AS likeCount
               FROM comments 
               LEFT JOIN users ON users.id = comments."userId" 
               LEFT JOIN likes ON comments.id = likes."commentId"
               WHERE comments."threadId" = $1
            GROUP BY comments.id, users.username
            ORDER BY comments.date ASC`,
            values: [threadId],
        };

        const result = await this._pool.query(query);
        return result.rows;
    }
    async checkCommentAvailability(commentId) {
        const query = {
            text: 'SELECT id FROM comments WHERE id = $1',
            values: [commentId],
        };
        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('comment tidak ditemukan');
        }


        return true;
    }
}

module.exports = CommentRepositoryPostgres;