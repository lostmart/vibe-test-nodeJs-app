describe('Book API Endpoints', () => {
  describe('GET /api/books', () => {
    it('should return all books message', async () => {
      const response = await global.request
        .get('/api/books')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toHaveProperty('message', 'Get all books');
    });

    it('should return proper JSON structure', async () => {
      const response = await global.request
        .get('/api/books')
        .expect(200);
      
      expect(response.body).toEqual(
        expect.objectContaining({
          message: expect.any(String)
        })
      );
    });
  });

  describe('POST /api/books', () => {
    it('should create a book with complete data', async () => {
      const newBook = {
        title: 'Test Book',
        author: 'Test Author',
        isbn: '1234567890123',
        published_year: 2023,
        genre: 'Fiction',
        pages: 250
      };

      const response = await global.request
        .post('/api/books')
        .send(newBook)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Create book');
    });

    it('should create book with minimal data', async () => {
      const minimalBook = {
        title: 'Minimal Book'
      };

      const response = await global.request
        .post('/api/books')
        .send(minimalBook)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Create book');
    });

    it('should create book with future publication year', async () => {
      const futureBook = {
        title: 'Future Book',
        author: 'Future Author',
        published_year: 2030
      };

      const response = await global.request
        .post('/api/books')
        .send(futureBook)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Create book');
    });

    it('should create book with very old publication year', async () => {
      const oldBook = {
        title: 'Ancient Book',
        author: 'Ancient Author',
        published_year: 1800
      };

      const response = await global.request
        .post('/api/books')
        .send(oldBook)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Create book');
    });

    it('should create book with invalid ISBN format', async () => {
      const invalidISBNBook = {
        title: 'Invalid ISBN Book',
        isbn: 'INVALIDISBN123'
      };

      const response = await global.request
        .post('/api/books')
        .send(invalidISBNBook)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Create book');
    });

    it('should create book with empty body', async () => {
      const response = await global.request
        .post('/api/books')
        .send({})
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Create book');
    });
  });

  describe('GET /api/books/:id', () => {
    it('should return book with valid ID', async () => {
      const bookId = 1;
      
      const response = await global.request
        .get(`/api/books/${bookId}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('message', `Get book ${bookId}`);
    });

    it('should handle zero as book ID', async () => {
      const response = await global.request
        .get('/api/books/0')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Get book 0');
    });

    it('should handle negative book ID', async () => {
      const response = await global.request
        .get('/api/books/-1')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Get book -1');
    });
  });

  describe('PUT /api/books/:id', () => {
    it('should update book with valid data', async () => {
      const bookId = 1;
      const updatedData = {
        title: 'Updated Book Title',
        author: 'Updated Author',
        published_year: 2024
      };

      const response = await global.request
        .put(`/api/books/${bookId}`)
        .send(updatedData)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('message', `Update book ${bookId}`);
    });

    it('should update book with partial data', async () => {
      const bookId = 2;
      const partialData = {
        title: 'New Title Only'
      };

      const response = await global.request
        .put(`/api/books/${bookId}`)
        .send(partialData)
        .expect(200);

      expect(response.body).toHaveProperty('message', `Update book ${bookId}`);
    });

    it('should update book with empty body', async () => {
      const bookId = 3;

      const response = await global.request
        .put(`/api/books/${bookId}`)
        .send({})
        .expect(200);

      expect(response.body).toHaveProperty('message', `Update book ${bookId}`);
    });
  });

  describe('DELETE /api/books/:id', () => {
    it('should delete book with valid ID', async () => {
      const bookId = 1;
      
      const response = await global.request
        .delete(`/api/books/${bookId}`)
        .expect(200);

      expect(response.body).toHaveProperty('message', `Delete book ${bookId}`);
    });

    it('should handle deletion of non-existent book', async () => {
      const nonExistentId = 99999;
      
      const response = await global.request
        .delete(`/api/books/${nonExistentId}`)
        .expect(200);

      expect(response.body).toHaveProperty('message', `Delete book ${nonExistentId}`);
    });
  });

  describe('Edge Cases', () => {
    it('should handle string ID in GET request', async () => {
      const response = await global.request
        .get('/api/books/harry-potter')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Get book harry-potter');
    });

    it('should handle special characters in book title', async () => {
      const specialBook = {
        title: 'El Niño y el Mar',
        author: 'Gabriel García Márquez',
        isbn: '978-0-06-088328-7'
      };

      const response = await global.request
        .post('/api/books')
        .send(specialBook)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Create book');
    });

    it('should handle very long book title', async () => {
      const longTitleBook = {
        title: 'The Extremely Long and Unnecessary Book Title That Goes On and On Forever Without Any Good Reason',
        author: 'Verbose Author'
      };

      const response = await global.request
        .post('/api/books')
        .send(longTitleBook)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Create book');
    });

    it('should handle decimal pages number', async () => {
      const weirdBook = {
        title: 'Strange Book',
        author: 'Strange Author',
        pages: 250.5
      };

      const response = await global.request
        .post('/api/books')
        .send(weirdBook)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Create book');
    });
  });
});