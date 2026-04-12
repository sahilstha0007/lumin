import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get the product ID from the URL

function ProductPage() {
  // Get the product ID from the URL parameters
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        // Fetch product data from your backend API.
        // Assuming your backend serves product details at /api/products/:id
        // and is accessible at http://localhost:8000
        const response = await fetch(`http://localhost:8000/api/products/${productId}`);

        if (!response.ok) {
          // If the response is not OK, throw an error
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]); // Re-fetch data if productId changes

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>Error loading product: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  // Render the product details
  return (
    <div className="product-detail-page">
      <h1>{product.name}</h1>
      {product.images && product.images.length > 0 && (
        <img src={product.images[0]} alt={product.name} style={{ maxWidth: '400px', height: 'auto' }} />
      )}
      <p>{product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>

      {/* Add more details as available in your product data */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <strong>Sizes:</strong> {product.sizes.join(', ')}
        </div>
      )}
      {product.colors && product.colors.length > 0 && (
        <div>
          <strong>Colors:</strong> {product.colors.join(', ')}
        </div>
      )}

      <button onClick={() => alert('Add to cart functionality not yet implemented!')}>
        Add to Cart
      </button>

      {/* You might want to add reviews section, related products, etc. here */}
    </div>
  );
}

export default ProductPage;