# ElectronicsStore

The project implements an online electronics store.

Table of contents

- [About](#1-about)
  - [Main application features](#11-main-application-features)
  - [Application preview](#12-application-preview)
- [How to configure](#2-how-to-configure)
  - [Configure WebAPI application](#21-configure-webapi-application)
  - [Configure React application](#22-configure-react-application)
- [How to run](#3-how-to-run)
  - [How to run WebAPI application](#31-how-to-run-webapi-application)
  - [How to run React application](#32-how-to-run-react-application)
- [Description of the project architectur](#4-description-of-the-project-architectur)
  - [Summary](#41-summary)
  - [Web API project](#42-web-api-project)
    - [Database scheme](#422-database-scheme)
  - [React application](#43-react-application)

## 1. About

This project implements an online store using ASP.NET Core WebAPI for the back-end and a React application for the front-end.

### 1.1. Main application features

- authorization system (more info [here](#114-authorization-system-features)),
- main store page that containces a list of products (more info [here](#111-main-store-page-functionality)),
- view detailed product information (more info [here](#112-product-details-page-functionality)),
- cart page (more info [here](#113-cart-page-functionality)),
- orders page that provides a view orders for authorized users (more info [here](#115-orders-page-features)),
- global pending,
- global error handling,
- client side and server side (with feedback to client) validation for register form.
- admin dashboard (more info [here](#116-admin-dashboard-page-features))

#### 1.1.1. Main store page functionality

- view list of products (added in [v.0.1.0]),
- pagination with the ability to move through pages and change the number of entries on the page (added in [v.0.2.0]),
- navigate on the category tree of goods (more info about recursive categories tree [here](#439-about-categories-tree)) (added in [v.0.2.0]),
- filter products by price (added in [v.0.2.0]),
- filter products by brands (added in [v.0.2.0]),
- filter products by searches which customer input via search form (added in [v.0.2.0]),
- search chips pool (added in [v.0.2.0]),
- passing all filtering and pagination parameters and categories to Url (more info [here](#436-about-routing-system)) (added in [v.0.2.0]),
- add items to cart (added in [v.0.1.0]),
- move to product details page (added in [v.0.1.0]),

#### 1.1.2. Product details page functionality

- view full details of product (added in [v.0.1.0]),

#### 1.1.3. Cart page functionality

- view products in your cart (added in [v.0.1.0]),
- remove products from cart (added in [v.0.1.0]),
- move to product details page (added in [v.0.1.0]),
- view summary information about products (added in [v.0.1.0]),
- view total cost of products in the cart (added in [v.0.1.0]),
- change amount of the product in the cart (added in [v.0.2.0]),
- view cost of each product in the cart (added in [v.0.2.0]),
- purchse of goods in your cart (allowed only for authorized users) (added in [v.0.2.0]),

#### 1.1.4. Authorization system features

- login page (added in [v.0.1.0]),
- registration page (added in [v.0.1.0]),
- logout option (added in [v.0.1.0]),
- authorization with JWT bearer (added in [v.0.1.0]),
- role based authentication (added in [v.0.1.0]),
- separation of site functions depending on whether the user is logged in (added in [v.0.1.0]),
- separation of site functions depending on the role of the user (added in [v.0.2.0]),
- server-side token validation (added in [v.0.1.0]),
- a token with a limited lifetime and a system for reissuing a token using a refresh token (more info [here](#432-about-refresh-tokens)) (added in [v.0.1.0])
- authentication guard (more info [here](#435-about-authentication-guard)) (added in [v.0.2.0]),

#### 1.1.5. Orders page features

- view the order history (allowed only for authorized users) (added in [v.0.2.0]),
- filter the order history by the status of the order (added in [v.0.2.0]),
- view full detail information about each order (more info [here](#434-about-modal-dialog-with-full-order-information)) (added in [v.0.2.0]),

More info about order history [here](#433-about-order-history)

#### 1.1.6. Admin dashboard page features

The admin panel is only available to users with the admin role. The page contains interfaces for getting information and administering the shop:

- main panel (more info [here](#437-about-main-panel-on-the-admin-dashboard-page)) (added in [v.0.2.0]),
- orders manage panel (more info [here](#438-about-orders-manage-panel-on-the-admin-dashboard-page)) (added in [v.0.2.0]),

### 1.2. Application preview

<details>
  <summary>Products search preview</summary>

![image](https://drive.google.com/uc?export=view&id=1TWKIsPrbFuJUL3tl3q7-LJvIhO20T7eS)

</details>

<details>
  <summary>Product brand filter preview</summary>

![image](https://drive.google.com/uc?export=view&id=1VZUbUp2DGbwEUL5_Q1YujTbai2acLmhF)

</details>

<details>
  <summary>Products price filter preview</summary>

![image](https://drive.google.com/uc?export=view&id=1EEPFhZVCN26Uk6DdxD1fJDMSz1CHRoXK)

</details>

<details>
  <summary>Products pagination preview</summary>

![image](https://drive.google.com/uc?export=view&id=1BIGGVTJdWl1V_V8haWRVE6JhPOi0a0eS)

</details>

<details>
  <summary>Product category tree preview</summary>

![image](https://drive.google.com/uc?export=view&id=1SL7ezRkRd_QzFyvLoUN_t_XKo-9N-yHn)

</details>

<details>
  <summary>Products routing preview</summary>

![image](https://drive.google.com/uc?export=view&id=1m-ezkYy_JEw3MZ3f1mq5FRDI3C_WPKEE)

</details>

<details>
  <summary>Cart page preview</summary>

![image](https://drive.google.com/uc?export=view&id=1EPUjHFyCOn_8-Jw0C76dh7Pxkir_lUH0)

</details>

<details>
  <summary>Order history page preview</summary>

![image](https://drive.google.com/uc?export=view&id=1wI-KKzif3eZQnNyH-cg5eAiGfr3mGOYb)

</details>

<details>
  <summary>Products price memory on the order preview</summary>

![image](https://drive.google.com/uc?export=view&id=1xOUTka19v8YlIMtxlbsmtOOyW_-H8mIx)

</details>

<details>
  <summary>Admin orders management preview</summary>

![image](https://drive.google.com/uc?export=view&id=19hQ5VPHoooKOMeG7ih9TfjuRDuuOOQ4V)

</details>

<details>
  <summary>Auth guard at work</summary>

![image](https://drive.google.com/uc?export=view&id=1AikddPbmughTaANUnG49hL_QxaBj1LQH)

</details>

<details>
  <summary>Product details page preview</summary>

![image](https://drive.google.com/uc?export=view&id=1l2aLPr-VMFRavRVyfjHNbuBGZJXg2z1F)

</details>

<details>
  <summary>Login page preview</summary>

![image](https://drive.google.com/uc?export=view&id=1dX7pd0MdvBV5BYLoGSkvlT6-9jBnpzU_)

</details>

<details>
  <summary>Register page preview</summary>

![image](https://drive.google.com/uc?export=view&id=1VKAvsuc6vE9_5TSzp67N6g3xzE7Y_f49)

</details>

<details>
  <summary>Global pending preview</summary>

![image](https://drive.google.com/uc?export=view&id=1a0TkHcZZLV4ToGOiKD1ElBj1ZN5EGBhf)

</details>

<details>
  <summary>Global error handle preview</summary>

![image](https://drive.google.com/uc?export=view&id=1OgTfvObU9tiX_SIsQmK3srrswtbssdGr)

</details>

## 2. How to configure

### 2.1. Configure WebAPI application

#### 2.1.1. Change database connection string

You should change connection string in `appsettings.json`

```json
"ConnectionStrings": {
    "Default": "Server=myServer;Database=myDataBase;User Id=myUsername;Password=myPassword;TrustServerCertificate=True"
  },
```

If you run application in dev environment, change connection string in `appsettings.Development.json`

```json
  "ConnectionStrings": {
    "Default": "Server=YOUR-SERVER-NAME;Database=ElectronicsStore;Trusted_Connection=True;TrustServerCertificate=True"
  },
```

> **Note**
> The project uses the GUID type as the primary and therefore using other database providers requires additional changes and adjustments.

#### 2.1.2. Initiate database

Open the Packege Manager Console in Visual Studio (VIew -> Other Windows -> Packege Manager Console). Choose ElectronicsStore.DataBase in Default project.

Use the following command to create or update the database schema.

```console
PM> update-database
```

> **Note**
> In this step, you will create a new database and fill it with the starting dataset. The starter set contains two records for Role table. You will end up with five books by five different authors.

#### 2.1.3. Change path to documentation file for WebAPI

You need to specify the path to the file in which the documentation will be saved when building the solution. To do this, change the following code block in the ReadingList.WebAPI project settings:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    ...
    <DocumentationFile>C:\Users\user\source\repos\ElectronicsStore\WebAPI\ElectronicsStore.WebAPI\doc.xml</DocumentationFile>
  </PropertyGroup>
  ...
</Project>
```

> **Note**
> Make sure that the `doc.xml` file exists in the path you specify.

After that it is necessary to specify the same path in in `appsettings.json`

```json
"APIXmlDocumentation": "C:\\Users\\user\\source\\repos\\ElectronicsStore\\WebAPI\\ElectronicsStore.WebAPI\\doc.xml",
```

You need to set the path to the `doc.xml` file, which is in the root of the WebAPI solution. You can also create (or copy) the `doc.xml` file to any convenient location. In this case, specify the path to the new location of the doc file. In this case, the doc.xml file can be empty. Documentation is generated automatically each time the solution is built.

> **Note**
> This documentation file is an important part of the solution. It allows API users to understand what the system expects from them and what they can get from the server. The solution will generate an error when building without the correct path to the documentation file.

#### 2.1.4. About CORS policy

By default, WebAPI accepts requests from any client. If you need a stricter policy, you can change this in Program.cs (ReadingList.WebAPI project):

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy(myCorsPolicyName, policyBuilder =>
    {
        policyBuilder
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin();
    });
});
```

#### 2.1.5. Change the salt

Be sure to change the salt value before running the application. This will increase the reliability of created passwords.

Enter any phrase or character set in `appsettings.json`:

```json
  "Secrets": {
    "PasswordSalt": "WRITE YOUR SECRET PHRASE HERE"
  },
```

#### 2.1.6. Change Token configuration

The application uses Bearer JWT authorization.

You need to change the value of JWT Secret in `appsettings.json`:

```json
"Token": {
    "JwtSecret": "YOUR API SECRET",
```

In addition, you should change the expiration date of the generated tokens. It is 1 minute by default, but it is acceptable to use a value between 15 minutes and several hours.

To override the default value change `appsettings.json`:

```json
  "Token": {
    "ExpiryMinutes": 1
  }
```

You can leave the value unchanged. It won't affect the user experience, but it will reduce the load on the server and user security. The application uses RefreshToken to automatically generate new tokens to replace expired ones.

### 2.2. Configure React application

#### 2.2.1. Install NPM

You need to install Node.js to run your React application. For more information on installing Node.js, see the following [Link](https://nodejs.org/en/download/).

#### 2.2.2. Install Dependency Packages

You need to update all packages. Open a terminal, go to the folder with the React application. The relative path should look like this: `~\ElectronicsStore\ReactApp\electronics-store`.

Type the following command:

```powershell
npm update
```

#### 2.2.3. Change envrironment variables

You need to specify the WebAPI application address in the environment file. The environment file is accessible via the following relative path: `~\electronics-store\src\environments\environment.js`.

Check and, if necessary, make changes to the following block of code:

```javascript
apiUrl: "https://localhost:7099/api/",
```

If you have changed the names of the API endpoints in the WebApi project you can adjust the required paths in the following code block:

```javascript
userEndpoint: "User",
tokenEndpoints: {
    createToken: "Token",
    refreshToken: "Token/Refresh",
    revokeToken: "Token/Revoke",
},
goodsEndpoint: "Goods",
orderSheetEndpoint: "OrderSheet",
```

## 3. How to run

### 3.1. How to run WebAPI application

Run the project using the standard Visual Studio tools or the dotnet CLI.

### 3.2. How to run React application

Open the folder with the application in the terminal. The relative path should look like this: `~\ElectronicsStore\ReactApp\electronics-store`.

To start the application, enter the following command:

```powershell
npm run
```

> **Note**
> To stop the application press `CTRL+C` or `CMD+C` in the terminal window.

## 4. Description of the project architectur.

### 4.1. Summary

The application consists of two independent projects - the Web API project and the React project.

### 4.2. Web API project

The application is based on ASP.NET Core Web API and Microsoft SQL Server. Entity Framework Core is used to work with the database. The interaction between the application and the database is done using the Generic Repository and Unit of Work.

The application writes logs to a new file for each run. Logging is based on the Serilog library.

Key functions of the server part:

- generic repository
- unit of work
- API (may be redesigned in the future to be RESTful)
- Swagger
- API documentation (not all OpenAPI Specification requirements are met)

Although the API specification does not follow the RESTful, it still strives to work with the notion of resources wherever it does not conflict with the logic and architecture of the solution.

#### 4.2.1. Database model

Database contains four entities:

- Role: keeps information about user roles
- User: keeps information about users (email, password hash, role id)
- RefreshToken: keeps information about user refresh token (token, user id)
- Brand: keeps information about product brands (name)
- Product: keeps information about products (name, brand id)
- Item: keeps information about goods (product id, summary, description, cost).
- Order: keeps information about orders (user id, created date, status).
- Purchase: keeps information about purchases in the order (order id, item id, count, cost)

> **Note**
> The purchase cost in the order is saved at the time of placing the order. This ensures that you are not affected by price changes at a later date.

#### 4.2.2. Database scheme

<details>
  <summary>Database structure v.0.2.0</summary>

![image](https://drive.google.com/uc?export=view&id=1Y5bADEU7wfoOvibU0-d8TDBxmwLyafBh)

</details>

> **Note**
> There is no User-Order connection on the schematic, but it is implemented at the software level. This is not a problem at the moment, but will be fixed in the future.

<details>
  <summary>Database structure v.0.1.0</summary>

![image](https://drive.google.com/uc?export=view&id=1zk5BQ6hni35k3yqCLi3xWD8YItCYDUD6)

</details>

#### 4.2.3. Composition of Web API solution

The solution contains the main project and several libraries:

- **ElectronicsStore.WebAPI:** main API project
- **ElectronicsStore.Business:** contains the basic business logic of the application not directly related to API (services implementations and etc.)
- **ElectronicsStore.Core:** contains entities that do not depend on the implementation of other parts of the application (interfaces of services, data transfer objects, patch model)
- **ElectronicsStore.Data.Abstractions:** contains interfaces for database logic utils
- **ElectronicsStore.Data.Repositories:** contains implementation of Data.Abstractions
- **ElectronicsStore.DataBase:** contains entities and DBContext class

#### 4.2.4. Controllers

The **ElectronicsStore.WebAPI** contains four controllers:

- **UserController:** controller providing two endpoints (new user registration) and get user by id (allowed for admin). (changed on [v.0.2.0])
- **TokenController:** controller that provides multiple endpoints for interacting with the access token:
  - _CreateJwtToken:_ endpoint for user login.
  - _RefreshToken:_ generate a new access token based on the refresh token.
  - _RevokeToken:_ revoke refresh token in the database. Use this endpoint every time the user logs out.
- **GoodsController:** controller providing access to the `Goods` resource. (changed on [v.0.2.0])
- **OrderSheetController:** controller providing access to the `OrderSheet` resource. (changed on [v.0.2.0])
- **BrandsController:** controller providing access to the `Brands` resource. (added in [v.0.2.0])
- **CategoriesController:** controller providing access to the `Categories` resource. (added in [v.0.2.0])
- **GoodsCountController:** controller providing access to the `GoodsCount` resource. Provides information on the number of records matching the search parameters (added in [v.0.2.0])
- **MaxGoodsPriceController:** controller providing access to the `MaxGoodsPrice` resource. Provides information on the maximum of goods price of the records matching the search parameters (added in [v.0.2.0])

### 4.3. React application

The application uses "client side routing". The [React Router](https://reactrouter.com/en/main) library provides this feature. This model of the site was chosen for the convenience of users. Users can save and share links to a particular product.

The [Redux](https://redux.js.org/) library is used to store the state of the application. Perhaps in future releases will be added synchronization with session storage or local storage. Redux store keeps decomposed JWT token and array of product id in the cart.

[Material UI](https://mui.com/) is used as a component library.

The [Formik](https://formik.org/) library is used to work with forms. The [Yup](https://github.com/jquense/yup) library is used to validate user data in a form.

#### 4.3.1. Composition of React Application

The solution is a single package.

The package is divided into the following logical parts:

- **components:** files that contain the UI components logic
- **types:** files that contain custom object types (like dto, custom errors, etc.)
- **environments:** file that contains environment variables
- **pages:** files containing UI components that represents pages. In addition to its main role as a container, it acts as a mediator for page components logic.
- **services:** files that contain business logic (such as api service, user service, etc)
- **utils:** files that contain useful items (such as 'fake logger', formater, custom React hooks, etc)
- **storage:** files that contain Redux store logic (store, reducers, etc)

> **Note**
> The project does not contain a real implementation of the logger. However, it provides a single point for its integration.

#### 4.3.2. About Refresh Tokens

The user receives an access token from the server every time he logs in or registers. The access token expiration is limited. The app puts the access token into the request header every time the user performs an action requiring authorization. If the token has expired, the application sends a request to renew the access token. The application puts the refresh token value in the body of the request and waits for the API server to give the new access token. The API server compares the value of the received refresh token with the existing value of the token in the database and generates a new access token. The old refresh token value in the database is overwritten by the newly generated one. This makes it harder for attackers to take advantage of an intercepted access token.

#### 4.3.3. About order history

At the time of order placement, new records are created in the database: separately for the order and for each purchase. The order contains information on the date of creation, order owner and status. Purchases contain the link to the item in the shop, the quantity of the item in the order and the price at the time of placing the order. This is to ensure that the history is not affected by further price movements of the goods.

#### 4.3.4. About modal dialog with full order information

A modal window appears with full information about the order when you select an order card. The content depends on where it was called up (order history page or admin panel). You can go to a page with detailed information on each of the items from the shopping table .

#### 4.3.5. About authentication guard.

This tool is designed to handle page routing. It redirects to the login page if the user does not have sufficient rights to access it. This prevents the user from accessing the page from the URL. The guard is a wrapper over the React component and has a flexible parametrization system:

```javascript
{
  path: "/dashboard",
  element: (
    <RootGuard component=<DashboardPage /> authorised={["Admin"]} />
  ),
},
{
  path: "/orders",
  element: (
    <RootGuard
      component=<OrdersPage />
      authorised={["User", "Admin"]}
    />
  ),
},
```

It is part of the defender pipeline within the root guard.

#### 4.3.6. About routing system

Routing represents the client-side routing system. Some pages are only available to authorised users (more info [here](#435-about-authentication-guard)). The home page uses routing aimed at saving the state of all the filter and search fields in the URL. This is a vital feature for an online shop. The ability to send to a specific product selection page view is an important part of a customer centric application. It is also free advertising. Being able to share a valid link to a selection of products will increase the flow of visitors to the site.

#### 4.3.7. About main panel on the admin dashboard page

The panel is still under development and does not contain up-to-date information. There is a masonry of widgets with different information about things to do in the shop.

#### 4.3.8. About orders manage panel on the admin dashboard page

The order status dashboard is a kanban board. The administrator can change order statuses and receive up-to-date information on all current orders. The order details window opens by clicking on the order card (more info [here](#434-about-modal-dialog-with-full-order-information)). Filters and sorting options will be added to this panel in the future.

#### 4.3.9. About categories tree

The category tree is a recursion. Categories in the database can freely change the parent category and this will not cause any problems.

The tree is not fully loaded on the page to optimise the load on the server. When deploying a category that has children, the application sends a request to the API to fetch all children and their children. This ensures that the tree can be expanded further. Importantly, there can only be one root category. The root category is the one that has no reference to the parent category.

Goods are displayed on the page for the selected category and all subcategories as well.

## Key features:

ASP.Net Core WebAPI, Entity Framework Core, Microsoft SQL Server, C#, JavaScript, Serilog, Automapper, Newtonsoft Json.Net, Dependepcy Injection, Generic Repository, Unit of Work, Material UI, Swagger, ReactJS, Formik, Redux, React Router, Yup.

[v.0.1.0]: https://github.com/anton-hav/ElectronicsStore/releases/tag/v.0.1.0
[v.0.2.0]: https://github.com/anton-hav/ElectronicsStore/releases/tag/v.0.2.0
