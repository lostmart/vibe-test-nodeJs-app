describe('Complete API Endpoint Coverage', () => {
  
  // Test all 15 endpoints systematically
  
  describe('User Endpoints (5 total)', () => {
    it('GET /api/users - should return all users', async () => {
      const response = await global.request
        .get('/api/users')
        .expect(200);
      expect(response.body.message).toBe('Get all users');
    });

    it('POST /api/users - should create a user', async () => {
      const response = await global.request
        .post('/api/users')
        .send({ name: 'Test User', email: 'test@test.com' })
        .expect(201);
      expect(response.body.message).toBe('Create user');
    });

    it('GET /api/users/:id - should get a specific user', async () => {
      const response = await global.request
        .get('/api/users/1')
        .expect(200);
      expect(response.body.message).toBe('Get user 1');
    });

    it('PUT /api/users/:id - should update a user', async () => {
      const response = await global.request
        .put('/api/users/1')
        .send({ name: 'Updated User' })
        .expect(200);
      expect(response.body.message).toBe('Update user 1');
    });

    it('DELETE /api/users/:id - should delete a user', async () => {
      const response = await global.request
        .delete('/api/users/1')
        .expect(200);
      expect(response.body.message).toBe('Delete user 1');
    });
  });

  describe('Product Endpoints (5 total)', () => {
    it('GET /api/products - should return all products', async () => {
      const response = await global.request
        .get('/api/products')
        .expect(200);
      expect(response.body.message).toBe('Get all products');
    });

    it('POST /api/products - should create a product', async () => {
      const response = await global.request
        .post('/api/products')
        .send({ name: 'Test Product', price: 29.99 })
        .expect(201);
      expect(response.body.message).toBe('Create product');
    });

    it('GET /api/products/:id - should get a specific product', async () => {
      const response = await global.request
        .get('/api/products/1')
        .expect(200);
      expect(response.body.message).toBe('Get product 1');
    });

    it('PUT /api/products/:id - should update a product', async () => {
      const response = await global.request
        .put('/api/products/1')
        .send({ name: 'Updated Product' })
        .expect(200);
      expect(response.body.message).toBe('Update product 1');
    });

    it('DELETE /api/products/:id - should delete a product', async () => {
      const response = await global.request
        .delete('/api/products/1')
        .expect(200);
      expect(response.body.message).toBe('Delete product 1');
    });
  });

  describe('Book Endpoints (5 total)', () => {
    it('GET /api/books - should return all books', async () => {
      const response = await global.request
        .get('/api/books')
        .expect(200);
      expect(response.body.message).toBe('Get all books');
    });

    it('POST /api/books - should create a book', async () => {
      const response = await global.request
        .post('/api/books')
        .send({ title: 'Test Book', author: 'Test Author' })
        .expect(201);
      expect(response.body.message).toBe('Create book');
    });

    it('GET /api/books/:id - should get a specific book', async () => {
      const response = await global.request
        .get('/api/books/1')
        .expect(200);
      expect(response.body.message).toBe('Get book 1');
    });

    it('PUT /api/books/:id - should update a book', async () => {
      const response = await global.request
        .put('/api/books/1')
        .send({ title: 'Updated Book' })
        .expect(200);
      expect(response.body.message).toBe('Update book 1');
    });

    it('DELETE /api/books/:id - should delete a book', async () => {
      const response = await global.request
        .delete('/api/books/1')
        .expect(200);
      expect(response.body.message).toBe('Delete book 1');
    });
  });

  describe('Cross-Resource Tests', () => {
    it('should handle multiple different resources simultaneously', async () => {
      const userResponse = await global.request.get('/api/users').expect(200);
      const productResponse = await global.request.get('/api/products').expect(200);
      const bookResponse = await global.request.get('/api/books').expect(200);

      expect(userResponse.body.message).toBe('Get all users');
      expect(productResponse.body.message).toBe('Get all products');
      expect(bookResponse.body.message).toBe('Get all books');
    });

    it('should handle same ID across different resources', async () => {
      const userId = 42;
      const productId = 42;
      const bookId = 42;

      const userResponse = await global.request.get(`/api/users/${userId}`).expect(200);
      const productResponse = await global.request.get(`/api/products/${productId}`).expect(200);
      const bookResponse = await global.request.get(`/api/books/${bookId}`).expect(200);

      expect(userResponse.body.message).toBe(`Get user ${userId}`);
      expect(productResponse.body.message).toBe(`Get product ${productId}`);
      expect(bookResponse.body.message).toBe(`Get book ${bookId}`);
    });
  });

  describe('HTTP Status Code Verification', () => {
    it('should return correct status codes for all GET endpoints', async () => {
      await global.request.get('/api/users').expect(200);
      await global.request.get('/api/users/1').expect(200);
      await global.request.get('/api/products').expect(200);
      await global.request.get('/api/products/1').expect(200);
      await global.request.get('/api/books').expect(200);
      await global.request.get('/api/books/1').expect(200);
    });

    it('should return correct status codes for all POST endpoints', async () => {
      await global.request.post('/api/users').send({}).expect(201);
      await global.request.post('/api/products').send({}).expect(201);
      await global.request.post('/api/books').send({}).expect(201);
    });

    it('should return correct status codes for all PUT endpoints', async () => {
      await global.request.put('/api/users/1').send({}).expect(200);
      await global.request.put('/api/products/1').send({}).expect(200);
      await global.request.put('/api/books/1').send({}).expect(200);
    });

    it('should return correct status codes for all DELETE endpoints', async () => {
      await global.request.delete('/api/users/1').expect(200);
      await global.request.delete('/api/products/1').expect(200);
      await global.request.delete('/api/books/1').expect(200);
    });
  });

  describe('Response Format Verification', () => {
    it('should return JSON content type for all endpoints', async () => {
      const endpoints = [
        { method: 'get', path: '/api/users' },
        { method: 'get', path: '/api/products' },
        { method: 'get', path: '/api/books' },
        { method: 'post', path: '/api/users' },
        { method: 'post', path: '/api/products' },
        { method: 'post', path: '/api/books' },
        { method: 'put', path: '/api/users/1' },
        { method: 'put', path: '/api/products/1' },
        { method: 'put', path: '/api/books/1' },
        { method: 'delete', path: '/api/users/1' },
        { method: 'delete', path: '/api/products/1' },
        { method: 'delete', path: '/api/books/1' }
      ];

      for (const endpoint of endpoints) {
        const response = await global.request[endpoint.method](endpoint.path).send({});
        expect(response.headers['content-type']).toMatch(/json/);
      }
    });

    it('should return consistent message structure', async () => {
      const endpoints = [
        { method: 'get', path: '/api/users' },
        { method: 'post', path: '/api/users' },
        { method: 'put', path: '/api/users/1' },
        { method: 'delete', path: '/api/users/1' }
      ];

      for (const endpoint of endpoints) {
        const response = await global.request[endpoint.method](endpoint.path).send({});
        expect(response.body).toHaveProperty('message');
        expect(typeof response.body.message).toBe('string');
      }
    });
  });
});