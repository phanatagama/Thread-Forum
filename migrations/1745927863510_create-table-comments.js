/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    // pgm.createTable('threads', {
    //     id: {
    //         type: 'VARCHAR(50)',
    //         primaryKey: true,
    //     },
    //     title: {
    //         type: 'TEXT',
    //         notNull: true,
    //     },
    //     body: {
    //         type: 'TEXT',
    //         notNull: true,
    //     },
    //     date: {
    //         type: 'TIMESTAMP',
    //         notNull: true,
    //     },
    //     userId: {
    //         type: 'VARCHAR(50)',
    //         notNull: true,
    //     },
    // }); 
    // pgm.addConstraint('threads', 'fk_threads.userId_users.id', {
    //     foreignKeys: {
    //         columns: ['userId'],
    //         references: 'users',
    //         onDelete: 'cascade',
    //     },
    // });
    pgm.createTable('comments', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        content: {
            type: 'TEXT',
            notNull: true,
        },
        date: {
            type: 'TIMESTAMP',
            notNull: true,
        },
        userId: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        threadId: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        isDeleted: {
            type: 'BOOLEAN',
            notNull: true,
            default: false,
        },
    });
    // pgm.addConstraint('comments', 'fk_comments.userId_users.id', {
    //     foreignKeys: {
    //         columns: ['userId'],
    //         references: 'users',
    //         onDelete: 'cascade',
    //     },
    // });
    // pgm.addConstraint('comments', 'fk_comments.threadId_threads.id', {
    //     foreignKeys: {
    //         columns: ['threadId'],
    //         references: 'threads',
    //         onDelete: 'cascade',
    //     },
    // });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    // pgm.dropConstraint('comments', 'fk_comments.userId_users.id');
    // pgm.dropConstraint('comments', 'fk_comments.threadId_threads.id');
    pgm.dropTable('comments');
    // pgm.dropConstraint('threads', 'fk_threads.userId_users.id');
    // pgm.dropTable('threads');
};
