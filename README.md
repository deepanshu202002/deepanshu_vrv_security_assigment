Role-Based Authentication App
Description
This project is a role-based authentication application built with a frontend and backend structure. The application supports three user roles:

Admin - Manages users and can assign the "Moderator" role to other users.
User - The default role after signing up.
Moderator - Assigned by the admin to have additional permissions.
Users are directed to specific pages based on their roles upon login, and navigation is controlled using protected routes.

Features
Role-Based Routing:
Users are redirected to specific pages based on their role:
User: /login/user
Admin: /login/admin
Moderator: /login/moderator
Protected routes ensure that users cannot access unauthorized pages.
Authentication:

Users sign up and log in to receive an access token generated using JWT.
The access token is used for authentication and role verification on every API request.
Authorization:

Only Admins can:
Fetch all users.
Update a user's role to "Moderator."
A custom middleware validates the access token to ensure that the user has the required permissions.

Security:
Passwords are hashed using bcrypt before storing them in the database.
Access tokens are securely verified using JWT to prevent unauthorized access.

Frontend State Management:
useContext is used to manage and persist user information across the application.
Users are logged out automatically if the token is invalid.

Tech Stack
Frontend:
React: For building the user interface.
React Router: For protected routes and role-based navigation.
useContext: For state management.
CSS: For styling.

Backend:
Node.js: Backend framework.
Express.js: For building REST APIs.
JWT: For authentication and secure token generation.
Bcrypt: For password hashing.
Middleware: For verifying user roles and access tokens.

Backend Structure
Routes:
/signup: User registration.
/login: User login (returns JWT upon successful login).
/user/:userid: Allows the admin to update a user's role.
Middleware:

Verifies the JWT token from the frontend.
Checks if the user has the "Admin" role before allowing access to sensitive routes.

Here  is screenshots of project:
https://drive.google.com/drive/folders/1To8yqyyrs3YfJd0ryWrDa4xPBKfPkZZt?usp=sharing
