describe('User API Endpoints', () => {
  describe('GET /api/users', () => {
    it('should return all users message', async () => {
      const response = await global.request
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toHaveProperty('message', 'Get all users');
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'Test User',
        email: 'test@example.com'
      };

      const response = await global.request
        .post('/api/users')
        .send(newUser)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Create user');
    });

    it('should return 201 for any user data', async () => {
      const anyUser = {
        name: '',
        email: 'invalid-email'
      };

      await global.request
        .post('/api/users')
        .send(anyUser)
        .expect(201);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a specific user message', async () => {
      const userId = 1;
      
      const response = await global.request
        .get(`/api/users/${userId}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('message', `Get user ${userId}`);
    });

    it('should return 200 for any user ID', async () => {
      const anyId = 99999;
      
      await global.request
        .get(`/api/users/${anyId}`)
        .expect(200);
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update a user', async () => {
      const userId = 1;
      const updatedData = {
        name: 'Updated User',
        email: 'updated@example.com'
      };

      const response = await global.request
        .put(`/api/users/${userId}`)
        .send(updatedData)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('message', `Update user ${userId}`);
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete a user', async () => {
      const userId = 1;
      
      const response = await global.request
        .delete(`/api/users/${userId}`)
        .expect(200);

      expect(response.body).toHaveProperty('message', `Delete user ${userId}`);
    });
  });
});