# Task Manager – Backend-First Collaborative Task System

A full-stack task management application designed with a **backend-first mindset**, focusing on secure authentication, strict authorization rules, and realistic multi-user collaboration.

The backend models real-world task workflows such as ownership, assignment, visibility, and activity tracking.  
A React frontend is included to consume the APIs and demonstrate collaboration features.

---

## System Overview

### Backend (Primary Focus)

The backend is built to behave like a production system rather than a simple CRUD application.

Key characteristics:
- Stateless JWT-based authentication
- Role-based authorization (ADMIN and USER)
- Ownership-aware task updates and deletion
- Realistic collaboration using explicit task assignments
- Commenting and activity logging tied to task participation
- DTO-driven APIs with centralized exception handling

Authorization rules are enforced at the **service layer**, ensuring safety even if endpoints are reused or extended.

---

### Frontend (Supporting Layer)

The frontend is a React application designed to **correctly consume and reflect backend behavior**.

It includes:
- Context-based authentication and session restoration
- Role-aware routing and navigation
- Centralized Axios API layer with JWT handling
- Component-based architecture with feature-oriented folders

The UI is intentionally simple and stable, prioritizing correctness over heavy visual optimization.

---

## Authentication & Authorization

- Stateless JWT authentication using Spring Security
- Custom JWT filter validates tokens and injects user identity and role
- All endpoints secured by default
- Public access limited to login and registration endpoints
- Frontend never derives identity manually and relies on `/users/me`

This ensures predictable security behavior and avoids session-related issues.

---

## Core Backend Features

### Task Management
- Tasks are created with title, description, priority, and optional due date
- Each task has a clear creator (owner)
- Only the task creator or an ADMIN can update or delete a task
- Soft deletion prevents accidental data loss

### Task Visibility
- Tasks created by a user are distinct from tasks assigned to a user
- A dedicated endpoint returns tasks the user created **or** is assigned to
- Results are deduplicated for clean frontend consumption

### Task Assignment
- Task assignments are modeled as a first-class entity
- Supports self-assignment and assigning others
- Duplicate assignments are safely ignored
- Only task creators or ADMINs can assign users

### Comments & Activity Tracking
- Users can comment only if they are involved in the task or are ADMINs
- Comments support edits and soft deletion
- All significant actions are logged as activities
- Each task includes a complete activity timeline

---

## Frontend Highlights

- User dashboard displaying tasks created or assigned
- Admin dashboard with system-wide task and user management
- Task detail page combining metadata, comments, assignments, and activity
- Shared layouts for consistent navigation
- Graceful fallbacks instead of broken or dead-end pages

---

## Tech Stack

### Backend
- Java
- Spring Boot
- Spring Security
- JWT
- JPA / Hibernate
- MySQL

### Frontend
- React
- Axios
- Tailwind CSS

---

## How to Run the Project

### Backend Setup

1. Clone the repository
2. Create the database:
   ```
   CREATE DATABASE task_manager_db;
   ```
3. Configure application.properties:
   ```
    spring.datasource.url=jdbc:mysql://localhost:3306/task_manager_db
    spring.datasource.username=YOUR_USERNAME
    spring.datasource.password=YOUR_PASSWORD
    
    jwt.secret=YOUR_SECRET_KEY
   ```
4. Run the backend
   ```
   mvn spring-boot:run
   ```
### Frontend Setup

1. Navigate to the frontend directory

2. Install dependencies:
    ```
    npm install
    ```

3. Start the application:
    ```
    npm start
    ```

### Screenshots

1. Register as Admin
<img width="1280" height="668" alt="adminregister" src="https://github.com/user-attachments/assets/0aca6be7-3a21-42d0-abae-bbb8762cb1e5" />

2. Register as User
<img width="2559" height="1348" alt="Screenshot 2025-12-24 113440" src="https://github.com/user-attachments/assets/98f9825b-78cc-4523-9386-b5940611e2b1" />

3. User Dashboard
<img width="1268" height="640" alt="userdashboard" src="https://github.com/user-attachments/assets/6d076d91-b3aa-4d15-a45c-1cb78068a0be" />

4. Task Creation
<img width="1265" height="675" alt="newtaskcreation" src="https://github.com/user-attachments/assets/aa2ecb04-963d-4020-9e50-daea4620f3fb" />

5. Task Details, Comments, Assignees
<img width="1264" height="677" alt="taskdetailspage" src="https://github.com/user-attachments/assets/90297488-3cbe-4ca9-92a2-10816b99c053" />

6. Profile
<img width="665" height="668" alt="userprofilepage" src="https://github.com/user-attachments/assets/aff8035e-af8b-4cb9-ac09-8d5116301c75" />

7. Admin Dashboard (Tasks)
<img width="1228" height="698" alt="admindashboardtasks" src="https://github.com/user-attachments/assets/17a1103c-a4bf-456d-8567-6f70e6dd8a1a" />

8. Admin Dashboard (Users)
<img width="1241" height="662" alt="admindashboardusers" src="https://github.com/user-attachments/assets/0f7c8bd9-e31d-413a-a8d4-42a066a2cecc" />


## Known Limitations & Future Improvements

1. Inbox and notification system

2. Direct messaging between users

3. UI performance optimizations

4. Improved and consistent dark mode

5. Pagination and caching

6. Real-time updates using WebSockets











