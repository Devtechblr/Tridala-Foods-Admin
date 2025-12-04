import React, { useState } from 'react';
import { MdAdd, MdEdit, MdDelete, MdClose, MdImage, MdSearch, MdFilterList } from 'react-icons/md';
import '../styles/Products.css';

const Products = () => {
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [showWeightInput, setShowWeightInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [categories, setCategories] = useState([
    'Millet Idly & Dosa Mixes',
    'Coffee Cubes',
    'Millet Chikki',
    'Moringa Nutri Bar',
    'Moringa Soup Powder',
    'Chutney Powders',
    'Health Mix'
  ]);
  const [weights, setWeights] = useState(['100g', '250g', '500g', '1kg']);
  const [newCategory, setNewCategory] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    benefits: '',
    category: '',
    weight: '',
    amount: ''
  });

  const products = [
    { id: 1, name: 'Red Rice Dosa Mix', category: 'Millet Idly & Dosa Mixes', price: '₹299', stock: 150, description: 'Premium organic quinoa', benefits: 'High in protein and fiber' },
    { id: 2, name: '7 cubes -Assorted Pack', category: 'Coffee Cubes', price: '₹199', stock: 200, description: 'Natural chia seeds', benefits: 'Rich in omega-3' },
    { id: 3, name: 'Jowar Chikki', category: 'Millet Chikki ', price: '₹149', stock: 180, description: 'Organic flax seeds', benefits: 'Good for heart health' },
    { id: 4, name: 'Curry Leaves Chutney Powder', category: 'Chutney Powders', price: '₹89', stock: 300, description: 'Whole grain brown rice', benefits: 'High in fiber' },
  ];

  const handleAddProduct = () => {
    setIsEditMode(false);
    setEditingProductId(null);
    setShowForm(!showForm);
  };

  const handleEditProduct = (product) => {
    setIsEditMode(true);
    setEditingProductId(product.id);
    setFormData({
      name: product.name,
      description: product.description || '',
      benefits: product.benefits || '',
      category: product.category,
      weight: '500g', // Default weight, you can enhance this
      amount: product.price.replace('₹', '')
    });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setIsEditMode(false);
    setEditingProductId(null);
    setShowCategoryInput(false);
    setShowWeightInput(false);
    setNewCategory('');
    setNewWeight('');
    setSelectedImages([]);
    setFormData({
      name: '',
      description: '',
      benefits: '',
      category: '',
      weight: '',
      amount: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory.trim()]);
      setFormData(prev => ({ ...prev, category: newCategory.trim() }));
      setNewCategory('');
      setShowCategoryInput(false);
    }
  };

  const handleAddWeight = () => {
    if (newWeight.trim()) {
      setWeights([...weights, newWeight.trim()]);
      setFormData(prev => ({ ...prev, weight: newWeight.trim() }));
      setNewWeight('');
      setShowWeightInput(false);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (selectedImages.length + files.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }
    
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setSelectedImages([...selectedImages, ...imageUrls]);
  };

  const handleRemoveImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      console.log('Updating Product ID:', editingProductId);
      console.log('Updated Product Data:', formData);
      console.log('Images:', selectedImages);
      // Add your product update logic here
    } else {
      console.log('Adding New Product Data:', formData);
      console.log('Images:', selectedImages);
      // Add your product submission logic here
    }
    handleCloseForm();
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Products</h1>
        <button className="btn-primary" onClick={handleAddProduct}>
          <MdAdd /> Add Product
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-box">
          <MdSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-box">
          <MdFilterList className="filter-icon" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Inline Add/Edit Product Form */}
      {showForm && (
        <div className="content-section">
          <div className="card product-form-card">
            <div className="form-header">
              <h2>{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
              <button className="close-btn" onClick={handleCloseForm}>
                <MdClose />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
              {/* Product Name */}
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              {/* Product Description */}
              <div className="form-group">
                <label>Product Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  rows="4"
                  required
                />
              </div>

              {/* Product Benefits */}
              <div className="form-group">
                <label>Product Benefits</label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                  placeholder="Enter product benefits"
                  rows="3"
                />
              </div>

              {/* Product Category */}
              <div className="form-group">
                <label>Product Category *</label>
                <div className="input-with-add">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="add-btn"
                    onClick={() => setShowCategoryInput(!showCategoryInput)}
                  >
                    <MdAdd />
                  </button>
                </div>
                {showCategoryInput && (
                  <div className="add-new-field">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Enter new category"
                    />
                    <button type="button" className="btn-primary" onClick={handleAddCategory}>
                      Add Category
                    </button>
                  </div>
                )}
              </div>

              {/* Product Weight */}
              <div className="form-group">
                <label>Product Weight *</label>
                <div className="input-with-add">
                  <select
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select weight</option>
                    {weights.map((weight, index) => (
                      <option key={index} value={weight}>{weight}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="add-btn"
                    onClick={() => setShowWeightInput(!showWeightInput)}
                  >
                    <MdAdd />
                  </button>
                </div>
                {showWeightInput && (
                  <div className="add-new-field">
                    <input
                      type="text"
                      value={newWeight}
                      onChange={(e) => setNewWeight(e.target.value)}
                      placeholder="Enter new weight (e.g., 2kg)"
                    />
                    <button type="button" className="btn-primary" onClick={handleAddWeight}>
                      Add Weight
                    </button>
                  </div>
                )}
              </div>

              {/* Amount */}
              <div className="form-group">
                <label>Amount (₹) *</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  min="0"
                  required
                />
              </div>

              {/* Product Images */}
              <div className="form-group">
                <label>Product Images (Max 5) *</label>
                <div className="image-upload-container">
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="imageUpload" className="upload-label">
                    <MdImage />
                    <span>Click to upload images</span>
                    <span className="upload-hint">{selectedImages.length}/5 images</span>
                  </label>
                  
                  {selectedImages.length > 0 && (
                    <div className="image-preview-grid">
                      {selectedImages.map((image, index) => (
                        <div key={index} className="image-preview">
                          <img src={image} alt={`Preview ${index + 1}`} />
                          <button
                            type="button"
                            className="remove-image-btn"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <MdClose />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={handleCloseForm}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {isEditMode ? (
                    <>
                      <MdEdit /> Update Product
                    </>
                  ) : (
                    <>
                      <MdAdd /> Add Product
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="content-section">
        <div className="card">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td><span className="badge">{product.category}</span></td>
                      <td>{product.price}</td>
                      <td><span className="stock-badge">{product.stock}</span></td>
                      <td>
                        <button className="btn-action" onClick={() => handleEditProduct(product)}>
                          <MdEdit /> Edit
                        </button>
                        <button className="btn-action danger">
                          <MdDelete /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#7f8c8d' }}>
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
