const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");


const adminRoutes = require("./routes/adminRoutes");
const blogRoutes = require("./routes/blogRoutes");

dotenv.config();
const app = express();


app.use(bodyParser.json());
app.use(cors());

app.use(express.json({ limit: "10mb" })); // Increase JSON payload limit
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Increase URL-encoded payload limit


// Connect to Database
connectDB();

// Error Handling Middleware
app.use(require("./middleware/errorHandler"));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api", blogRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
