<h1 align="center">Welcome to SAAS Starter Kit!
</h1>
<p align="center">
  <img height="auto" width="400px" src="https://user-images.githubusercontent.com/24860061/113771653-839ae180-96d8-11eb-9df5-49a856019be4.png" />
<p align="center">
<br />
<br />
 
> Saas Starter Kit is a modern SAAS boilerplate. Save weeks of development time having standard SAAS features implemented for you, and start building your core app right away. 


## 🎛 Tech Stack 
#### Frontend:
React, Nextjs, Styled Components, AntD, Firebase Auth. 

#### Server: 
Nodejs, Express, Docker, Jest, Postgres or Mongodb.  
<br />

> *Pro version also includes Stripe, Nodemailer, AWS CDK and more. 
  
## 🧿 Saas Starterkit Standard 
 
Saas Starterkit also comes in a lite barebones version. check it out here: 
  https://github.com/Saas-Starter-Kit/Saas-Starterkit

## ⚙️ Installation

<strong>node version >= 14 recommended.</strong>
<br />
<strong>npm version >= 7 is recommended.</strong> 

Using an older node version may lead to unexpected errors.

This Project Requires Firebase credentials and either Postgres or MongoDB credentials. 
Simply substitute the credentials into the appropriate env variables in both the client and server. 

How to obtain the credentials from Firebase can be found in the Saas Starter Kit docs. Postgres and MongoDB credentials are user set. 

Required Environment Variables

#### Client:

| Variable  | Description |
| ------------- | ------------- |
| NEXT_PUBLIC_SERVER_URL | URL of the nodejs Server. Will be localhost during dev. |
| NEXT_PUBLIC_FIREBASE_API_KEY | The Firebase API key, found in the Firebase console |
| NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN  | Firebase Auth Domain, found in the Firebase console  |
| NEXT_PUBLIC_GOOGLE_ANALYTICS_ID | Google Analytics Measurement id |
| NEXT_PUBLIC_STRIPE_BASIC_PLAN | Stripe price id, starts with price_xxxx |
| NEXT_PUBLIC_STRIPE_BASIC_PLAN_PRICE | Plan Pricing |
| NEXT_PUBLIC_STRIPE_BASIC_PLAN_TYPE | Human Readable plan name |
| NEXT_PUBLIC_STRIPE_PREMIUM_PLAN | Stripe price id, starts with price_xxxx |
| NEXT_PUBLIC_STRIPE_PREMIUM_PLAN_PRICE | Plan Pricing |
| NEXT_PULBIC_STRIPE_PREMIUM_PLAN_TYPE | Human Readable plan name |
| NEXT_PUBLIC_STRIPE_PUBLIC_KEY | Stripe public api key |
  


#### Server:

| Variable  | Description |
| ------------- | ------------- |
| FIREBASE_DATABASE_URL | Found in Firebase Service Account Key JSON file. See docs for more info. |
| FIREBASE_PROJECT_ID | Found in Firebase Service Account Key JSON file. See docs for more info. |
| FIREBASE_CLIENT_EMAIL | Found in Firebase Service Account Key JSON file. See docs for more info. |
| FIREBASE_PRIVATE_KEY | Found in Firebase Service Account Key JSON file. See docs for more info. |
| AUTH_SECRET | User set, can be anything |
| DB_PASSWORD | Postgres Password, user set |
| DB_USER | Postgres username |
| DB_HOST | Postgres host, localhost in dev |
| DB_NAME | Name of Postgres database |
| DB_PORT | Postgres Port, default is 5432 |
| MONGO_URL | MongoDB URL is optional, if already using Postgres. Required if not. |
| MAIL_TRAP_USERNAME | Mail trap username |
| MAIL_TRAP_PASSWORD | Mail trap password |
| STRIPE_SECRET | Stripe API secret |
| STRIPE_ITEM_PRICE | Stripe price id |
| STRIPE_WEBHOOK_SECRET | Stripe webhook secret |
| SendInBlue_API_KEY | Sendinblue api key |
| SendInBlue_User | sendinblue username |
| SendInBlue_Password | sendinblue password |
| SendInBlue_ListId | sendinblue listid |
| PRODUCT_NAME |  variable in transactional emails |
| PRODUCT_URL | variable in transactional emails |
| COMPANY_NAME |  variable in transactional emails |
| COMPANY_ADDRESS |  variable in transactional emails |

  
<br />
Once the Environment Variables are defined and node modules installed the boilerplate is ready to go. 

## ✨ Features
-  ✅  Admin Dashboard
-  ✅  Full Authentication, with Google Social Login and Password Reset
-  ✅  User Profile Management with Email and Username change
-  ✅  User Dashboard
-  ✅  Checkout Pages
-  ✅  Landing and Pricing Page template
-  ✅  Decoupled Nodejs server
-  ✅  Testing Setup with Cypress and Jest
-  ✅  CRUD operations
-  ✅  Stripe subscription payments
-  ✅  Roles and permissions
-  ✅  Multi user apps and multi tenancy
-  ✅  Machine learning and AI
-  ✅  AWS infrastructure as code
-  ✅  Fully Featured Blog and Docs
-  ✅  Event Based Google Analytics

## 📜 Docs 

The Documentation is available here: https://docs.saasstarterkit.com/docs/Intro/Welcome

If  there are any questions or something is not covered in the docs, feel free to open a github issue on this repo. 

##  💻 Demo
The Demo can be found here: https://demo.saasstarterkit.com/app/1/dashboard

Certain Features have to be disabled or cant be included in the demo. 


## 🤝 Contributing

Pull requests are welcome.

Also If you like this project please ⭐️ the repo to show your support.  
