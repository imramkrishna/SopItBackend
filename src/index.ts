import express from 'express';
import cors from 'cors';
import sellerRoutes from "./routes/seller/route"

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/seller",sellerRoutes)

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});