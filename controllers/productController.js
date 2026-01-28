/**
 * @desc Get all products
 * @route GET /api/products
 * @access Public
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const getProducts = (req, res) => {
	res.status(200).json({ message: "Get all products" });
};

/**
 * @desc Get a single product
 * @route GET /api/products/:id
 * @access Public
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const getProduct = (req, res) => {
	res.status(200).json({ message: `Get product ${req.params.id}` });
};

/**
 * @desc Create a product
 * @route POST /api/products
 * @access Public
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const createProduct = (req, res) => {
	res.status(201).json({ message: "Create product" });
};

/**
 * @desc Update a product
 * @route PUT /api/products/:id
 * @access Public
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const updateProduct = (req, res) => {
	res.status(200).json({ message: `Update product ${req.params.id}` });
};

/**
 * @desc Delete a product
 * @route DELETE /api/products/:id
 * @access Public
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const deleteProduct = (req, res) => {
	res.status(200).json({ message: `Delete product ${req.params.id}` });
};

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};
