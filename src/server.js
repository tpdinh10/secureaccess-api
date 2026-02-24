require("dotenv").config();
const helmet = require("helmet");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/profileRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.get("/", (req, res) => res.send("SecureAccess API is running"));
app.get("/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });