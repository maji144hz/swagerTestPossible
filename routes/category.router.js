const express = require("express");
const router = express.Router();
const {createCategory, getAllCategories , getCategoryById, updateCategory, deleteCategory} = require("../controllers/category.controller");

// #swagger.tags = ['Category']
// #swagger.description = 'Create a new category'
router.post("/",createCategory);

// #swagger.tags = ['Category']
// #swagger.description = 'Get all categories'
router.get("/",getAllCategories);

// #swagger.tags = ['Category']
// #swagger.description = 'Get category by ID'
router.get("/:id",getCategoryById);

// #swagger.tags = ['Category']
// #swagger.description = 'Update category by ID'
router.put("/:id",updateCategory);

// #swagger.tags = ['Category']
// #swagger.description = 'Delete category by ID'
router.delete("/:id",deleteCategory);

module.exports = router;
