# PhongTro123

A modern web application for posting and searching rental properties in Vietnam, including rooms, apartments, houses, and business spaces.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview
PhongTro123 is a fullstack web platform that streamlines the process of finding and posting rental listings. The project aims to provide a seamless experience for both landlords and tenants, with a focus on usability, security, and scalability.

## Features
- User authentication and authorization (JWT)
- Post, edit, and manage rental listings
- Advanced search and filtering by location, price, and area
- Responsive UI for desktop and mobile
- Admin dashboard for managing users and posts
- Direct contact between tenants and landlords
- Automated data scraping from external sources

## Tech Stack
- **Frontend:** ReactJS, Redux, TailwindCSS
- **Backend:** Node.js, Express.js, Sequelize ORM, MySQL
- **Other:** JWT Authentication, RESTful API, Web Scraping

## Getting Started

### Prerequisites
- Node.js >= 14.x
- MySQL

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/phamvangjang/RoomForRentProject.git
    cd PhongTro123
    ```
2. Install dependencies for both client and server:
    ```bash
    cd clientv2
    npm install
    cd ../server
    npm install
    ```
3. Configure environment variables and database in `server/src/config/config.json`.
4. Run database migrations (if using Sequelize CLI).
5. Start the backend server:
    ```bash
    npm start
    ```
6. Start the frontend:
    ```bash
    cd ../clientv2
    npm start
    ```

## Project Structure
```
PhongTro123/
  clientv2/      # Frontend source code (ReactJS)
  server/        # Backend source code (Node.js, Express)
  scapeData/     # Web scraping scripts and data
```

## Contributing
Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License
This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.
