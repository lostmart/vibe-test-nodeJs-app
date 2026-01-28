describe('Product API Endpoints', () => {
  describe('GET /api/products', () => {
    it('should return all products message', async () => {
      const response = await global.request
        .get('/api/products')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toHaveProperty('message', 'Get all products');
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

      expect(response.body).toHaveProperty('message', 'Create product');
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return a specific product message', async () => {
      const productId = 1;
      
      const response = await global.request
        .get(`/api/products/${productId}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('message', `Get product ${productId}`);
    });
  });
});