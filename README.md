Visit my website : https://findmymess-frontend.onrender.com/

# FindMyMess

> A MERN-stack web platform to connect students and workers with mess owners, offering affordable and healthy home-style meals.

---

## Overview

In urban areas, many students and working professionals struggle to find affordable, home-cooked food. Traditional mess services are hard to discover, lack transparent menus, and often have no delivery options.  

**FindMyMess** solves this problem by providing a web platform where mess owners can list their daily menus, including dish details, prices, and quantity options (full/half). Users can browse, compare, and order meals directly from the website with online payment and delivery support.

---

## Features

- User and Mess Owner authentication (Sign Up / Login)
- Mess owners can list daily dishes with details
- Users can browse, search, and filter dishes
- Online payment integration with **Stripe** and **Razorpay**
- Dish recommendations powered by AI (Cosine Similarity)
- Popular dishes section showing trending items
- Ratings and reviews (planned future enhancement)
- Order placement with delivery option
- Responsive frontend built in React.js
- Backend APIs with Express.js and Node.js
- MongoDB for data storage
- Admin panel for managing dishes and orders

---

## Tech Stack

- **Frontend**: React.js, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI Recommendation**: Python (Flask) using Cosine Similarity
- **Payments**: Stripe, Razorpay
- **Version Control**: Git, GitHub
- **Deployment**: Netlify / Render / Heroku

---

## Installation

1. **Clone the repository**

git clone https://github.com/yourusername/findmymess.git

2.Install dependencies
Backend:
cd backend
npm install

Frontend:
cd frontend
npm install

3.Set up environment variables
Create .env files in both backend and frontend directories as needed, with variables like database URL, API keys for Stripe/Razorpay, etc.

4.Run the development server
Backend:
npm start

Frontend:
npm run dev
