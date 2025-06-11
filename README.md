# Next.js Ecommerce Project

This is a fully functional ecommerce web application built using Next.js, React, and other modern web technologies. It aims to provide a seamless and engaging online shopping experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Syncing up the Database](#syncing-up-the-database)
  - [Configuring the FileStorage](#configuring-the-filestorage)
  - [Running the Development Server](#running-the-development-server)
- [Project Structure](#project-structure)
- [Entity Relationship Diagram](#entity-relationship-diagram)
- [Screenshots](#screenshots)


## Features

- **Product Catalog:** Browse a wide range of products with detailed descriptions, images, and pricing.
- **Product Filtering and Sorting:** Easily filter products by categories, price range, and other attributes. Sort products by relevance, price, etc.
- **User Authentication:** Secure user registration and login with password management additionally all the communications between the Server & Client are end to end protected.
- **Shopping Cart:** Add, remove, and update items in a persistent shopping cart.
- **Checkout Process:** A streamlined and secure checkout process with order summary and details..
- **Product Reviews:** Allow users to leave reviews and ratings for their ordered products.
- **Wishlist:** Enable users to save products for later purchase.

## Technologies Used

- **Next.js:** A React framework for building server-rendered and statically generated applications.
- **React:** A JavaScript library for building user interfaces.
- **[Styling Library/Framework]:** This project utilizes Tailwind CSS for utility-first styling and Shadcn UI for small pre-built, customizable components, enabling rapid and flexible UI development.
- **[Backend Technology/Service]:** Next JS - For handling data, authentication, and backend logic.
- **[Database]:** SSMS - For storing product data, user information, and orders.

## Getting Started

Follow these steps to get a local development environment running.

### Prerequisites

- **Node.js:** Ensure you have Node.js (version 20 or later recommended) and npm or yarn installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **Database Setup:** Ensure you have SSMS setup in local machine with SQL Server (version 16 or later recommended) and Create a Database for Ecommerce app

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [repository-url]
    cd [project-directory-name]
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Environment Variables

You will need to configure environment variables for your project to connect to your database, APIs, and other services.

1.  **Create a `.env` file** in the root directory of your project.

2.  **Add the necessary environment variables.** Here are variables you might need for this project:

    ```
    ECOMMERCE_DATABASE="sqlserver://localhost:1433;initial catalog=<DatabaseName>;user=<UserName>;password=<Password>;trustServerCertificate=true;"
    ```

    **Note:** Replace the `<Tags>` with proper values

    **Important:** Do not commit your `.env` file to your version control system. It contains sensitive information.

### Syncing up the Database

1. **Generate Prisma Models**:
   ```bash
   npx prisma generate
   ```
2. **Setup the DB Scripts**:
   Open up the `ExecuteSQLScripts.bat` and update the SQL Server Credentials to seed the database with latest Stored Procedures scripts
3. **Seeding & Syncing the Database**:
   ```bash
   npx prisma db push --force-reset && npx prisma db seed && cd prisma && call CreateConsolidatedScripts.bat && call ExecuteSQLScripts.bat && cd ..
   ```

### Configuring the FileStorage

1. Extract the `public/static/ECommerce_Assets.zip` into a seperate folder
2. Move the folder to any Folder path
3. Run the following query to update the File Store Configs into the Database
   ```sql
   UPDATE FileStoreConfigs SET Path = '<FilePath>' WHERE Id = 1;
   ```

**Example:**
`UPDATE FileStoreConfigs SET Path = 'D:\Ecommerce' WHERE Id = 1;`

### Running the Development Server

To start the Next.js development server, run the following command in your project directory:

```bash
npm run dev
# or
yarn dev
```

## Project Structure

- `public`: It will contain all the Static Assets like images needed for Project
- `src`: Contains the main source code of the application.

  - `app`: This directory holds the core application logic and routing structure.

    - `account`: Related to user account management.
    - `api`: Handles server-side API endpoints.
    - `cart`: Manages shopping cart functionality.
    - `checkout`: Handles the checkout process.
    - `login`: Files related to user login.
    - `logout`: Files related to user logout.
    - `product`: Manages individual product pages.
    - `shop`: Handles the main shop/catalog page.
    - `signup`: Files related to user registration.
    - `trackorder`: Handles order tracking functionality.
    - `wishlist`: Manages user's wishlist.

  - `components`: Contains application-specific components.

    - `custom`: Houses components that are specific to the application's business logic. These components are constructed using smaller, reusable UI elements.

      - `Account`: Components related to the user account section.
      - `BannerBar`: Components for common Banner.
      - `Cart`: Components for the shopping cart functionality.
      - `Checkout`: Components for the checkout process.
      - `FooterBar`: Components for the footer section.
      - `Home`: Components for the home page.
      - `Login`: Components for the login page.
      - `NavigationBar`: Components for the navigation bar.
      - `Product`: Components for displaying product information.
      - `Shop`: Components for the shop/catalog page.
      - `Signup`: Components for the signup page.
      - `TrackOrder`: Components for tracking orders.
      - `Wishlist`: Components for the wishlist functionality.

    - `ui`: Contains small, reusable UI components used across different parts of the application. These are the basic building blocks for the application's user interface (e.g., buttons, inputs, cards).

  - `lib`: Contains utility functions and helper libraries.
  - `server`: Contains server-side functions.

## Entity Relationship Diagram

![ERD](/public/ECommerce_ERD.png)

**Image Credit:** [Primaliser](https://prismaliser.app/)

**NOTE**: Please check the `schema.prisma` to get more knowledge about the Entities and their Relationships.

## Screenshots

1. **Login**:

   ![Login](/public/Screenshots/Login.png)

2. **Signup**:

   ![Signup](/public/Screenshots/Signup.png)

3. **Login Failed**:

   ![FailedLogin](/public/Screenshots/FailedLogin.png)

4. **Home**:

   ![Home](/public/Screenshots/Home.png)

5. **Shop**:

   ![Shop](/public/Screenshots/Shop.png)

6. **Shop (with Filters)**:

   ![ShopWithFilters](/public/Screenshots/ShopWithFilters.png)

7. **Product**:

   ![Product](/public/Screenshots/Product.png)

8. **Product (with Variants & Reviews)**:

   ![ProductVariantsAndReviews](/public/Screenshots/ProductVariantWithReviews.png)

9. **Review**:

   ![Review](/public/Screenshots/ReviewForm.png)

10. **Cart**:

    ![Cart](/public/Screenshots/Cart.png)

11. **Cart Address**:

    ![CartAddress](/public/Screenshots/CartAddress.png)

12. **Cart (Import Address)**:

    ![CartImportAddress](/public/Screenshots/CartImportAddress.png)

13. **Cart Totals**:

    ![CartTotals](/public/Screenshots/CartTotals.png)

14. **Empty Wishlist**:

    ![EmptyWishlist](/public/Screenshots/EmptyWishlist.png)

15. **Wishlist**:

    ![Wishlist](/public/Screenshots/Wishlists.png)

16. **Checkout**:

    ![Checkout](/public/Screenshots/Checkout.png)

17. **Track Order**:

    ![TrackOrder](/public/Screenshots/TrackOrder.png)

18. **Empty Cart**:

    ![EmptyCart](/public/Screenshots/EmptyCart.png)

19. **User Account Details**:

    ![AccountDetails](/public/Screenshots/UserAccounts.png)

20. **Change Password**:

    ![ChangePassword](/public/Screenshots/ChangePassword.png)

21. **User Orders**:

    ![YourOrders](/public/Screenshots/YourOrders.png)

22. **User Addresses**:

    ![YourAddresses](/public/Screenshots/YourAddresses.png)

23. **Create Address**:

    ![CreateAddress](/public/Screenshots/CreateAddress.png)

24. **Edit Address**:

    ![EditAddress](/public/Screenshots/EditAddress.png)

25. **Logout**:

    ![Logout](/public/Screenshots/Logout.png)
