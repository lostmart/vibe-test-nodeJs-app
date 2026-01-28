describe('User API Endpoints', () => {
  describe('GET /api/users', () => {
    it('should return all users message', async () => {
      const response = await global.request
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toHaveProperty('message', 'Get all users');
    });

    it('should return proper JSON structure', async () => {
      const response = await global.request
        .get('/api/users')
        .expect(200);
      
      expect(response.body).toEqual(
        expect.objectContaining({
          message: expect.any(String)
        })
      );
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user with valid data', async () => {
      const newUser = {
        name: 'Test User',
        email: 'test@example.com',
        age: 25
      };

      const response = await global.request
        .post('/api/users')
        .send(newUser)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Create user');
    });

    it('should create user with minimal data', async () => {
      const minimalUser = {
        name: 'Minimal User'
      };

      const response = await global.request
        .post('/api/users')
        .send(minimalUser)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Create user');
    });

    it('should create user with empty body', async () => {
      const response = await global.request
        .post('/api/users')
        .send({})
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Create user');
    });

    it('should accept user with special characters', async () => {
      const specialUser = {
        name: 'José María García',
        email: 'josé@ejemplo.es'
      };

      const response = await global.request
        .post('/api/users')
        .send(specialUser)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Create user');
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return user with valid ID', async () => {
      const userId = 1;
      
      const response = await global.request
        .get(`/api/users/${userId}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('message', `Get user ${userId}`);
    });

    it('should handle zero as ID', async () => {
      const response = await global.request
        .get('/api/users/0')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Get user 0');
    });

    it('should handle negative ID', async () => {
      const response = await global.request
        .get('/api/users/-1')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Get user -1');
    });

    it('should handle very large ID', async () => {
      const largeId = 999999999;
      
      const response = await global.request
        .get(`/api/users/${largeId}`)
        .expect(200);

      expect(response.body).toHaveProperty('message', `Get user ${largeId}`);
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update user with valid ID and data', async () => {
      const userId = 1;
      const updatedData = {
        name: 'Updated User',
        email: 'updated@example.com',
        age: 30
      };

      const response = await global.request
        .put(`/api/users/${userId}`)
        .send(updatedData)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('message', `Update user ${userId}`);
    });

    it('should update user with partial data', async () => {
      const userId = 2;
      const partialData = {
        name: 'Partially Updated'
      };

      const response = await global.request
        .put(`/api/users/${userId}`)
        .send(partialData)
        .expect(200);

      expect(response.body).toHaveProperty('message', `Update user ${userId}`);
    });

    it('should update user with empty body', async () => {
      const userId = 3;

      const response = await global.request
        .put(`/api/users/${userId}`)
        .send({})
        .expect(200);

      expect(response.body).toHaveProperty('message', `Update user ${userId}`);
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete user with valid ID', async () => {
      const userId = 1;
      
      const response = await global.request
        .delete(`/api/users/${userId}`)
        .expect(200);

      expect(response.body).toHaveProperty('message', `Delete user ${userId}`);
    });

    it('should handle deletion of non-existent user', async () => {
      const nonExistentId = 99999;
      
      const response = await global.request
        .delete(`/api/users/${nonExistentId}`)
        .expect(200);

      expect(response.body).toHaveProperty('message', `Delete user ${nonExistentId}`);
    });
  });

  describe('Edge Cases', () => {
    it('should handle string ID in GET request', async () => {
      const response = await global.request
        .get('/api/users/abc')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Get user abc');
    });

    it('should handle string ID in PUT request', async () => {
      const response = await global.request
        .put('/api/users/abc')
        .send({ name: 'Test' })
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Update user abc');
    });

    it('should handle string ID in DELETE request', async () => {
      const response = await global.request
        .delete('/api/users/abc')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Delete user abc');
    });
  });
});