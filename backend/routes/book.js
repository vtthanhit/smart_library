const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { verifyTokenAdmin } = require("../middleware/auth");

const Book = require("../models/Book");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), verifyTokenAdmin, async (req, res) => {
  const { name, author, description, quantity, category, sku } = req.body;

  if (!name)
    return res
      .status(400)
      .json({ success: false, message: "Tên sách là bắt buộc!" });
  if (!author)
    return res
      .status(400)
      .json({ success: false, message: "Tác giả là bắt buộc!" });
  if (!category)
    return res
      .status(400)
      .json({ success: false, message: "Danh mục là bắt buộc!" });

  const checkBook = await Book.find({ sku });
  if (checkBook.length > 0)
    return res
      .status(400)
      .json({ success: false, message: "Mã sách đã tồn tại!" });

  try {
    let newBook = new Book({
      name,
      author,
      description,
      quantity,
      category,
      sku,
    });
    if (req.file) {
      newBook = new Book({
        name,
        author,
        description,
        quantity,
        category,
        sku,
        image: {
          data: fs.readFileSync("uploads/" + req.file.filename),
          contentType: "image/png",
        },
      });
    }
    await newBook.save();
    return res.status(200).json({
      success: true,
      message: "Create new book successfully.",
      book: newBook,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/sku", async (req, res) => {
  try {
    const book = await Book.findOne({ sku: req.query.sku }).populate("category", ["name"]);

    return res.status(200).json({ success: true, book });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    let books;
    if (req.query.q && req.query.q !== 'null') {
      books = await Book.find({ name: { $regex: `.*${req.query.q}.*`, $options: 'i' }}).populate("category", ["name"]);
    } else {
      books = await Book.find().populate("category", ["name"]);
    }

    return res.status(200).json({ success: true, books });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("category", ["name"]);

    return res.status(200).json({ success: true, book });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal SERVER" });
  }
});

router.get("/category/:categoryId", async (req, res) => {
  try {
    const books = await Book.find({ category: req.params.categoryId }).populate(
      "category",
      ["name"]
    );

    return res.status(200).json({ success: true, books });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/:id", upload.single("image"), verifyTokenAdmin, async (req, res) => {
  const { name, author, description, quantity, category, sku } = req.body;

  try {
    let updatedBook = {
      name,
      author,
      description,
      quantity,
      category,
      sku,
    };
    if (req.file) {
      updatedBook = {
        name,
        author,
        description,
        quantity,
        category,
        sku,
        image: {
          data: fs.readFileSync("uploads/" + req.file.filename),
          contentType: "image/png",
        },
      }
    }
    const bookUpdateCondition = { _id: req.params.id };

    const book = await Book.find(bookUpdateCondition);
    if (sku !== book.sku) {
      const checkBook = await Book.find({ sku });
      if (checkBook.length > 0) {
        return res
          .status(400)
          .json({ success: false, message: "Mã sách đã tồn tại!" });
      }
    }

    updatedBook = await Book.findOneAndUpdate(
      bookUpdateCondition,
      updatedBook,
      { new: true }
    );

    if (!updatedBook)
      return res
        .status(404)
        .json({ success: false, message: "Data not found" });
    return res.status(201).json({
      success: true,
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const bookDeleteCondition = { _id: req.params.id };
    const deletedBook = await Book.findByIdAndRemove(bookDeleteCondition);

    if (!deletedBook)
      return res
        .status(404)
        .json({ success: false, message: "Data not found" });
    return res.status(201).json({
      success: true,
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal SERVER" });
  }
});

module.exports = router;
