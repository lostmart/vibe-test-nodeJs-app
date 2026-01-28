describe('Book API Endpoints', () => {
  describe('GET /api/books', () => {
    it('should return all books', async () => {
      const response = await global.request
        .get('/api/books')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /api/books', () => {
    it('should create a new book', async () => {
      const newBook = {
        title: 'Test Book',
        author: 'Test Author',
        isbn: '1234567890123',
        published_year: 2023
      };

      const response = await global.request
        .post('/api/books')
        .send(newBook)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(newBook.title);
      expect(response.body.author).toBe(newBook.author);
    });
  });

  describe('GET /api/books/:id', () => {
    it('should return a specific book', async () => {
      const bookId = 1;
      
      const response = await global.request
        .get(`/api/books/${bookId}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('id', bookId);
    });
  });
});