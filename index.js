const express = require("express");
const mongoose = require("mongoose");
const Blogs = require("./models/blog-model");
const cors = require("cors");

const app = express();
app.use(express.json({ limit: "16mb" }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Post new blogs to MongoDB database
app.post("/blogs", async (req, res) => {
  try {
    const blogs = await Blogs.create(req.body);
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get blogs from MongoDB database
app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blogs.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get single blog from MongoDB database
app.get("/blogs/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blogs.findById(id);
    res.status(200).json(blog);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

// Update a blog from MongoDB database
app.put("/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blogs.findByIdAndUpdate(id, req.body);
    if (!blog) {
      return res
        .status(404)
        .json({ message: `Cannot find blog with ID: ${id}` });
    }

    const updatedBlog = await Blogs.findById(id);
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete a blog from MongoDB database
app.delete("/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blogs.findByIdAndDelete(id);
    if (!blog) {
      return res
        .status(404)
        .json({ message: `Cannot find blog with ID: ${id}` });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://dejavu:Draven0521@traveloverloadapi.7qqrj.mongodb.net/Travel-API?retryWrites=true&w=majority&appName=TravelOverloadApi",
  )
  .then(() => {
    console.log("Connected to mongodb");
    app.listen(5000, console.log("Server started on 5000"));
  })
  .catch((error) => {
    console.log(error);
  });
