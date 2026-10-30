# Vivacity 2027 CAMPUS AMBASSADOR

## Deployment Instructions

To deploy the Vivacity 2027 Campus Ambassador project to production, follow these steps:

### 1. Set Up the MySQL Database

- Create an MySQL database .
- Update the database credentials in the server's environment configuration file.

### 2. Install Dependencies

- Navigate to the `client` and `server` directories and install the required dependencies:
  ```bash
  cd client
  npm install
  cd ../server
  npm install
  ```

### 3. Build the Frontend for Production

- Navigate to the `client` directory and build the frontend:
  ```bash
  cd client
  npm run build
  ```

- This generates a `dist/` folder. You can serve this folder with:
  - **Nginx**
  - **Apache**

### 4. Build the Backend

- Navigate to the `server` directory and build the backend:

  ```bash
  cd server
  npm run build
  ```

- This compiles TypeScript → JavaScript inside `dist/`.

  ```bash
  npm start
  ```

- This starts the server.
