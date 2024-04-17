import React, { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: string;
  stock: string;
  description: string;
}

interface Props {
  formData: Product | undefined;
}
const AddProductForm = (props: Props) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const updateProducts = () => {
    setFormData({
      name: props.formData?.name || "",
      price: props.formData?.price || "",
      description: props.formData?.description || "",
      stock: props.formData?.stock || "",
    });
  };

  const baseUrl = "http://43.204.25.242:3001";
  // Note: This may be the wrong way to do this
  useEffect(() => {
    console.log(formData);
    updateProducts();
  }, [props.formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error message when the user starts typing again
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validation logic
    const newErrors = {
      name: formData.name.trim() ? "" : "Name is required",
      description: formData.description.trim() ? "" : "Description is required",
      price: formData.price ? "" : "Price is required",
      stock: formData.stock ? "" : "Stock is required",
    };
    setErrors(newErrors);
    if (!Object.values(newErrors).some((error) => error)) {
      // Form is valid, handle submission
      console.log("Form submitted:", formData);
      if (props.formData?.name != undefined) {
        let reqBody = {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        };
        const response = await fetch(
          baseUrl + "/product/" + props.formData._id,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reqBody),
          }
        );
        console.log(response);
      } else {
        let reqBody = {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        };
        const response = await fetch(baseUrl + "/product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        });
        console.log(response);
      }
    }
    setFormData({
      name: "",
      price: "",
      stock: "",
      description: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className={`form-control ${errors.name && "is-invalid"}`}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.name}</div>
        </div>
        <div className="row">
          <div className="mb-3 col-md-6">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className={`form-control ${errors.price && "is-invalid"}`}
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.price}</div>
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              className={`form-control ${errors.stock && "is-invalid"}`}
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.stock}</div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description">Description</label>
          <textarea
            className={`form-control ${errors.description && "is-invalid"}`}
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.description}</div>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto mt-2 mb-5">
          <button type="submit" className="btn btn-outline-info">
            {props.formData?.name ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
