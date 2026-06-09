
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js'; 
import authRoutes from './routes/auth.js'; // 💡 NEW IMPORT
import connectDB from './config/db.js'; 
 

const app = express();
const PORT = 3001;

// 1. Connect to Database (Must run before Express listens for requests)
connectDB(); 

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Mount the centralized API routes under the /api prefix
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes); // 💡 NEW: Mount Auth routes

// Simple default route for health check
app.get('/', (req, res) => {
    res.send('FitYaar Backend API is running!');
});

app.listen(PORT, () => {
    console.log(`FitYaar Backend server running on http://localhost:${PORT}`);
});