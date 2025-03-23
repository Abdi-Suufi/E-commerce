# 🛍️ FashionHub - eCommerce Website

## 📌 Overview  
FashionHub is a modern and user-friendly eCommerce web application built with the MERN stack. It enables users to browse products, add items to their cart, and complete purchases seamlessly. The backend integrates AWS S3 for secure image storage, ensuring efficient and scalable media management.  

## 🚀 Features  
- Full product management (Create, Read, Update, Delete)  
- Shopping cart with local storage persistence  
- Secure checkout process  
- Dark mode toggle for better user experience  
- AWS S3 integration for storing product images  

## 🛠️ Tech Stack  
- **Frontend:** React, React Bootstrap, React Router  
- **Backend:** Node.js, Express, MongoDB  
- **Storage:** AWS S3 for media uploads  
- **Styling:** Bootstrap & Bootstrap Icons  

## 🏗️ Installation  

### 📌 Prerequisites  
- Node.js & npm installed  
- MongoDB (local or cloud)  
- AWS S3 credentials for image storage  

### ⚙️ Setup  
1. Clone the repository:  
   ```sh
   git clone https://github.com/Abdi-Suufi/E-commerce.git
   cd e-commerce
   ```

2. Install dependencies:  
   ```sh
   npm install
   cd client && npm install
   ```

3. Configure environment variables:  
   Create a `.env` file in the root directory and add:  
   ```env
   AWS_REGION=your-region
   AWS_ACCESS_KEY_ID=your-access-key
   AWS_SECRET_ACCESS_KEY=your-secret-key
   AWS_S3_BUCKET_NAME=your-bucket-name
   MONGO_URI=your-mongodb-uri
   PORT=5000
   ```

4. Start the backend server:  
   ```sh
   npm run server
   ```

5. Start the frontend:  
   ```sh
   cd client
   npm start
   ```

## 📡 API Endpoints  
| Method | Endpoint | Description |  
|--------|----------|-------------|  
| GET | `/api/products` | Retrieve all products |  
| GET | `/api/products/:id` | Fetch a specific product by ID |  
| POST | `/api/products` | Add a new product |  
| PUT | `/api/products/:id` | Update an existing product |  
| DELETE | `/api/products/:id` | Remove a product |  
| POST | `/api/upload` | Upload an image to AWS S3 |  

## 📜 License  
This project is licensed under the **MIT License**.  

---

💡 **Contributions are welcome!** Feel free to submit a pull request or open an issue. Happy coding! 🚀

