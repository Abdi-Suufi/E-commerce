# 🛍️ FashionHub - eCommerce Website

## 📌 Overview  
FashionHub is a modern and user-friendly eCommerce web application built with the MERN stack. It enables users to browse products, add items to their cart, and complete purchases seamlessly. The backend integrates AWS S3 for secure image storage, ensuring efficient and scalable media management.  
![image](https://github.com/user-attachments/assets/85491ea1-593b-40be-9961-801a23754f79)

## 🚀 Features  
- Full product management as Admin(Create, Read, Update, Delete)
  
  ![image](https://github.com/user-attachments/assets/f381ddf2-0b38-4121-9b5d-76321f4acfc4)
- Shopping cart with local storage persistence
  
  ![image](https://github.com/user-attachments/assets/9a9b810f-a46c-46d4-9ad3-bb3be74d4d5a)
- Secure checkout process

  ![image](https://github.com/user-attachments/assets/d0eb92a5-36b3-43c8-9147-8efddd6c4a9c)
- Dark mode toggle for better user experience

  ![image](https://github.com/user-attachments/assets/730577f0-3645-4ba5-beae-43602b319238)
- AWS S3 integration for storing product images  

## 🛠️ Tech Stack  
- **Frontend:** React, React Bootstrap, React Router  
- **Backend:** Node.js, Express, MongoDB  
- **Storage:** AWS S3 for media uploads  
- **Styling:** Bootstrap & Bootstrap Icons  

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
