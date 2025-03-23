import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Badge, Spinner, Container, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showAddProductCard, setShowAddProductCard] = useState(false);
  const [newProductData, setNewProductData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    isNew: false
  });
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editSelectedFile, setEditSelectedFile] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(process.env.REACT_APP_API_URL);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/${_id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product');
    }
  };

  const handleEdit = (product) => {
    // Ensure description exists even if it's not in the backend data
    const productWithDefaults = {
      ...product,
      _id: product._id, // Explicitly include _id
      description: product.description || "",
      isNew: product.isNew || false
    };
    setEditingProductId(product._id);
    setEditFormData(productWithDefaults);
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditFormData({});
    setEditSelectedFile(null);
    setUploadError(null);
    setUploadMessage(null);
  };

  const handleInputChange = (e, isNewProduct = false) => {
    const { name, value } = e.target;
    const formData = isNewProduct ? newProductData : editFormData;
    const setFormData = isNewProduct ? setNewProductData : setEditFormData;
    
    setFormData({
      ...formData,
      [name]: name === 'price' ? (value === '' ? '' : parseFloat(value)) : value,
    });
  };

  const handleCheckboxChange = (e, isNewProduct = false) => {
    const { name, checked } = e.target;
    const formData = isNewProduct ? newProductData : editFormData;
    const setFormData = isNewProduct ? setNewProductData : setEditFormData;
    
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleFileChange = (e, isNewProduct = false) => {
    if (isNewProduct) {
      setSelectedFile(e.target.files[0]);
    } else {
      setEditSelectedFile(e.target.files[0]);
    }
  };

  const uploadImage = async (file, isNewProduct = false) => {
    try {
      setUploadLoading(true);
      setUploadError(null);
      setUploadMessage('Uploading image...');

      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(`${process.env.REACT_APP_API_URL.replace('/api/products', '')}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploadMessage('Image uploaded successfully!');
      
      if (isNewProduct) {
        setNewProductData({
          ...newProductData,
          image: response.data.imageUrl
        });
        setSelectedFile(null);
      } else {
        setEditFormData({
          ...editFormData,
          image: response.data.imageUrl
        });
        setEditSelectedFile(null);
      }
      
      return response.data.imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError('Failed to upload image');
      return null;
    } finally {
      setUploadLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    try {
      // If there's a file selected, upload it first
      let imageUrl = editFormData.image;
      if (editSelectedFile) {
        const uploadedUrl = await uploadImage(editSelectedFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          return; // Don't proceed if upload failed
        }
      }

      // Make sure we're sending all fields in the correct format
      const productToUpdate = {
        name: editFormData.name,
        price: parseFloat(editFormData.price),
        image: imageUrl,
        description: editFormData.description || "",
        isNew: editFormData.isNew || false
      };
      
      await axios.put(`${process.env.REACT_APP_API_URL}/${editFormData._id}`, productToUpdate);
      setEditingProductId(null);
      setEditFormData({});
      setEditSelectedFile(null);
      setUploadError(null);
      setUploadMessage(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product');
    }
  };

  const handleAddProductClick = () => {
    setShowAddProductCard(true);
  };

  const handleCancelAddProduct = () => {
    setShowAddProductCard(false);
    setNewProductData({
      name: '',
      price: '',
      image: '',
      description: '',
      isNew: false
    });
    setSelectedFile(null);
    setUploadError(null);
    setUploadMessage(null);
  };

  const handleSaveNewProduct = async () => {
    try {
      // If there's a file selected, upload it first
      let imageUrl = newProductData.image;
      if (selectedFile) {
        const uploadedUrl = await uploadImage(selectedFile, true);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          return; // Don't proceed if upload failed
        }
      }

      // Format the data for the API
      const productToAdd = {
        name: newProductData.name,
        price: parseFloat(newProductData.price),
        image: imageUrl || "https://placehold.co/400x300?text=Product+Image",
        description: newProductData.description || "",
        isNew: newProductData.isNew || false
      };
      
      await axios.post(process.env.REACT_APP_API_URL, productToAdd);
      setShowAddProductCard(false);
      setNewProductData({
        name: '',
        price: '',
        image: '',
        description: '',
        isNew: false
      });
      setSelectedFile(null);
      setUploadError(null);
      setUploadMessage(null);
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product');
    }
  };

  // Render upload status messages
  const renderUploadStatus = () => {
    if (uploadLoading) {
      return <Alert variant="info">Uploading image...</Alert>;
    }
    if (uploadError) {
      return <Alert variant="danger">{uploadError}</Alert>;
    }
    if (uploadMessage && !uploadError) {
      return <Alert variant="success">{uploadMessage}</Alert>;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="text-center my-5 py-5">
        <Spinner animation="border" variant="primary" className="mb-2" />
        <p className="text-muted">Loading amazing products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-5 py-5">
        <div className="text-danger mb-3">⚠️ {error}</div>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Product List</h2>
        <Button 
          variant="primary" 
          onClick={handleAddProductClick}
          disabled={showAddProductCard}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add Product
        </Button>
      </div>
      
      <Row className="g-4">
        {/* Add Product Card */}
        {showAddProductCard && (
          <Col lg={4} md={6} className="mb-4">
            <Card className="h-100 border-primary">
              <Form.Group className="position-absolute top-0 end-0 m-2">
                <Form.Check
                  type="checkbox"
                  name="isNew"
                  label="NEW"
                  checked={newProductData.isNew}
                  onChange={(e) => handleCheckboxChange(e, true)}
                />
              </Form.Group>
              
              <Card.Body>
                <h5 className="mb-3">New Product</h5>
                {renderUploadStatus()}
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={newProductData.name}
                      onChange={(e) => handleInputChange(e, true)}
                      placeholder="Enter product name"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Price (£)</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      name="price"
                      value={newProductData.price}
                      onChange={(e) => handleInputChange(e, true)}
                      placeholder="0.00"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, true)}
                    />
                    <Form.Text className="text-muted">
                      Max file size: 25MB
                    </Form.Text>
                  </Form.Group>
                  
                  {selectedFile && (
                    <Button
                      variant="outline-primary"
                      className="mb-3"
                      onClick={() => uploadImage(selectedFile, true)}
                      disabled={uploadLoading}
                    >
                      {uploadLoading ? 'Uploading...' : 'Upload Image Now'}
                    </Button>
                  )}
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Or Use Image URL</Form.Label>
                    <Form.Control
                      type="text"
                      name="image"
                      value={newProductData.image}
                      onChange={(e) => handleInputChange(e, true)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </Form.Group>
                  
                  {newProductData.image && (
                    <div className="mb-3">
                      <img 
                        src={newProductData.image} 
                        alt="Product preview" 
                        style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }} 
                        onError={(e) => e.target.src = "https://placehold.co/400x300?text=Image+Error"} 
                      />
                    </div>
                  )}
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={newProductData.description}
                      onChange={(e) => handleInputChange(e, true)}
                      placeholder="Product description"
                    />
                  </Form.Group>
                  
                  <div className="d-flex gap-2">
                    <Button 
                      variant="success" 
                      className="w-100"
                      onClick={handleSaveNewProduct}
                      disabled={!newProductData.name || !newProductData.price || uploadLoading}
                    >
                      <i className="bi bi-check-lg me-2"></i>
                      Save
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="w-100"
                      onClick={handleCancelAddProduct}
                      disabled={uploadLoading}
                    >
                      <i className="bi bi-x-lg me-2"></i>
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        )}
        
        {/* Existing Products */}
        {products.map((product) => (
          <Col key={product._id} lg={4} md={6} className="mb-4">
            <Card className="h-100">
              {editingProductId === product._id ? (
                <Form.Group className="position-absolute top-0 end-0 m-2">
                  <Form.Check
                    type="checkbox"
                    name="isNew"
                    label="NEW"
                    checked={editFormData.isNew || false}
                    onChange={handleCheckboxChange}
                  />
                </Form.Group>
              ) : (
                product.isNew && (
                  <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 2 }}>
                    <Badge bg="success" className="px-2 py-1">NEW</Badge>
                  </div>
                )
              )}
              
              {editingProductId !== product._id && (
                <Card.Img 
                  variant="top" 
                  src={product.image} 
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                  onError={(e) => e.target.src = "https://placehold.co/400x300?text=Image+Error"}
                />
              )}
              
              <Card.Body>
                {editingProductId === product._id ? (
                  <Form>
                    {renderUploadStatus()}
                    <Form.Group className="mb-3">
                      <Form.Label>Product Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={editFormData.name || ''}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Price (£)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        name="price"
                        value={editFormData.price || ''}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Upload New Image</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, false)}
                      />
                      <Form.Text className="text-muted">
                        Max file size: 25MB
                      </Form.Text>
                    </Form.Group>
                    
                    {editSelectedFile && (
                      <Button
                        variant="outline-primary"
                        className="mb-3"
                        onClick={() => uploadImage(editSelectedFile)}
                        disabled={uploadLoading}
                      >
                        {uploadLoading ? 'Uploading...' : 'Upload Image Now'}
                      </Button>
                    )}
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Or Use Image URL</Form.Label>
                      <Form.Control
                        type="text"
                        name="image"
                        value={editFormData.image || ''}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    
                    {editFormData.image && (
                      <div className="mb-3">
                        <img 
                          src={editFormData.image} 
                          alt="Product preview" 
                          style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }} 
                          onError={(e) => e.target.src = "https://placehold.co/400x300?text=Image+Error"} 
                        />
                      </div>
                    )}
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={editFormData.description || ''}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    
                    <div className="d-flex gap-2">
                      <Button 
                        variant="success" 
                        className="w-100"
                        onClick={handleSaveEdit}
                        disabled={!editFormData.name || !editFormData.price || uploadLoading}
                      >
                        <i className="bi bi-check-lg me-2"></i>
                        Save
                      </Button>
                      <Button 
                        variant="secondary" 
                        className="w-100"
                        onClick={handleCancelEdit}
                        disabled={uploadLoading}
                      >
                        <i className="bi bi-x-lg me-2"></i>
                        Cancel
                      </Button>
                    </div>
                  </Form>
                ) : (
                  <>
                    <Card.Title>{product.name}</Card.Title>
                    <div className="price-tag">£{product.price}</div>
                    <p className="text-muted small mb-3">
                      {product.description || "High-quality fashion item perfect for your collection."}
                    </p>
                    <div className="d-flex gap-2">
                      <Button 
                        variant="warning" 
                        className="w-100"
                        onClick={() => handleEdit(product)}
                      >
                        <i className="bi bi-pencil me-2"></i>
                        Edit
                      </Button>
                      <Button 
                        variant="danger" 
                        className="w-100"
                        onClick={() => handleDelete(product._id)}
                      >
                        <i className="bi bi-trash me-2"></i>
                        Delete
                      </Button>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;