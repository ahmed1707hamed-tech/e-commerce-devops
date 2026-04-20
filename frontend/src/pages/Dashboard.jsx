import React, { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";
import { addProduct, getProducts } from "../services/productService";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setError("");
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (fetchError) {
      setError("Failed to load products. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const intervalId = setInterval(fetchProducts, 5000);
    return () => clearInterval(intervalId);
  }, [fetchProducts]);

  const handleAddProduct = async (payload) => {
    setIsSubmitting(true);

    try {
      const createdProduct = await addProduct(payload);
      setProducts((prev) => [createdProduct, ...prev]);
      setError("");
      return;
    } catch (createError) {
      const fallbackProduct = {
        id: Date.now(),
        ...payload,
      };
      setProducts((prev) => [fallbackProduct, ...prev]);
      setError("Product added locally (POST endpoint not available).");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalValue = useMemo(() => {
    return products.reduce((sum, product) => sum + Number(product.price || 0), 0);
  }, [products]);

  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.main}>
        <Navbar />

        <section className={styles.statsGrid}>
          <article className={styles.statCard}>
            <p>Total Products</p>
            <strong>{products.length}</strong>
          </article>

          <article className={styles.statCard}>
            <p>Total Value</p>
            <strong>${totalValue.toLocaleString()}</strong>
          </article>
        </section>

        <section className={styles.contentGrid}>
          <ProductForm onSubmit={handleAddProduct} isSubmitting={isSubmitting} />

          <div>
            {loading ? <p className={styles.message}>Loading products...</p> : null}
            {error ? <p className={styles.error}>{error}</p> : null}
            {!loading ? <ProductTable products={products} /> : null}
          </div>
        </section>
      </main>
    </div>
  );
}
