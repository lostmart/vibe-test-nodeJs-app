describe('Product API Endpoints', () => {
  describe('GET /api/products', () => {
    it('should return all products message', async () => {
      const response = await global.request
        .get('/api/products')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toHaveProperty('message', 'Get all products');
    });

    it('should return proper JSON structure', async () => {
      const response = await global.request
        .get('/api/products')
        .expect(200);
      
      expect(response.body).toEqual(
        expect.objectContaining({
          message: expect.any(String)
        })
      );
    });
  });

  describe('POST /api/products', () => {
    it('should create a product with complete data', async () => {
      const newProduct = {
        name: 'Test Product',
        price: 29.99,
        description: 'A test product',
        category: 'Electronics',
        stock: 100
      };

      const response = await global.request
        .post('/api/products')
        .send(newProduct)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Create product');
    });

    it('should create product with minimal data', async () => {
      const minimalProduct = {
        name: 'Minimal Product'
      };

      const response = await global.request
        .post('/api/products')
        .send(minimalProduct)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Create product');
    });

    it('should create product with zero price', async () => {
      const freeProduct = {
        name: 'Free Product',
        price: 0
      };

      const response = await global.request
        .post('/api/products')
        .send(freeProduct)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Create product');
    });

    it('should create product with negative price', async () => {
      const discountProduct = {
        name: 'Discount Product',
        price: -10.50
      };

      const response = await global.request
        .post('/api/products')
        .send(discountProduct)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Create product');
    });

    it('should create product with empty body', async () => {
      const response = await global.request
        .post('/api/products')
        .send({})
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Create product');
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return product with valid ID', async () => {
      const productId = 1;
      
      const response = await global.request
        .get(`/api/products/${productId}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('message', `Get product ${productId}`);
    });

    it('should handle zero as product ID', async () => {
      const response = await global.request
        .get('/api/products/0')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Get product 0');
    });

    it('should handle negative product ID', async () => {
      const response = await global.request
        .get('/api/products/-1')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Get product -1');
    });
  });

  describe('PUT /api/products/:id', () => {
    it('should update product with valid data', async () => {
      const productId = 1;
      const updatedData = {
        name: 'Updated Product',
        price: 39.99,
        description: 'Updated description'
      };

      const response = await global.request
        .put(`/api/products/${productId}`)
        .send(updatedData)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('message', `Update product ${productId}`);
    });

    it('should update product with partial data', async () => {
      const productId = 2;
      const partialData = {
        price: 49.99
      };

      const response = await global.request
        .put(`/api/products/${productId}`)
        .send(partialData)
        .expect(200);

      expect(response.body).toHaveProperty('message', `Update product ${productId}`);
    });

    it('should update product with empty body', async () => {
      const productId = 3;

      const response = await global.request
        .put(`/api/products/${productId}`)
        .send({})
        .expect(200);

      expect(response.body).toHaveProperty('message', `Update product ${productId}`);
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should delete product with valid ID', async () => {
      const productId = 1;
      
      const response = await global.request
        .delete(`/api/products/${productId}`)
        .expect(200);

      expect(response.body).toHaveProperty('message', `Delete product ${productId}`);
    });

    it('should handle deletion of non-existent product', async () => {
      const nonExistentId = 99999;
      
      const response = await global.request
        .delete(`/api/products/${nonExistentId}`)
        .expect(200);

      expect(response.body).toHaveProperty('message', `Delete product ${nonExistentId}`);
    });
  });

  describe('Edge Cases', () => {
    it('should handle string ID in GET request', async () => {
      const response = await global.request
        .get('/api/products/laptop')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Get product laptop');
    });

    it('should handle special characters in product name', async () => {
      const specialProduct = {
        name: 'Café & Té Set',
        price: 15.99
      };

      const response = await global.request
        .post('/api/products')
        .send(specialProduct)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Create product');
    });

    it('should handle very long product name', async () => {
      const longProduct = {
        name: 'A'.repeat(1000),
        price: 1.99
      };

      const response = await global.request
        .post('/api/products')
        .send(longProduct)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Create product');
    });
  });
});