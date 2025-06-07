# 🖼️ MERN Stack Image CRUD Application

This is a full-stack **MERN** (MongoDB, Express, React, Node.js) application that demonstrates **CRUD operations for image files**. Many developers often face challenges when implementing image upload, preview, update, and delete functionality with file storage. This project provides a working example with both frontend and backend code for seamless integration.

✅ Upload  
✅ Preview  
✅ Update  
✅ Delete  
✅ Backend storage  
✅ REST API integration

---

## 🚀 Features

- Upload images using form data from React to Node.js server
- Store images in a local server directory or cloud (e.g., can be extended to use AWS S3, Cloudinary, etc.)
- Save image metadata in MongoDB
- Fetch image list with preview
- Edit image metadata or replace image file
- Delete image from both filesystem and MongoDB

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios (for API calls)
- CSS / Tailwind (optional)

### Backend
- Node.js
- Express.js
- MongoDB
- Multer (for file uploads)
- Mongoose (ODM)

---

## 📁 Folder Structure
<pre>├── <font color="#12488B"><b>backend</b></font>
│   ├── model.js
│   ├── <font color="#12488B"><b>node_modules</b></font>
│   ├── package.json
│   ├── package-lock.json
│   ├── <font color="#12488B"><b>routes</b></font>
│   ├── server.js
│   └── <font color="#12488B"><b>uploads</b></font>
└── <font color="#12488B"><b>frontend</b></font>
    ├── package.json
    ├── package-lock.json
    ├── <font color="#12488B"><b>public</b></font>
    ├── README.md
    ── src
        ├── App.css
        ├── App.js
        ├── App.test.js
        ├── index.css
        ├── index.js
        ├── logo.svg
        ├── reportWebVitals.js
        └── setupTests.js

</pre>

## ⚙️ Installation & Setup

### 📌 Prerequisites
- Node.js and npm
- MongoDB (running locally or on MongoDB Atlas)

### 🔧 Backend Setup

```bash
cd backend
npm install
```

### Enter Your Port Number and MongoDB Link:
```bash
mongoose
    .connect('Your MongoDB Link')
    .then(() => {
        app.listen('Your Port Number', () => {
            console.log("Server is running on port 5000");
        });
    })

    .catch(err => {
        console.log(err);
    });
```

### Then run the server:
```bash
npm start
```

### 🌐 Frontend Setup
```bash
cd frontend
npm install
npm start
```



## 📌 Notes

- The image files are saved to /uploads folder locally.
- You can extend this to store images on Cloudinary or AWS S3 by updating the upload logic in the backend.


## 🙌 Contribution
If you found this useful or improved it further, feel free to fork, clone, and submit a pull request.
```bash
https://github.com/AstinOfficial/CRUD_IMAGE.git
```

## 🙋‍♂️ Author
Astin Biju <br>
Feel free to connect on <a href="https://www.linkedin.com/in/astin-biju/">LinkedIn</a> or message me for questions or collaboration.

