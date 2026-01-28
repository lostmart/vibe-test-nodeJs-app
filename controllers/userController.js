/**
 * @desc Get all users
 * @route GET /api/users
 * @access Public
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const getUsers = (req, res) => {
	res.status(200).json({ message: "Get all users" });
};

/**
 * @desc Get a single user
 * @route GET /api/users/:id
 * @access Public
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const getUser = (req, res) => {
	res.status(200).json({ message: `Get user ${req.params.id}` });
};

/**
 * @desc Create a user
 * @route POST /api/users
 * @access Public
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const createUser = (req, res) => {
	res.status(201).json({ message: "Create user" });
};

/**
 * @desc Update a user
 * @route PUT /api/users/:id
 * @access Public
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const updateUser = (req, res) => {
	res.status(200).json({ message: `Update user ${req.params.id}` });
};

/**
 * @desc Delete a user
 * @route DELETE /api/users/:id
 * @access Public
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const deleteUser = (req, res) => {
	res.status(200).json({ message: `Delete user ${req.params.id}` });
};

module.exports = {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
};
