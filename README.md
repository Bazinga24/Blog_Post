
# For Backend 
1-cd backend ( go to the backend directory using terminal)

2-npm install (install the dependencies)

3-create the .env file with contents
{
PORT=5000
MONGO_URI=mongodb+srv://harshu:.p.%40Dp5Z6tYx7m%40@cluster0.tbebtrg.mongodb.net/practice-node-auth;
JWT_SECRET=omnifyblogpost
}

4- npm start (start the backend)
(Server runs at: http://localhost:5000)



# For FrontEnd

1-cd ../front-end/blog_post_frontend (go to the blog_post_frontend directory inside frontend folder)

2-npm install

3-npm run dev

4-Frontend runs at: http://localhost:5173 (default Vite port)


 # API Endpoints (Sample)
-> POST /api/auth/signup

-> POST /api/auth/login

-> GET /api/blogs/

-> GET /api/blogs/:id

-> POST /api/blogs/ (auth required)

-> PUT /api/blogs/:id (author only)

-> DELETE /api/blogs/:id (author only)



 # Tech Stack

- **Frontend**: React, React Router DOM, CSS
- **Backend**: Node.js, Express, JWT, bcryptjs, mongoose
- **Database**: MongoDB Atlas
- **Auth**: JWT token-based authentication


