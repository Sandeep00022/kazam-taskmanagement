# Task Management App 🚀  

A **full-stack task management application** built with **Vite + React + TypeScript** for the frontend and **Express + MongoDB** for the backend.  

---

## 📌 Prerequisites  

- **Node.js** (Latest LTS recommended)  
- **MongoDB** (Local or Atlas)  
- **Git** (Optional, but recommended)  

---

## 🛠 Setup Instructions  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/your-username/task-app.git  
cd task-app
```

### 2️⃣ Install Dependencies  

#### **Frontend** (Vite + React + TypeScript)  
```sh
cd frontend  
npm install  
```

#### **Backend** (Express + TypeScript + MongoDB)  
```sh
cd backend  
npm install  
```

---

## 🚀 Running the App  

### **Start Backend**  
```sh
cd backend  
npm start  
```

### **Start Frontend**  
```sh
cd frontend  
npm run dev  
```

---

## ⚙️ Environment Variables  

Create a **.env** file in the backend directory:  
```
PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  
```

---

## 🔥 Build for Production  

### **Frontend**  
```sh
cd frontend  
npm run build  
```

### **Backend**  
```sh
cd backend  
tsc && node dist/server.js  
```

---

## 📌 API Documentation  

### **Authentication**  

#### **Register User**  
- **POST** `/api/auth/register`  
- **Body:**  
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**  
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### **Login User**  
- **POST** `/api/auth/login`  
- **Body:**  
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**  
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

### **Tasks**  

#### **Create Task**  
- **POST** `/api/tasks/`  
- **Headers:** `{ Authorization: Bearer <token> }`  
- **Body:**  
  ```json
  {
    "title": "New Task",
    "description": "Task description"
  }
  ```
- **Response:**  
  ```json
  {
    "_id": "task_id",
    "title": "New Task",
    "description": "Task description",
    "completed": false,
    "user": "user_id"
  }
  ```

#### **Get All Tasks**  
- **GET** `/api/tasks/`  
- **Headers:** `{ Authorization: Bearer <token> }`  
- **Response:**  
  ```json
  [
    {
      "_id": "task_id",
      "title": "Task 1",
      "description": "Task description",
      "completed": false
    }
  ]
  ```

#### **Update Task**  
- **PUT** `/api/tasks/:id`  
- **Headers:** `{ Authorization: Bearer <token> }`  
- **Body:**  
  ```json
  {
    "title": "Updated Task",
    "completed": true
  }
  ```
- **Response:**  
  ```json
  {
    "_id": "task_id",
    "title": "Updated Task",
    "completed": true
  }
  ```

#### **Delete Task**  
- **DELETE** `/api/tasks/:id`  
- **Headers:** `{ Authorization: Bearer <token> }`  
- **Response:**  
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

---
## 📌 Application ScreenShots

![image](https://github.com/user-attachments/assets/12b6d4da-00a3-43b2-9162-417bfc6f657a)
![image](https://github.com/user-attachments/assets/c8ea59e0-54f6-4bc2-b24f-5ba87c71ac35)
![image](https://github.com/user-attachments/assets/4dae9f69-33f5-4d2a-acfe-e5a7ecf82cb8)
![image](https://github.com/user-attachments/assets/b13d8b76-151c-4119-9593-2be1124f7ba3)





## 📜 License  
This project is **open-source**. Feel free to contribute!  

