# Developer Team Ticket System

## Overview

This project is a ticket system designed for development teams, utilizing the MERN stack (MongoDB, Express.js, React.js, Node.js) with additional technologies to enhance functionality and security. It employs custom web tokens for authentication, Redis as a token registry, and integrates GitHub Actions for CI/CD. The system is hosted on Azure, ensuring robust and scalable deployment. The project is developed by a team of two: Ahmed and Karim.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Team](#team)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features
- User Authentication (Custom Tokens)
- Token Registry with Redis
- Ticket Creation and Management
- Role-based Access Control
- Continuous Integration and Deployment with GitHub Actions
- Secure Practices with bcrypt, helmet, cors, and Synk
- MVC Architecture

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Redis

### Frontend
- React.js
- ShadCN
- Material-UI

### DevOps
- GitHub Actions
- Azure

### Security
- Custom Tokens
- bcrypt
- helmet
- cors
- Synk

## Team

- Ahmed Achour
- Karim Arfaoui

## Installation

### Prerequisites
- Node.js
- MongoDB
- Redis
- Azure Account

### Backend
1. Clone the repository
    ```sh
    git clone https://github.com/17med/Tickets_System.git
    cd Tickets_System/backend
    ```
2. Install dependencies
    ```sh
    npm install
    ```
3. Set up environment variables (create a `.env` file)
    ```env
    PORT=8080
    urldb=mongodb://localhost:27017/ticket
    cashdb=redis://127.0.0.1:6379
    secret=secert code 
    ```

### Frontend
1. Navigate to the frontend directory
    ```sh
    cd ../front
    ```
2. Install dependencies
    ```sh
    npm install
    ```

3.  Vite Configuration
In your Vite configuration file (`vite.config.js`), set up a proxy to redirect API calls to the backend server:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"


export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
})
```

## Configuration

### Custom Web Token
- The project uses JWT for authentication. The secret key is specified in the `.env` file (`secret`).
- Redis is used as a registry for JWTs, ensuring that tokens can be invalidated and managed effectively. Configure Redis connection string (`cashdb`) in the `.env` file.

### Security
- Passwords are hashed using bcrypt.
- helmet is used to secure HTTP headers.
- cors is configured to manage cross-origin requests.
- Synk is integrated for vulnerability scanning.

### GitHub Actions
- Continuous integration and deployment are managed by GitHub Actions. The workflows are defined in the `.github/workflows` directory.

### Azure
- The application is deployed on Azure. Ensure you have the necessary Azure credentials and configurations in place.

## Usage

### Running the Backend Server
```sh
cd backend
npm start
```

### Running the Frontend Development Server
```sh
cd front
npm run dev
```

### Building for Production
```sh
cd backend
npm run build
```

## Deployment

### GitHub Actions
- The project includes a GitHub Actions workflow for CI/CD. The workflow is triggered on push and pull request events to the main branch.
- Ensure your Azure credentials are set up in the GitHub repository secrets.

### Azure Deployment
- The deployment configuration is handled via GitHub Actions. Customize the deployment scripts as necessary to fit your Azure setup.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

--------------------------------------------------------
#### update Number v0.1.12 2024/03/28
* Add the ability to promote a normal user to admin or demote an admin to a normal user.
* Ensure that the owner is protected from normal users who have the ability to promote a normal user to admin.
* Include a "Show Project" section that displays project details such as name, description, and tickets.
* Implement some animations for the user interface (UI).
----------------------------------------------------------------
#### update Number v0.1.11 2024/03/27
* Convert the UI components from Material-UI to Shadow DOM.
* Validate whether the user is accessing the application from a computer or mobile device to display the appropriate UI.
