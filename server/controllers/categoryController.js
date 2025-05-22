const { default: mongoose } = require('mongoose');
const Category = require('../models/Category');

const {uploadToCloudinary} =  require('./cloudinaryService.js');

exports.createCategory = async (req, res) => {
  try {
    if(req.userRole != "admin") return res.status(403).json({message:"Unauthorized action! Please contact <admin>",status:404,role:req.role})
     const {name,description} = req.body 
    const fileBuffer = req.file.buffer
    const result = await uploadToCloudinary(fileBuffer);

    
    const newCategory = await Category.create({name,description,photo: {public_id: result.public_id ,url:result.secure_url},recordedBy:req.userId});
 
    return res.status(201).json(newCategory);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};



exports.createSubCategory = async (req, res) => {
  try {
    if(req.userRole != "admin") return res.status(403).json({message:"Unauthorized action! Please contact <admin>",status:404,role:req.role})
     const {name,description,sub_id} = req.body
    if(!mongoose.isValidObjectId(sub_id)) return res.status(406).json({message: "Invalid Parent Category!"}) 
    // check existence of category
    const isCategoryExist = await Category.findById(sub_id)
    if(!isCategoryExist) return res.status(404).json({message:"Parent Category is not found!"})
    // check if the same subcategory already exist under the same category
    const is_subcategoryExist = await Category.findOne({parentCategory: sub_id, name: name})
    if(is_subcategoryExist) return res.status(409).json({message: "Subcategory Already Exist!"})

    const newCategory = await Category.create({name,description,parentCategory:sub_id,recordedBy:req.userId});

    return res.status(200).json(newCategory)
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};



// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.aggregate([
      {
        $match: {
          $or: [
            { parentCategory: { $exists: false } },
            { parentCategory: null }
          ]
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'category',
          as: 'products'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: 'parentCategory',
          as: 'subcategories'
        }
      },
      {
        $project: {
          name: 1,
          description: 1,
          photo: 1,
          productCount: { $size: '$products' },
          subcategories: 1,
          subcategoryCount: { $size: '$subcategories' }
        }
      }
    ])
    
    
    return res.json(categories);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get a single category by ID
exports.getCategoryById = async (req, res,next) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) return res.status(404).json({ message: 'Category not found' });
    req.category = category
    next()
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getCategory =  (req, res) => {
  return res.json(req.category)
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
  console.log("update category")
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });
   
    return res.json(updatedCategory);
  } catch (err) {
   return  res.status(400).json({ message: err.message });
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return res.status(404).json({ message: 'Category not found' });

   return res.json(deletedCategory);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};