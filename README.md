# 🧠 AI Quiz Generator

A powerful, minimalist full-stack application that leverages **Gemini 3.1 Flash-Lite** and **LangChain** to automatically generate high-quality multiple-choice quizzes from PDF documents or raw text notes.

![Feature Highlights](https://img.shields.io/badge/Model-Gemini%203.1%20Flash--Lite-blue)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Express%20%7C%20LangChain-green)

---

## ✨ Key Features

- **📄 Multimodal Document Processing**: Direct PDF upload support using Gemini's native multimodal capabilities. No fragile PDF-to-text parsing required.
- **⚙️ Customizable Difficulty**: Generate quizzes with **Easy, Medium, or Hard** complexity.
- **🔢 Variable Question Count**: Choose exactly how many questions (1-15) you want to generate.
- **🔀 Smart Shuffle Logic**: On retake, both question order and answer choices are randomized to prevent pattern memorization.
- **🏆 Persistent Best Score**: Tracks and saves your record score locally with a gold star aesthetic.
- **🎨 Minimalist UI**: Clean, responsive interface built with vanilla CSS and smooth micro-animations.
- **🛡️ Strict Schema Enforcement**: Uses **Zod** and LangChain's `withStructuredOutput` to ensure perfectly formatted JSON responses every time.

---

## 🚀 Tech Stack

### Frontend
- **React 18** (Vite)
- **Lucide-React** (Icons)
- **Axios** (API Requests)
- **Vanilla CSS** (Custom Design System)

### Backend
- **Node.js & Express**
- **LangChain** (@langchain/google-genai)
- **Zod** (Schema Validation)
- **Multer** (File Handling)

---

## 🛠️ Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/AKdaAKA/Quiz-and-Study-thing.git
cd Quiz-and-Study-thing
```

### 2. Backend Configuration
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=4000
GEMINI_API_KEY=your_google_ai_studio_api_key_here
```

### 3. Frontend Configuration
```bash
cd ../frontend
npm install
```

---

## 🏃‍♂️ Running the App

### Start the Backend
```bash
cd backend
node server.js
```

### Start the Frontend
```bash
cd frontend
npm run dev
```
The app will be available at `http://localhost:5173` (proxied to port 4000).

---

## 🏗️ Architecture (SoC)

The project follows a strict **Separation of Concerns** (SoC) pattern:

- **Controllers**: Handle HTTP requests and response logic (`quizController.js`).
- **Services**: Contain business and AI logic (`llmService.js`).
- **Routes**: Define API endpoints (`quizRoutes.js`).
- **Middleware**: Manage file uploads and validation (`uploadMiddleware.js`).

---

## 📝 License
Distributed under the ISC License.

---

*Built with ❤️ using Google Gemini 3.1*
