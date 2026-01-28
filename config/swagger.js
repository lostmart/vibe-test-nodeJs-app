const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "Node.js MySQL API",
    version: "1.0.0",
    description: "API documentation for the Node.js MySQL application",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Development server",
    },
  ],
  tags: [
    {
      name: "Users",
      description: "User management and retrieval",
    },
    {
      name: "Products",
      description: "Product management and retrieval",
    },
    {
      name: "Books",
      description: "Book management and retrieval",
    },
  ],
  paths: {
    "/users": {
      get: {
        summary: "Get all users",
        tags: ["Users"],
        responses: {
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new user",
        tags: ["Users"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        responses: {
          201: {
            description: "User created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
        },
      },
    },
    "/users/{id}": {
      get: {
        summary: "Get a user by ID",
        tags: ["Users"],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "string",
            },
            required: true,
            description: "ID of the user to retrieve",
          },
        ],
        responses: {
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          404: {
            description: "User not found",
          },
        },
      },
      put: {
        summary: "Update a user by ID",
        tags: ["Users"],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "string",
            },
            required: true,
            description: "ID of the user to update",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        responses: {
          200: {
            description: "User updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          404: {
            description: "User not found",
          },
        },
      },
      delete: {
        summary: "Delete a user by ID",
        tags: ["Users"],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "string",
            },
            required: true,
            description: "ID of the user to delete",
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
          },
          404: {
            description: "User not found",
          },
        },
      },
    },
    "/products": {
      get: {
        summary: "Get all products",
        tags: ["Products"],
        responses: {
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Product",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new product",
        tags: ["Products"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Product",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Product created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
        },
      },
    },
    "/products/{id}": {
      get: {
        summary: "Get a product by ID",
        tags: ["Products"],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "string",
            },
            required: true,
            description: "ID of the product to retrieve",
          },
        ],
        responses: {
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
          404: {
            description: "Product not found",
          },
        },
      },
      put: {
        summary: "Update a product by ID",
        tags: ["Products"],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "string",
            },
            required: true,
            description: "ID of the product to update",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Product",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Product updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
          404: {
            description: "Product not found",
          },
        },
      },
      delete: {
        summary: "Delete a product by ID",
        tags: ["Products"],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "string",
            },
            required: true,
            description: "ID of the product to delete",
          },
        ],
        responses: {
          200: {
            description: "Product deleted successfully",
          },
          404: {
            description: "Product not found",
          },
        },
      },
    },
    "/books": {
      get: {
        summary: "Get all books",
        tags: ["Books"],
        responses: {
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Book",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new book",
        tags: ["Books"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Book",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Book created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Book",
                },
              },
            },
          },
        },
      },
    },
    "/books/{id}": {
      get: {
        summary: "Get a book by ID",
        tags: ["Books"],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "string",
            },
            required: true,
            description: "ID of the book to retrieve",
          },
        ],
        responses: {
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Book",
                },
              },
            },
          },
          404: {
            description: "Book not found",
          },
        },
      },
      put: {
        summary: "Update a book by ID",
        tags: ["Books"],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "string",
            },
            required: true,
            description: "ID of the book to update",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Book",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Book updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Book",
                },
              },
            },
          },
          404: {
            description: "Book not found",
          },
        },
      },
      delete: {
        summary: "Delete a book by ID",
        tags: ["Books"],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "string",
            },
            required: true,
            description: "ID of the book to delete",
          },
        ],
        responses: {
          200: {
            description: "Book deleted successfully",
          },
          404: {
            description: "Book not found",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            readOnly: true,
          },
          name: {
            type: "string",
            example: "John Doe",
          },
          email: {
            type: "string",
            format: "email",
            example: "john.doe@example.com",
          },
        },
        required: ["name", "email"],
      },
      Product: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            readOnly: true,
          },
          name: {
            type: "string",
            example: "Laptop",
          },
          price: {
            type: "number",
            format: "float",
            example: 1200.00,
          },
        },
        required: ["name", "price"],
      },
      Book: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            readOnly: true,
          },
          title: {
            type: "string",
            example: "The Hitchhiker's Guide to the Galaxy",
          },
          author: {
            type: "string",
            example: "Douglas Adams",
          },
          isbn: {
            type: "string",
            example: "978-0345391803",
          },
        },
        required: ["title", "author", "isbn"],
      },
    },
  },
};

module.exports = swaggerDef;
