// In blogRoutes.js
const express = require("express");
const router = express.Router();
const {CreateBlog,DeleteBlog,UpdateBlog, ViewAllBlog}=require("../controllers/blogController")

router.post("/create-blog", CreateBlog)

router.delete("/delete-blog/:id", DeleteBlog)

router.put("/update-blog/:id", UpdateBlog)

router.get("/blogs", ViewAllBlog)

module.exports = router;
