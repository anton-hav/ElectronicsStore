# ElectronicsStore
The project implements an online electronics store.

## 1. About
This project implements an online store using ASP.NET Core WebAPI for the back-end and a React application for the front-end.

### 1.1. Main application features
- authorization system,
- view a complete list of products,
- view detailed product information,
- add items to cart,
- remove products from the cart,
- global pending,
- global error handling,
- client side and server side (with feedback to client) validation for register form.

#### 1.1.2. Functionality available only to authorized users
- purchase of goods added to cart,

### 1.2. Application preview
This part will be added soon.


<details>
  <summary>Products list page preview</summary>

  ![image](https://drive.google.com/uc?export=view&id=1S09iYs7amGg365RgZggbEDn3GHr6jRsb)
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
  <summary>Cart page preview</summary>

  ![image](https://drive.google.com/uc?export=view&id=1mfJOSQWPVt_HgNxslFe8dn65abFBZV8p)
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

>**Note**
> The project uses the GUID type as the primary and therefore using other database providers requires additional changes and adjustments.

#### 2.1.2. Initiate database
Open the Packege Manager Console in Visual Studio (VIew -> Other Windows -> Packege Manager Console). Choose ElectronicsStore.DataBase in Default project.

Use the following command to create or update the database schema. 

```console
PM> update-database
```

>**Note**
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

>**Note**
> Make sure that the `doc.xml` file exists in the path you specify.

After that it is necessary to specify the same path in in `appsettings.json`

```json
"APIXmlDocumentation": "C:\\Users\\user\\source\\repos\\ElectronicsStore\\WebAPI\\ElectronicsStore.WebAPI\\doc.xml",
```

You need to set the path to the `doc.xml` file, which is in the root of the WebAPI solution. You can also create (or copy) the `doc.xml` file to any convenient location. In this case, specify the path to the new location of the doc file. In this case, the doc.xml file can be empty. Documentation is generated automatically each time the solution is built.

>**Note**
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

>**Note**
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

#### 4.2.1. Database model
Database contains four entities: 

- Role: keeps information about user roles
- User: keeps information about users (email, password hash, role id)
- RefreshToken: keeps information about user refresh token (token, user id)
- Brand: keeps information about product brands (name)
- Product: keeps information about products (name, brand id)
- Item: keeps information about goods (product id, summary, description, cost). 

<details>
  <summary>Database structure</summary>

  ![image](https://drive.google.com/uc?export=view&id=1zk5BQ6hni35k3yqCLi3xWD8YItCYDUD6)
</details>

#### 4.2.2. Composition of Web API solution
The solution contains the main project and several libraries:

- **ElectronicsStore.WebAPI:** main API project
- **ElectronicsStore.Business:** contains the basic business logic of the application not directly related to API (services implementations and etc.)
- **ElectronicsStore.Core:** contains entities that do not depend on the implementation of other parts of the application (interfaces of services, data transfer objects, patch model)
- **ElectronicsStore.Data.Abstractions:** contains interfaces for database logic utils
- **ElectronicsStore.Data.Repositories:** contains implementation of Data.Abstractions
- **ElectronicsStore.DataBase:** contains entities and DBContext class

#### 4.2.3. Controllers
The **ElectronicsStore.WebAPI** contains four controllers:
- **UserController:** controller providing a single endpoint (new user registration).
- **TokenController:** controller that provides multiple endpoints for interacting with the access token:
    - *CreateJwtToken:* endpoint for user login.
    - *RefreshToken:* generate a new access token based on the refresh token.
    - *RevokeToken:* revoke refresh token in the database. Use this endpoint every time the user logs out.
- **GoodsController:** controller providing access to the `Goods` resource.
- **OrderSheetController:** controller providing access to the `OrderSheet` resource. **Contains logic for the method Purchase**.

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

>**Note**
> The project does not contain a real implementation of the logger. However, it provides a single point for its integration.

#### 4.3.2. About Refresh Tokens
The user receives an access token from the server every time he logs in or registers. The access token expiration is limited. The app puts the access token into the request header every time the user performs an action requiring authorization. If the token has expired, the application sends a request to renew the access token. The application puts the refresh token value in the body of the request and waits for the API server to give the new access token. The API server compares the value of the received refresh token with the existing value of the token in the database and generates a new access token. The old refresh token value in the database is overwritten by the newly generated one. This makes it harder for attackers to take advantage of an intercepted access token.

## Key features:
ASP.Net Core WebAPI, Entity Framework Core, Microsoft SQL Server, C#, JavaScript, Serilog, Automapper, Newtonsoft Json.Net, Dependepcy Injection, Generic Repository, Unit of Work, Material UI, Swagger, ReactJS, Formik, Redux, React Router, Yup.