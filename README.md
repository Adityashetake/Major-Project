# Major Project

A full-stack web application built using Node.js, Express.js, MongoDB, and EJS.

## Features

- User Authentication
- Add, Edit, and Delete Listings
- Image Upload Support
- Responsive UI
- Flash Messages
- Form Validation
- MongoDB Database Integration

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- Bootstrap
- Passport.js (if used)
- Cloudinary (if used)
- Mapbox (if used)

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/Major-Project.git
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add your environment variables:

```
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_secret_key
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
MAP_TOKEN=your_mapbox_token
```

Start the server:

```bash
node app.js
```

or

```bash
npm start
```

Open your browser and visit:

```
http://localhost:8080
```

## Project Structure

```
Major Project/
│── models/
│── routes/
│── controllers/
│── views/
│── public/
│── middleware.js
│── app.js
│── package.json
```

## Author

Aditya Shetake
