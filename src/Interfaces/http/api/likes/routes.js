const routes = (handler) => [
    {
        method: 'PUT',
        path: '/threads/{threadId}/comments/{commentId}/likes',
        handler: handler.postLikeHandler,
        options: {
            auth: 'forum_api_jwt',
        },
    },
];

module.exports = routes;