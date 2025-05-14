const InvariantError = require('./InvariantError');
const AuthenticationError = require('./AuthenticationError');
const NotFoundError = require('./NotFoundError');
const AuthorizationError = require('./AuthorizationError');

const DomainErrorTranslator = {
  translate(error) {
    // console.log(`error ${error.message}`);
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'Missing authentication': new AuthenticationError('Missing authentication'),
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('harus mengirimkan username dan password'),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('username dan password harus string'),
  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'ADD_THREAD_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new AuthenticationError('Missing authentication'),
  'ADD_THREAD_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('bad payload data type'),
  'ADD_THREAD_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('bad payload data type'),
  'ADD_COMMENT_USE_CASE.THREAD_NOT_FOUND': new NotFoundError('thread not found'),
  'ADD_COMMENT_USE_CASE.AUTHENTICATION_NOT_CONTAIN_NEEDED_PROPERTY': new AuthenticationError('Missing authentication'),
  'ADD_COMMENT_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('bad payload data type'),
  'ADD_COMMENT_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('bad payload data type'),
  'DELETE_COMMENT_USE_CASE.COMMENT_NOT_FOUND': new NotFoundError('comment not found'),
  'DELETE_COMMENT_USE_CASE.THREAD_ID_NOT_MATCH': new NotFoundError('thread not found'),
  'DELETE_COMMENT_USE_CASE.USER_ID_NOT_MATCH': new AuthorizationError('user not found'),
  'DELETE_COMMENT_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY': new AuthenticationError('Missing authentication'),
  'DELETE_COMMENT_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('bad payload data type'),
};

module.exports = DomainErrorTranslator;
