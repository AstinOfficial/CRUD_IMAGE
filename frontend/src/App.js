import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [images, setImages] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingImages, setEditingImages] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages([...images, ...files]);
  };

  const handleRemoveCreatedImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleCreateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      images.forEach(image => {
        formData.append('images', image);
      });
      await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchProducts();
      setName('');
      setImages([]);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleEditProduct = async (id) => {
    try {
      const formData = new FormData();
      formData.append('name', editingName);

      // Add existing images
      editingImages.forEach(image => {
        if (typeof image === 'string') {
          formData.append('existingImages', image);
        } else {
          formData.append('images', image);
        }
      });

      await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setEditingProductId(null);
      setEditingName('');
      setEditingImages([]);
      fetchProducts();
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditNameChange = (event) => {
    setEditingName(event.target.value);
  };

  const handleAddImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';
    input.onchange = (event) => {
      setEditingImages(prevImages => [...prevImages, ...event.target.files]);
    };
    input.click();
  };

  const handleRemoveImage = async (index) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${editingProductId}/removeImage/${index}`);
      const updatedImages = editingImages.filter((_, i) => i !== index);
      setEditingImages(updatedImages);
      alert('Image removed successfully!');
    } catch (error) {
      console.error('Error removing image:', error);
      alert('Failed to remove image. Please try again.');
    }
  };

  const handleEditButtonClick = (id, name, images) => {
    setEditingProductId(id);
    setEditingName(name);
    setEditingImages(images);
  };

  return (
    <div className="container">
      <h1>IMAGE CRUD</h1>
      <div className="form">
        <input type="text" value={name} onChange={handleNameChange} placeholder="Enter product name" />
        <input type="file" multiple onChange={handleImageChange} />
        <button onClick={handleCreateProduct}>Create Product</button>
      </div>
      <div className="image-preview">
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={URL.createObjectURL(image)}
              alt={`Preview ${index}`}
              style={{ width: "200px", height: "200px" }} // Example width and height
            />
            <button onClick={() => handleRemoveCreatedImage(index)}>Remove</button>
          </div>
        ))}
      </div>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id}>
            {editingProductId === product._id ? (
              <>
                <input type="text" value={editingName} onChange={handleEditNameChange} />
                <div className="edit-images">
                  {editingImages.map((image, index) => (
                    <div key={index}>
                      <img
                        src={
                          typeof image === "string"
                            ? `http://localhost:5000/${image}`
                            : URL.createObjectURL(new Blob([image]))
                        }
                        alt={`Product ${index}`}
                        style={{ width: "200px", height: "200px" }} // Example width and height
                      />
                      <button onClick={() => handleRemoveImage(index)}>Remove</button>
                    </div>
                  ))}
                  <button onClick={handleAddImage}>Add Image</button>
                </div>
                <button onClick={() => handleEditProduct(product._id)}>Save</button>
              </>
            ) : (
              <>
                <h3>{product.name}</h3>
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/${image}`}
                    alt={`Product ${index}`}
                    style={{ width: "200px", height: "200px" }} // Example width and height
                  />
                ))}
                <button onClick={() => handleEditButtonClick(product._id, product.name, product.images)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>

  );
}

export default App;
