[![Next.js](https://assets.zeit.co/image/upload/v1538361091/repositories/next-js/next-js.png)](https://nextjs.org)

<h1 align="center">Julians Note App</h1>

<h2 align="center">set up</h2>

- clone repo
- npm i
- set up mongodb community on your computer (https://docs.mongodb.com/manual/administration/install-community/)
- set envrionment variables listed below to your local device (see .env file for default)
- npm run dev
- enjoy
- go to [webappurl]/notes to crud notes


<h2 align="center">Features</h2>

- [x] create notes
- [x] edit notes
- [x] delete notes
- [x] authentication (notes does not require authentication for crud functionality)


<h3 align="center">Environmental variables</h3>

Environmental variables needed in this project:

- `MONGODB_URI` The MongoDB Connection String (with credentials and database name)
- `NEXT_PUBLIC_WEB_URI` The _URL_ of your web app.

