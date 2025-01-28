const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const Blog = require("../model/blog");

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads/"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname.trim()}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/Addnew", (req, res) => {
  return res.render("addblog", {
    user: req.user,
  });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;

  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImgUrl: `/uploads/${req.file.filename}`,
  });

  return res.redirect(`/blog/${blog._id}`);
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  res.render("blog", {
    user: req.user,
    blog,
  });
});

module.exports = router;
