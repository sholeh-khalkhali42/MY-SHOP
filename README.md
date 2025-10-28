# 🛍️ MY-SHOP — Modern React E-Commerce Application


[![Vitest Coverage](https://img.shields.io/badge/Coverage-💯-green)](https://github.com/sholeh-khalkhali42/MY-SHOP)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-blue)](https://vercel.com/)

**MY-SHOP** is a modern e-commerce application built with **React**, **Redux Toolkit**, and **Formik/Yup**.  
It includes **unit and integration tests**, with automated **CI/CD deployment via GitHub Actions** defined in `/.github/workflows/main.yml`. The application is automatically deployed to **Vercel** upon successful tests.

---

## 📚 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Running Tests](#running-tests)
- [CI/CD Deployment](#cicd-deployment)
- [Installation and Running](#installation-and-running)
- [License](#license)

---

## 🔹 Features

- User authentication (Login / Register)  
- Protected routes (Private Routes)  
- State management with Redux Toolkit  
- Forms with Formik and validation using Yup  
- Responsive design (Mobile & Desktop)  
- **Unit and integration tests** for key pages and components  
- Automated deployment via GitHub Actions → Vercel  

---


✅ Tests are located **next to their respective components/pages** for easier maintenance and better code coverage.

---

## 🧪 Testing

The project contains **unit and integration tests** to ensure application stability:

- **Unit Tests:** Verify individual components such as buttons, forms, and product cards.  
- **Integration Tests:** Cover critical workflows like **CartPage**, **PrivateRoute**, and **ProductDetailPage** interactions.

All tests are executed using **Vitest + React Testing Library**.

---

## ⚙️ Running Tests

```bash
# Run all tests locally
npm run vitest

# Run tests in CI mode (GitHub Actions)
npm run vitest -- --ci


---

🚀 CI/CD Deployment

Workflow path:

.github/workflows/main.yml

Workflow steps:

1. Checkout the code


2. Install dependencies (npm install)


3. Run all tests (Unit + Integration) with Vitest


4. Build the project (npm run build)


5. Deploy to Vercel if all tests pass



Example main.yml:

name: CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npm run vitest -- --ci
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}


---

💻 Installation and Running

Prerequisites

Node.js ≥ 16

npm or yarn


Steps

git clone https://github.com/sholeh-khalkhali42/MY-SHOP.git
cd MY-SHOP
npm install
npm run dev

Open your browser at: http://localhost:3000


---

📄 License

MIT License
Copyright (c) 2025
Permission is hereby granted, free of charge, to any person obtaining a copy...
