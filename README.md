<h1>📖 Blog API</h1>

<p>A secure and scalable RESTful API built with Node.js, Express, and MongoDB for managing blogs.
Includes authentication, authorization, error handling, and request validation.</p>

<h2>🚀 Features</h2>
<ul>
  <li>🔐 User Authentication & Authorization with JWT</li>
  <li>📝 Create, Read, Update, Delete (CRUD) for Blogs</li>
  <li>⚡ Rate Limiting & Security Middlewares</li>
  <li>🛡️ Prevent NoSQL Injection & XSS Attacks (removed outdated packages)</li>
  <li>📑 API Documentation with Swagger</li>
  <li>🌍 Environment-based configuration (.env)</li>
  <li>❌ Global Error Handling</li>
</ul>

<h2>📂 Project Structure</h2>
<pre>
Blog-API/
│── controllers/    # Business logic
│── models/         # Mongoose models
│── routes/         # Express routes
│── utils/          # Utilities (error handling, API features)
│── app.js          # Express app setup
│── server.js       # Entry point
│── .env.example    # Example environment variables
│── package.json
│── Blog-API.postman_collection.json
│── README.md
</pre>

<h2>⚙️ Installation & Setup</h2>
<ol>
  <li><b>Clone the repository</b><br>
    <code>git clone https://github.com/your-username/Blog-API.git</code><br>
    <code>cd Blog-API</code>
  </li>
  <li><b>Install dependencies</b><br>
    <code>npm install</code>
  </li>
  <li><b>Setup environment variables</b><br>
    Copy <code>.env.example</code> to <code>.env</code> and update values:<br>
    <code>cp .env.example .env</code>
  </li>
  <li><b>Run the project</b><br>
    <code>npm run dev</code>
  </li>
</ol>

<p>Server runs at 👉 <a href="http://localhost:8080">http://localhost:3000</a></p>

<h2>👥 User Roles</h2>
<ul>
  <li><b>Admin</b> → Full access (manage blogs & users)</li>
  <li><b>Author</b> → Can create, update, delete their own blogs</li>
  <li><b>User</b> → Can only read blogs</li>
</ul>

<h2>📑 Routes</h2>

<h3>🔐 Auth</h3>
<ul>
  <li><code>POST /api/v1/auth/signup</code> → Register user</li>
  <li><code>POST /api/v1/auth/login</code> → Login & get token</li>
</ul>

<h3>📝 Blogs</h3>
<ul>
  <li><code>GET /api/v1/blogs</code> → Get all blogs (any user)</li>
  <li><code>GET /api/v1/blogs/:id</code> → Get single blog (any user)</li>
  <li><code>POST /api/v1/blogs</code> → Create blog (Author/Admin only)</li>
  <li><code>PATCH /api/v1/blogs/:id</code> → Update blog (Author or Admin)</li>
  <li><code>DELETE /api/v1/blogs/:id</code> → Delete blog (Author or Admin)</li>
</ul>

<h3>👤 Users (Admin only)</h3>
<ul>
  <li><code>GET /api/v1/users</code> → Get all users</li>
  <li><code>DELETE /api/v1/users/:id</code> → Delete a user</li>
</ul>

<h2>🔑 Authentication</h2>
<ol>
  <li>Sign up to create an account</li>
  <li>Login to receive a JWT Token</li>
  <li>Send token in <b>Authorization Header</b> as:<br>
    <code>Authorization: Bearer &lt;token&gt;</code>
  </li>
</ol>

<h2>🛠️ Tech Stack</h2>
<ul>
  <li>Backend: Node.js, Express</li>
  <li>Database: MongoDB + Mongoose</li>
  <li>Security: Helmet, Rate-Limiter, HPP, bcrypt, JWT</li>
  <li>Docs: Swagger</li>
</ul>

<h2>👨‍💻 Development Scripts</h2>
<pre>
npm run dev   # Run with nodemon (development)
npm start     # Run in production
</pre>

<h2>📌 Future Improvements</h2>
<ul>
  <li>✅ Replace deprecated xss-clean & express-mongo-sanitize with validator.js / express-validator</li>
  <li>✅ Add unit/integration tests (Jest / Supertest)</li>
  <li>✅ Add CI/CD pipeline for deployment</li>
</ul>

<h2>📦 Postman Collection</h2>
<p>For easier testing, you can import <code>Blog-API.postman_collection.json</code> into Postman.<br>
It contains all routes with sample requests.</p>

<h2>📝 License</h2>
<p>This project is licensed under the <b>MIT License</b>.</p>
