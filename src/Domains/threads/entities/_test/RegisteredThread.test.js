const RegisteredThread = require('../RegisteredThread');

describe('RegisteredThread entities', () => {
    
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'Thread Title',
    };

    // Action & Assert
    expect(() => new RegisteredThread(payload)).toThrowError('REGISTERED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      title: 'Thread Title',
      body: 123,
    };

    // Action & Assert
    expect(() => new RegisteredThread(payload)).toThrowError('REGISTERED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create RegisteredThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'Thread Title',
      body: 'Thread Body',
    };

    // Action
    const registeredThread = new RegisteredThread(payload);

    // Assert
    expect(registeredThread.title).toEqual(payload.title);
    expect(registeredThread.body).toEqual(payload.body);
    expect(registeredThread.id).toEqual(payload.id);
  });
});