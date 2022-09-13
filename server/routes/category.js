const express = require('express');
const router = express.Router();
const { verifyTokenAdmin } = require('../middleware/auth');

const Category = require('../models/Category');

router.post('/', verifyTokenAdmin, async (req, res) => {
  const { name } = req.body;

  if(!name) return res.status(400).json({ success: false, message: 'Category name is require.' });
  if(name.length > 20) return res.status(400).json({ success: false, message: 'Category name must be less than 20 characters.' });

  try {
    const newCategory = new Category({
      name,
    });
    await newCategory.save();
    return res.status(200).json({ success: true, message: 'Create new category successfully.', category: newCategory });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
  }
});

router.get('/', verifyTokenAdmin, async (req, res) => {
  try {
    const categories = await Category.find();

    return res.status(200).json({ success: true, categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
  }
});

router.put('/:id', verifyTokenAdmin, async (req, res) => {
  const { name } = req.body;
  if(!name) return res.status(400).json({ success: false, message: 'Category name is require.' });
  if(name.length > 20) return res.status(400).json({ success: false, message: 'Category name must be less than 20 characters.' });

  try {
    let updatedCategory = { name };
    const categoryUpdateCondition = { _id: req.params.id };

    updatedCategory = await Category.findOneAndUpdate(
      categoryUpdateCondition, updatedCategory, { new: true }
    );

    if (!updatedCategory) 
      return res.status(404).json({ success: false, message: 'Data not found' });
    return res.status(201).json({ 
      success: true, 
      message: 'Category updated successfully', category: updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
  }
});

router.delete('/:id', verifyTokenAdmin, async (req, res) => {
  try {
    const categoryDeleteCondition = { _id: req.params.id };
    const deletedCategory = await Category.findByIdAndRemove(categoryDeleteCondition);

    if (!deletedCategory) 
      return res.status(404).json({ success: false, message: 'Data not found' });
    return res.status(201).json({ 
      success: true, 
      message: 'Category deleted successfully', category: deletedCategory,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
  }
});

module.exports = router;