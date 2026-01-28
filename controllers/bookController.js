// @desc Get all books
// @route GET /api/books
// @access Public
const getBooks = (req, res) => {
	res.status(200).json({ message: "Get all books" });
};

// @desc Get a single book
// @route GET /api/books/:id
// @access Public
const getBook = (req, res) => {
	res.status(200).json({ message: `Get book ${req.params.id}` });
};

// @desc Create a book
// @route POST /api/books
// @access Public
const createBook = (req, res) => {
	res.status(201).json({ message: "Create book" });
};

// @desc Update a book
// @route PUT /api/books/:id
// @access Public
const updateBook = (req, res) => {
	res.status(200).json({ message: `Update book ${req.params.id}` });
};

// @desc Delete a book
// @route DELETE /api/books/:id
// @access Public
const deleteBook = (req, res) => {
	res.status(200).json({ message: `Delete book ${req.params.id}` });
};

module.exports = {
	getBooks,
	getBook,
	createBook,
	updateBook,
	deleteBook,
};
