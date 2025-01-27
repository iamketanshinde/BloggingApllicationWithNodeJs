const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const Blog = require("../model/blog"); // Ensure correct path to Blog model

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads/")); // Ensure the uploads directory exists
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`; // Removed extra spaces in filename
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/Addnew", (req, res) => {
  return res.render("addblog", {
    user: req.user, // Ensure req.user is defined
  });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;

  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id, // Ensure req.user._id exists
    coverImgUrl: `/uploads/${req.file.filename}`, // File path stored in database
  });

  return res.redirect(`/blog/${blog._id}`);
});

module.exports = router;
