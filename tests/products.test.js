describe('Product API Endpoints', () => {
  describe('GET /api/products', () => {
    it('should return all products', async () => {
      const response = await global.request
        .get('/api/products')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const newProduct = {
        name: 'Test Product',
        price: 29.99,
        description: 'A test product'
      };

      const response = await global.request
        .post('/api/products')
        .send(newProduct)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newProduct.name);
      expect(response.body.price).toBe(newProduct.price);
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return a specific product', async () => {
      const productId = 1;
      
      const response = await global.request
        .get(`/api/products/${productId}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('id', productId);
    });
  });
});