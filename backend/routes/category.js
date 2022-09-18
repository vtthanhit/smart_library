const express = require('express');
const router = express.Router();
const { verifyTokenAdmin } = require('../middleware/auth');

const Category = require('../models/Category');

router.post('/', verifyTokenAdmin, async (req, res) => {
  const { name } = req.body;

  if(!name) return res.status(400).json({ success: false, message: 'Tên danh mục là bắt buộc!' });
  if(name.length > 20) return res.status(400).json({ success: false, message: 'Tên danh mục phải ít hơn 20 ký tự!' });

  try {
    const category = await Category.findOne({ name });
    if(category) {
      return res.status(400).json({ success: false, message: 'Tên danh mục đã tồn tại!' });
    }
    
    const newCategory = new Category({
      name,
    });
    await newCategory.save();
    return res.status(200).json({ success: true, message: 'Tạo mới danh mục thành công!', category: newCategory });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER!' });
  }
});

router.get('/', verifyTokenAdmin, async (req, res) => {
  try {
    const categories = await Category.find();

    return res.status(200).json({ success: true, categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER!' });
  }
});

router.put('/:id', verifyTokenAdmin, async (req, res) => {
  const { name } = req.body;
  if(!name) return res.status(400).json({ success: false, message: 'Tên danh mục là bắt buộc!' });
  if(name.length > 20) return res.status(400).json({ success: false, message: 'Tên danh mục phải ít hơn 20 ký tự!' });

  try {
    let updatedCategory = { name };
    const categoryUpdateCondition = { _id: req.params.id };

    updatedCategory = await Category.findOneAndUpdate(
      categoryUpdateCondition, updatedCategory, { new: true }
    );

    if (!updatedCategory)
      return res.status(404).json({ success: false, message: 'Dữ liệu không tìm thấy!' });
    return res.status(201).json({
      success: true,
      message: 'Đã cập nhật danh mục thành công!', category: updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER!' });
  }
});

router.delete('/:id', verifyTokenAdmin, async (req, res) => {
  try {
    const categoryDeleteCondition = { _id: req.params.id };
    const deletedCategory = await Category.findByIdAndRemove(categoryDeleteCondition);

    if (!deletedCategory)
      return res.status(404).json({ success: false, message: 'Dữ liệu không tìm thấy!' });
    return res.status(201).json({
      success: true,
      message: 'Đã xoá danh mục thành công!', category: deletedCategory,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER!' });
  }
});

module.exports = router;
