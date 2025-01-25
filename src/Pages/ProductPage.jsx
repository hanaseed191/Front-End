import React, { useState, useEffect } from "react";
import NewProduct from "../Components/NewProduct";
import ProductItem from "../Components/ProductItem";
import { toast } from "react-toastify";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://66bed4f942533c4031442a3e.mockapi.io/products"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        toast.error("Failed to fetch products!", { autoClose: 2000 });
      }
    };
    fetchProducts();
  }, []);
  const addProduct = async (product) => {
    try {
      const response = await fetch(
        "https://66bed4f942533c4031442a3e.mockapi.io/products",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        }
      );
      const newProduct = await response.json();
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      toast.success("Product added successfully!", { autoClose: 2000 });
    } catch (error) {
      toast.error("Failed to add product!", { autoClose: 2000 });
    }
  };

  const updateProduct = async (updatedProduct, id) => {
    try {
      const { pro_id } = products[id];
      const response = await fetch(
        `https://66bed4f942533c4031442a3e.mockapi.io/products/${pro_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProduct),
        }
      );
      const updated = await response.json();
      setProducts((prevProducts) =>
        prevProducts.map((p, index) => (index === id ? updated : p))
      );
      toast.info("Product updated successfully!", { autoClose: 2000 });
    } catch (error) {
      toast.error("Failed to update product!", { autoClose: 2000 });
    }
  };

  const deleteProduct = async (id) => {
    try {
      const { pro_id } = products[id];
      await fetch(
        `https://66bed4f942533c4031442a3e.mockapi.io/products/${pro_id}`,
        {
          method: "DELETE",
        }
      );
      setProducts((prevProducts) =>
        prevProducts.filter((_, index) => index !== id)
      );
      toast.error("Product deleted successfully!", { autoClose: 2000 });
    } catch (error) {
      toast.error("Failed to delete product!", { autoClose: 2000 });
    }
  };

  return (
    <>
      <NewProduct addProduct={addProduct} />
      <table className="min-w-full mt-6 border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <ProductItem
              key={product.pro_id}
              id={index}
              product={product}
              updateProduct={updateProduct}
              deleteProduct={deleteProduct}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductPage;
