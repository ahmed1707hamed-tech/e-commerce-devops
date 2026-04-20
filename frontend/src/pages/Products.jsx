import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Products.module.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Products Management</h1>
          <p>Manage your product catalog from one place.</p>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <span>Total Products</span>
            <strong>{products.length}</strong>
          </div>

          <div className={styles.searchWrap}>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by product name..."
              aria-label="Search products by name"
            />
          </div>
        </div>

        <section className={styles.tableCard}>
          {loading ? (
            <p className={styles.message}>Loading...</p>
          ) : filteredProducts.length === 0 ? (
            <p className={styles.message}>No products found.</p>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>#{product.id}</td>
                      <td>{product.name}</td>
                      <td>${Number(product.price)}</td>
                      <td>
                        <div className={styles.actions}>
                          <button type="button" className={styles.editBtn}>
                            Edit
                          </button>
                          <button type="button" className={styles.deleteBtn}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}