# How to Secure Your Next.js E-commerce Site with RBAC and Permit.io

This project demonstrates how to build a secure e-commerce site using Next.js with Role-Based Access Control (RBAC) powered by Permit.io. You'll learn how to implement role-based permissions for features like creating stores, adding managers, and managing storefronts while integrating Permit.io for centralized role management.

## Features

- User authentication and role management.
- Role-based access control (RBAC) for Admin, Vendor, and Customer roles.
- Seamless integration with Permit.io for managing permissions and roles.
- Backend powered by Drizzle ORM and Vercel Postgres.
- Clean, modular code structure with reusable components and APIs.

## Live Demo

Access the live demo: [Demo Link](https://next-js-rbac-with-permit-io-demo.vercel.app/)

## Project Structure

```plaintext

├── app/ # Frontend components and routes
├── drizzle/ # Database ORM setup and schema definitions
├── lib/ # Permit.io SDK integration
├── public/ # Static assets
└── README.md # Project documentation
```

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js >= 18.x
- Vercel CLI (optional for deployment)
- A Permit.io account

## Installation

Clone the repository:

```bash
git clone https://github.com/uma-victor1/Next.js-RBAC-with-Permit.io-Demo.git
cd Next.js-RBAC-with-Permit.io-Demo

```

## Install dependencies:

```bash
npm install
```

## Set up environment variables:

Create a .env file with the following:

```env

PERMIT_IO_PDP_URL=<your-permit-pdp-url>
PERMIT_IO_API_KEY=<your-permit-api-key>
POSTGRES_URL=<your-vercel-postgres-url>
```

## Run the development server:

```bash
npm run dev
```

Access the app at http://localhost:3000.

Database Setup
This project uses Vercel Postgres to store user data, roles, and permissions. Configure the database schema as follows:

run:

```bash
npm run push
npm run seed
```

## License

This project is licensed under the MIT License.
