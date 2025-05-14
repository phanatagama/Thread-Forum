/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');
const Jwt = require('@hapi/jwt');
const JwtTokenManager = require('../src/Infrastructures/security/JwtTokenManager');
const NewAuthentication = require('../src/Domains/authentications/entities/NewAuth');

const AuthenticationsTableTestHelper = {
  async generateToken({ username, id }) {
    const authenticationTokenManager = new JwtTokenManager(Jwt.token);
    const accessToken = await authenticationTokenManager
      .createAccessToken({ username, id });
    const refreshToken = await authenticationTokenManager
      .createRefreshToken({ username, id });

    const newAuthentication = new NewAuthentication({
      accessToken,
      refreshToken,
    });

    await this.addToken(newAuthentication.refreshToken);
    return `Bearer ${newAuthentication.accessToken}`;
  },


  async addToken(token) {
    const query = {
      text: 'INSERT INTO authentications VALUES($1)',
      values: [token],
    };

    await pool.query(query);
  },

  async findToken(token) {
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token],
    };

    const result = await pool.query(query);

    return result.rows;
  },
  async cleanTable() {
    await pool.query('DELETE FROM authentications WHERE 1=1');
  },
};

module.exports = AuthenticationsTableTestHelper;
