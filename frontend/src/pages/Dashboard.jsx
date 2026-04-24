import React, { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../services/productService";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fetchProducts = useCallback(async (initialLoad = false) => {
    try {
      if (initialLoad) {
        setLoading(true);
      } else {
        setIsRefreshing(true);
      }
      setError("");
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (fetchError) {
      setError("Failed to load products. Please check backend connection.");
    } finally {
      if (initialLoad) {
        setLoading(false);
      }
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(true);
  }, [fetchProducts]);

  useEffect(() => {
    const intervalId = setInterval(fetchProducts, 5000);
    return () => clearInterval(intervalId);
  }, [fetchProducts]);

  const handleAddProduct = async (payload) => {
    setIsSubmitting(true);

    try {
      await addProduct(payload);
      await fetchProducts();
      setError("");
      return;
    } catch (createError) {
      setError("Failed to add product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProduct = async (payload) => {
    if (!editingProduct) return;
    setIsSubmitting(true);
    try {
      await updateProduct(editingProduct.id, payload);
      setEditingProduct(null);
      await fetchProducts();
      setError("");
    } catch (updateError) {
      setError("Failed to update product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (product) => {
    const confirmed = window.confirm(`Delete "${product.name}"?`);
    if (!confirmed) return;
    setIsDeletingId(product.id);
    try {
      await deleteProduct(product.id);
      await fetchProducts();
      setError("");
    } catch (deleteError) {
      setError("Failed to delete product.");
    } finally {
      setIsDeletingId(null);
    }
  };

  const totalValue = useMemo(() => {
    return products.reduce((sum, product) => sum + Number(product.price || 0), 0);
  }, [products]);

  return (
    <div className={styles.layout}>
      <Sidebar
        isOpen={isMobileMenuOpen}
        onNavigate={() => setIsMobileMenuOpen(false)}
      />

      <main className={styles.main}>
        <Navbar
          onToggleMenu={() => setIsMobileMenuOpen((prev) => !prev)}
          isMobileMenuOpen={isMobileMenuOpen}
        />

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
          <div className={styles.formsColumn}>
            <ProductForm onSubmit={handleAddProduct} isSubmitting={isSubmitting} />
            {editingProduct ? (
              <ProductForm
                title={`Edit Product #${editingProduct.id}`}
                submitLabel="Update Product"
                submittingLabel="Updating..."
                initialValues={{
                  name: editingProduct.name,
                  price: editingProduct.price,
                }}
                onSubmit={handleUpdateProduct}
                isSubmitting={isSubmitting}
                onCancel={() => setEditingProduct(null)}
              />
            ) : null}
          </div>

          <div>
            {loading ? <p className={styles.message}>Loading products...</p> : null}
            {isRefreshing && !loading ? (
              <p className={styles.message}>Refreshing products...</p>
            ) : null}
            {error ? <p className={styles.error}>{error}</p> : null}
            {!loading ? (
              <ProductTable
                products={products}
                onEdit={setEditingProduct}
                onDelete={handleDeleteProduct}
                deletingId={isDeletingId}
              />
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
}
