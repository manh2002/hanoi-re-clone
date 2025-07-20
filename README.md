

---

# Hanoi Re Clone

A simplified clone of the Hanoi Re website built using Node.js, Express, and EJS. This project serves as a demonstration of web development of a dynamic web application with standard routing and error handling.

## Project Overview

The goal of this project is to replicate the functionality and layout of the Hanoi Re website in a simplified manner. The application utilizes Express for server-side logic and EJS as a templating engine.

## Installation

To run this project locally, you need to have [Node.js](https://nodejs.org/) installed.

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/hanoi-re-clone.git
   cd hanoi-re-clone
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

## Usage

To start the server, run the following command:

```bash
npm start
```

By default, the application will listen on port 8000. You can access the website by navigating to [http://localhost:8000](http://localhost:8000) in your browser.

For development purposes, you can also run:

```bash
npm run dev
```

This command will start the server in development mode.

## Features

- **Dynamic Routing**: Clean routes for home, products, finance, and news pages.
- **EJS Templating**: Use of EJS for dynamic HTML generation.
- **Error Handling**: Custom error pages for 404 and 500 errors.
- **Static Assets**: Serving static files from a designated public directory.

## Dependencies

The project uses the following npm packages:

- [Express](https://www.npmjs.com/package/express): A minimal and flexible Node.js web application framework.
- [EJS](https://www.npmjs.com/package/ejs): A simple templating language that lets you generate HTML markup with plain JavaScript.

### Other Dependencies
The project indirectly includes additional dependencies required by Express and EJS, which are managed via `package-lock.json`.

## Project Structure

Here is an overview of the project's directory structure:

```
hanoi-re-clone/
├── node_modules/          # Contains all installed dependencies
├── public/                # Static files (css, js, images, etc.)
├── views/                 # EJS template files
│   ├── error.ejs         # Error page template
│   └── index.ejs         # Main template file
├── package.json           # Project metadata and dependency definitions
├── package-lock.json      # Exact dependency tree
└── server.js              # Main server file
```

## Contact

For any inquiries, please reach out via the following contact details provided on the error pages:

- **Email**: contact@hanoire.com
- **Phone**: +84 24 3734 2828
- **Website**: [hanoire.com](https://www.hanoire.com)
