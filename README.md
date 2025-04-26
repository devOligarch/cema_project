---
title: "Health Information System"
description: "A basic system to manage health programs and clients."
---

# 📋 Health Information System

A simple, clean **Health Information Management System** where doctors can manage health programs and register clients, with an exposed API for client profile retrieval.

---

## 📌 Features

- ✅ Create health programs (e.g., TB, HIV, Malaria).
- ✅ Register new clients into the system.
- ✅ Enroll clients into one or more health programs.
- ✅ Search for a client from the list.
- ✅ View a client's full profile with their enrolled programs.
- ✅ Expose client profiles through a REST API.
- ✅ Clean, well-documented codebase for easy understanding and extension.

---

## ⚙️ Tech Stack

- **Frontend & Backend**: Next.js (API Routes)
- **Database**: MongoDB (MongoDB Node.js Driver)
- **Styling**: Tailwind CSS
- **Testing**: Postman
- **Deployment**: Vercel

---

## 🚀 Live Demo

👉 https://cema-project.vercel.app/

👉 https://drive.google.com/file/d/1Z_L2BuGfrm9uX8oPHyvaAWEIribNYNSh/view?usp=drivesdk

---

## 🛠️ How to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/devOligarch/cema-project.git

# 2. Navigate into the project
cd cema-project

# 3. Install dependencies
npm install

# 4. Create a `.env.local` file and add your MongoDB URI
MONGODB_URI=your-mongodb-connection-uri
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# 5. Run the development server
npm run dev
