import React, { useState } from "react";
import styles from "./ProductForm.module.css";

const initialForm = { name: "", price: "" };

export default function ProductForm({ onSubmit, isSubmitting }) {
  const [form, setForm] = useState(initialForm);
  const [validationError, setValidationError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const priceNumber = Number(form.price);
    if (!form.name.trim() || Number.isNaN(priceNumber) || priceNumber <= 0) {
      setValidationError("Please enter a valid product name and price.");
      return;
    }

    setValidationError("");
    await onSubmit({
      name: form.name.trim(),
      price: priceNumber,
    });
    setForm(initialForm);
  };

  return (
    <div className={styles.card}>
      <h3>Add New Product</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Product Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Mechanical Keyboard"
          />
        </label>

        <label>
          Price
          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            placeholder="e.g. 129.99"
          />
        </label>

        {validationError ? (
          <p className={styles.validationError}>{validationError}</p>
        ) : null}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
