MY-SHOP
A modern React e-commerce web application with Redux Toolkit state management, JWT authentication, and full CRUD functionality for products, cart, orders, and user management. Designed with Bootstrap and slick-carousel for a responsive, user-friendly interface.

Table of Contents
Project Overview

Features

Technologies Used

Getting Started

Project Structure

API Integration

Authentication

State Management

Routing

Styling

Available Scripts

Contributing

License

Project Overview
MY-SHOP is an e-commerce frontend built with React and Redux Toolkit. It supports user registration, login, product browsing, detailed product pages, shopping cart, checkout process, and order management. The app interacts with a REST API to fetch and manage product and user data. It uses JWT tokens for secure user authentication and authorization.

Features
User registration and login with JWT authentication

Product listing with pagination, filtering, and search

Product detail pages with images and descriptions

Shopping cart with add/remove and quantity update

Secure checkout and order placement

Protected routes for authenticated user areas (profile, checkout)

Responsive design using Bootstrap and slick-carousel

State management with Redux Toolkit and slices

Clean project structure with React Router for navigation

Technologies Used
React 18+

Redux Toolkit (RTK) for state management

React Router v6 for routing

Bootstrap 5 for responsive styling

slick-carousel for product sliders

Axios or fetch for API calls

JSON Web Tokens (JWT) for authentication

Vite as the build tool

Getting Started
Prerequisites
Node.js (v16 or higher recommended)

npm or yarn package manager

Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/sholeh-khalkhali42/MY-SHOP.git
cd MY-SHOP
Install dependencies:

bash
Copy
Edit
npm install
# or
yarn install
Start the development server:

bash
Copy
Edit
npm run dev
# or
yarn dev
Open your browser at http://localhost:5173 (or the port shown in the console).

Project Structure
bash
Copy
Edit
MY-SHOP/
│
├── public/                     # Static assets (favicon, images, etc.)
├── src/
│   ├── app/
│   │   └── store.js            # Redux store setup
│   ├── assets/                 # Images and static files
│   ├── components/             # Reusable components (Navbar, Footer, PrivateRoute, Layout)
│   ├── features/               # Redux slices (authSlice, productsSlice, cartSlice, orderSlice)
│   ├── pages/                  # Page components (Home, Login, Register, Profile, Products, Cart, Checkout)
│   ├── routes/
│   │   └── router.jsx          # React Router setup
│   ├── index.css               # Global CSS
│   └── main.jsx                # Entry point rendering the app
│
├── .env                       # Environment variables (API URLs, keys)
├── package.json
├── vite.config.js
└── README.md
API Integration
This project connects to a backend REST API for data operations. The backend provides endpoints for:

User authentication:

POST /auth/register for user registration

POST /auth/login for user login

Products:

GET /products to fetch all products

GET /products/:id to fetch product details

Orders:

POST /orders to place new orders

GET /orders to fetch user orders

Cart:

Cart is managed locally on the frontend via Redux state.

Authentication
Uses JWT tokens for secure authentication.

After login, the JWT token is stored in Redux state.

Protected routes use a <PrivateRoute> component that redirects unauthenticated users to the login page.

API requests requiring authentication send the JWT token in the Authorization header:

makefile
Copy
Edit
Authorization: Bearer <token>
State Management
Utilizes Redux Toolkit with slices for modular state management.

Key slices include:

authSlice: handles user authentication and token management

productsSlice: manages product data and fetching status

cartSlice: manages shopping cart items and quantities

orderSlice: handles order creation and order history

Routing
Uses React Router v6 for client-side routing.

Routes are nested inside a main AppLayout component which includes Navbar and Footer.

Private routes are protected with a <PrivateRoute> wrapper.

Styling
Uses Bootstrap 5 for responsive layout and components.

Incorporates slick-carousel for product image sliders and carousels.

Custom styles are written in CSS modules or global CSS files like index.css.

Available Scripts
npm run dev or yarn dev: Start development server

npm run build or yarn build: Create production build

npm run preview or yarn preview: Preview production build locally

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create a new branch (git checkout -b feature/your-feature)

Make your changes and commit them (git commit -m "Add feature")

Push to the branch (git push origin feature/your-feature)

Open a Pull Request

License
This project is licensed under the MIT License.
Contact
For any questions or inquiries, you can reach me on LinkedIn:

https://www.linkedin.com/in/sholeh-khalkhali

