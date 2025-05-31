MY-SHOP
A modern e-commerce React application with user authentication, product browsing, cart management, and order processing.

Features
User authentication (login and registration) using a mock API

Private routes to protect user-specific pages

Fetching and displaying products from a public fake products API

Shopping cart with add/remove/update quantity functionality

Order placement and history tracking

Responsive UI with Bootstrap and Slick Carousel

State management with Redux Toolkit

Technologies
React 18 with Hooks and functional components

Redux Toolkit for state management

React Router v6 for routing and private routes

Bootstrap 5 for styling and responsive design

Slick Carousel for product sliders

Formik and Yup for form handling and validation

Axios for HTTP requests

API Integration
This project uses the following public APIs:

Authentication API

Endpoint: https://reqres.in/api/login

Used for user login. Accepts email and password, returns a JWT token on success.

This token is stored in Redux and used to protect private routes.

Products API

Endpoint: https://fakestoreapi.com/products

Provides a list of realistic fake products with details such as title, price, description, category, and image URLs.

Used to populate the products list and detail pages.

Project Structure
src/app — Redux store configuration

src/features — Redux slices for authentication, products, cart, and orders

src/components — Reusable UI components like Navbar, Footer, PrivateRoute, AppLayout

src/pages — Page components: Home, Login, Register, Products, ProductDetail, Cart, Checkout, Profile, Payment

src/routes — Application routing setup with public and private routes

Getting Started
Clone the repository

Run npm install to install dependencies

Run npm run dev to start the development server

Open http://localhost:3000 in your browser
## Contact

For questions or collaboration, find me on LinkedIn:  
[https://www.linkedin.com/in/sholeh-khalkhali](https://www.linkedin.com/in/sholeh-khalkhali)
