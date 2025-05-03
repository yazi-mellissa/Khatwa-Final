
#  Khatwa: Crèche Directory & Management Platform

> **Projet Pluridisciplinaire - 2CPI ESI Alger**  
> Année universitaire : 2022–2023

---

##  Overview

**Khatwa** is a full-stack web platform that facilitates the **search, consultation, and management of crèches (daycare centers)** in Algeria. The application serves **parents**, **crèche administrators**, and **site administrators**, offering a centralized, secure, and intuitive interface to manage daycare reservations, consultations, and administrative tasks.

This project was developed as part of a multi-disciplinary academic initiative to address real-world childcare search challenges with modern web technologies.

---

##  Key Features

###  For Parents
- Search for crèches using multiple filters: location, availability, language, pedagogy, etc.
- View crèche profiles with ratings, reviews, and media.
- Reserve places or request visits.
- Manage their personal profile, notifications, and preferences.

###  For Crèche Administrators
- Register and update crèche details.
- Manage availability and scheduling (agenda).
- Handle messages, reservations, and consultations.
- Receive notifications for user actions.

###  For Site Administrators
- Moderate and manage user accounts (parents and crèches).
- Handle reports and user-generated content.
- Access an admin dashboard for full platform oversight.

---

##  Tech Stack

### Frontend
- **React.js** + **React Router**
- **Redux** for state management
- **Tailwind CSS / CSS Modules** 
- **Pusher** for real-time notifications
- **Responsive UI** built with React components and modular layouts

### Backend
- **Node.js** + **Express.js**
- **MongoDB** with Mongoose ODM
- **Multer** for file uploads
- **Helmet**, **Morgan**, and **CORS** for security and HTTP middleware
- **Pusher** integration for real-time features

---

## Security & Architecture

- User roles: `Parent`, `Crèche Admin`, `Platform Admin`
- JWT-based authentication (to be implemented)
- Route protection based on roles
- Private file access for sensitive documents (e.g., registration files)
- Modular structure with reusable layouts and protected routes

---

##  Getting Started

###  Prerequisites

- Node.js & npm
- MongoDB
- Git

###  Clone and Setup

```bash
# Clone the repository
git clone https://github.com/yazi-mellissa/Khatwa-Final.git
cd Khatwa-Final

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```
---

###  Running the App

#### Backend
```bash
cd server
npm start
```

#### Frontend
```bash
cd client
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---
