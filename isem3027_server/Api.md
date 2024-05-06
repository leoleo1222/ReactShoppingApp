## API Endpoints Documentation

This documentation covers the available API endpoints for products and admin accounts. Each endpoint supports multiple HTTP methods, which are described below.



### Product Endpoints'

`localhost/api/products/<int:pk>`
`localhost/api/products/`

#### 1. `/products/<int:pk>`
   - **GET**: Retrieves the details of a specific product using its unique ID (`pk`).
   - **DELETE**: Deletes a specific product using its unique ID (`pk`).
   - **PATCH**: Updates specific fields of a product using its unique ID (`pk`).
   - **POST**: Typically not used as POST is for creating resources and should be directed to `/products/`.

#### 2. `/products/`
   - **GET**: Retrieves a list of all products.


`localhost/admin/account/<str:username>/`
`localhost/admin/account/`

### Admin Account Endpoints

#### 5. `/admin/account/<str:username>/`
   - **GET**: Retrieves the details of a specific admin account using the username.
   - **DELETE**: Deletes a specific admin account using the username.
   - **PATCH**: Updates specific fields of an admin account using the username.
   - **POST**: Typically not used as POST is for creating resources and should be directed to `/admin/account/`.

#### 6. `/admin/account/`
   - **GET**: Retrieves a list of all admin accounts.
