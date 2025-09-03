# 🛒 SnapCart – Full-Stack E-Commerce Application  

A **full-stack e-commerce web application** built with **React.js, Node.js, Express, and MongoDB**, featuring **secure authentication, cart management, and Razorpay payment integration**.  

This project simulates a real-world online shopping flow where users can **browse products, add to cart, place orders, and make payments**. It is designed to showcase advanced full-stack development skills, including **RESTful APIs, JWT authentication, middleware, and third-party payment gateway integration**.  

---

## 🚀 Features  

### 👤 User Authentication & Validation  
- 🔑 **JWT-based login & signup** with form validation  
- 🛡️ Secure routes protected via middleware  
- 👨‍💼 User & Admin segregation (admin can see all orders)  

### 🛍️ E-Commerce Flow  
- 📦 **Product Catalog** with details (name, price, image, description, category)  
- 🛒 **Add to Cart / Remove from Cart** with dynamic quantity updates  
- 🧾 **Cart Page** with real-time price calculation  
- ⚡ **Buy Now Option** (skips cart and directly places an order)  
- 📜 **Order History** (users can view their past orders)  

### 💳 Payment Integration (Razorpay)  
- 🏦 **NetBanking, UPI, Wallets, Cards supported**  
- ✅ Order & Payment Verification with cryptographic signature  
- 🔄 Smart cart updates after successful payment (only removes purchased items, not the entire cart)  

> ⚠️ **Note:** For testing payments, try using **NetBanking** on Razorpay’s test environment.  

---

## 🛠️ Tech Stack  

| Technology        | Description                              |
|-------------------|------------------------------------------|
| React.js          | Frontend UI framework (Vite + Hooks)     |
| Tailwind / CSS    | Responsive UI & styling                  |
| Axios             | API calls & state synchronization        |
| Node.js + Express | Backend server & RESTful API             |
| MongoDB + Mongoose| Database & schema modeling               |
| JWT + Bcrypt      | Authentication & security                |
| Razorpay API      | Payment gateway integration              |

---

## 🔧 Getting Started  

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Rishiiiee/SnapCart-clone.git

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start React App

```bash
npm run dev
```

---

## 🌄 Screenshots

| Home Page | |<img width="400" height="400" alt="homepage" src="https://github.com/user-attachments/assets/67830f06-aead-4f4d-8506-288a21f67244" />| Product page  | |<img width="1893" height="856" alt="product" src="https://github.com/user-attachments/assets/f26afd4f-6d10-4e7e-b924-73d60316af6b" />|
| Add-to-cart | |<img width="1920" height="1080" alt="productdetail" src="https://github.com/user-attachments/assets/46485e20-1493-4582-b9bc-f5aa506e8685" />| | Cart Pgae | |<img width="1888" height="861" alt="cartpage" src="https://github.com/user-attachments/assets/e1d456a0-a116-473e-871d-ab1b040e2390" />|


## 🌐 Live Demo

🛍️ Try the Live App(Frontend): [Visit Live Site](https://snap-cart-fe.vercel.app/)

⚙️ Backend API: [Visit Live API](https://snapcart-be.onrender.com)

> Make sure the backend (e.g., Render ) is active for full functionality like product data, login, and cart management.
> Free services like Render  may take a few seconds to wake up if idle.

## 👤 Author

**Shrivastav Rishi**  


