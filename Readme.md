# CartCove 电商系统平台

A full-stack e-commerce web application supporting product browsing, 
real-time inventory updates, shopping cart management, and order processing.

## 🛠️ Tech Stack

**Backend:** Python, Django, Django REST Framework  
**Frontend:** React, TypeScript, Bootstrap  
**Build Tools:** Babel, Webpack  
**Testing:** Django Unit Tests, Selenium  
**CI/CD:** GitHub Actions  

## ✨ Features

- RESTful API for product catalog, cart, and order management
- User authentication with token-based auth
- Real-time inventory tracking
- Responsive frontend with reusable React components
- Automated unit & behavioral test suite

## 🚀 Getting Started

**Prerequisites:** Python 3.x, Node.js

**Backend setup:**
```bash
pip install Django==4.2.6
pip install djangorestframework
pip install -r requirements.txt
```

**Frontend setup:**
```bash
cd CartCove/frontend
npm install
```

**Run the app** (two terminals):
```bash
# Terminal 1 - Django server
cd CartCove
python manage.py runserver

# Terminal 2 - React dev server  
cd CartCove/frontend
npm run dev
```

Visit `http://127.0.0.1:8000/`

## 🧪 Testing

**Unit tests:**
```bash
cd CartCove
python3 manage.py test cart
```

**Behavioral tests (Selenium):**
```bash
cd CartCove/frontend
selenium-side-runner tests/CartCove.side
```
