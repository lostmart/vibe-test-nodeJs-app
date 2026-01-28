describe('User API Endpoints', () => {
  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const response = await global.request
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(Array.isArray(response.body)).toBe(true);
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

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newUser.name);
      expect(response.body.email).toBe(newUser.email);
    });

    it('should return 400 for invalid user data', async () => {
      const invalidUser = {
        name: '',
        email: 'invalid-email'
      };

      await global.request
        .post('/api/users')
        .send(invalidUser)
        .expect(400);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a specific user', async () => {
      const userId = 1;
      
      const response = await global.request
        .get(`/api/users/${userId}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('id', userId);
    });

    it('should return 404 for non-existent user', async () => {
      const nonExistentId = 99999;
      
      await global.request
        .get(`/api/users/${nonExistentId}`)
        .expect(404);
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

      expect(response.body.name).toBe(updatedData.name);
      expect(response.body.email).toBe(updatedData.email);
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete a user', async () => {
      const userId = 1;
      
      await global.request
        .delete(`/api/users/${userId}`)
        .expect(200);
    });
  });
});