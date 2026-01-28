const request = require('supertest');
const app = require('../app');

// Mock the database for testing
jest.mock('../config/database', () => ({
  query: jest.fn(),
  connect: jest.fn(),
  end: jest.fn()
}));

global.request = request(app);