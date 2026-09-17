"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { uploadToImgBB } from './../../../utils/uploadImage';


const API_URL = "https://arnab-backend.vercel.app";

const emptyForm = {
  category: "",
  categoryTitle: "",
  priceText: "",
  description: "",
  features: [""],
  beforeImage: "",
  afterImage: "",
  isFeatured: false,
};

function Dashboard({ onLogout }) {
  const [services, setServices] = useState([]);

  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");

  // =====================================================
  // CATEGORY STATES
  // =====================================================

  const [categories, setCategories] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // =====================================================
  // IMAGE UPLOAD STATES
  // =====================================================

  const [beforeUploading, setBeforeUploading] = useState(false);
  const [afterUploading, setAfterUploading] = useState(false);

  // =====================================================
  // GET SERVICES
  // =====================================================

  const fetchServices = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_URL}/api/services`);

      setServices(res.data);
    } catch (error) {
      console.error(error);

      setMessage("❌ Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // GET CATEGORIES
  // =====================================================

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/services/categories`
      );

      const data = Array.isArray(res.data) ? res.data : [];

      setCategories(data);
    } catch (error) {
      console.error("Category fetch error:", error);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, []);

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredServices = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return services;
    }

    return services.filter((service) => {
      return (
        service.category?.toLowerCase().includes(keyword) ||
        service.categoryTitle?.toLowerCase().includes(keyword)
      );
    });
  }, [services, search]);

  // =====================================================
  // FILTERED CATEGORIES
  // =====================================================

  const filteredCategories = useMemo(() => {
    const keyword = form.category.trim().toLowerCase();

    if (!keyword) {
      return categories;
    }

    return categories.filter((category) =>
      category.toLowerCase().includes(keyword)
    );
  }, [categories, form.category]);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =====================================================
  // FEATURE CHANGE
  // =====================================================

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...form.features];

    updatedFeatures[index] = value;

    setForm((prev) => ({
      ...prev,
      features: updatedFeatures,
    }));
  };

  // =====================================================
  // ADD FEATURE
  // =====================================================

  const addFeature = () => {
    setForm((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  // =====================================================
  // REMOVE FEATURE
  // =====================================================

  const removeFeature = (index) => {
    if (form.features.length === 1) {
      setForm({
        ...form,
        features: [""],
      });

      return;
    }

    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setMessage("");
    setShowCategoryDropdown(false);
  };

  // =====================================================
  // EDIT SERVICE
  // =====================================================

  const handleEdit = (service) => {
    setEditingId(service.id);

    setForm({
      category: service.category || "",
      categoryTitle: service.categoryTitle || "",
      priceText: service.priceText || "",
      description: service.description || "",
      features:
        Array.isArray(service.features) &&
        service.features.length > 0
          ? service.features
          : [""],
      beforeImage: service.beforeImage || "",
      afterImage: service.afterImage || "",
      isFeatured: service.isFeatured === true,
    });

    setShowCategoryDropdown(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // BEFORE IMAGE UPLOAD
  // =====================================================

  const handleBeforeImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setBeforeUploading(true);
      setMessage("");

      const imageUrl = await uploadToImgBB(file);

      if (imageUrl) {
        setForm((prev) => ({
          ...prev,
          beforeImage: imageUrl,
        }));

        setMessage("✅ Before image uploaded successfully");
      }
    } catch (error) {
      console.error("Before image upload error:", error);

      setMessage("❌ Before image upload failed");
    } finally {
      setBeforeUploading(false);

      e.target.value = "";
    }
  };

  // =====================================================
  // AFTER IMAGE UPLOAD
  // =====================================================

  const handleAfterImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setAfterUploading(true);
      setMessage("");

      const imageUrl = await uploadToImgBB(file);

      if (imageUrl) {
        setForm((prev) => ({
          ...prev,
          afterImage: imageUrl,
        }));

        setMessage("✅ After image uploaded successfully");
      }
    } catch (error) {
      console.error("After image upload error:", error);

      setMessage("❌ After image upload failed");
    } finally {
      setAfterUploading(false);

      e.target.value = "";
    }
  };

  // =====================================================
  // SAVE SERVICE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.category.trim()) {
      setMessage("❌ Category is required");
      return;
    }

    if (!form.categoryTitle.trim()) {
      setMessage("❌ Category Title is required");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const cleanedFeatures = form.features
        .map((item) => item.trim())
        .filter(Boolean);

      const data = {
        category: form.category.trim(),
        categoryTitle: form.categoryTitle,
        priceText: form.priceText,
        description: form.description,
        features: cleanedFeatures,
        beforeImage: form.beforeImage,
        afterImage: form.afterImage,
        isFeatured: form.isFeatured,
      };

      if (editingId) {
        await axios.put(
          `${API_URL}/api/services/${editingId}`,
          data
        );

        setMessage("✅ Service updated successfully");
      } else {
        await axios.post(`${API_URL}/api/services`, data);

        setMessage("✅ Service created successfully");
      }

      resetForm();

      await fetchServices();
      await fetchCategories();
    } catch (error) {
      console.error(error);

      setMessage(
        error?.response?.data?.message ||
          "❌ Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/api/services/${id}`);

      setMessage("✅ Service deleted successfully");

      await fetchServices();
      await fetchCategories();
    } catch (error) {
      console.error(error);

      setMessage("❌ Failed to delete service");
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
<div className="sticky top-0 z-30 bg-white border-b shadow-sm">
  <div className="flex flex-col gap-3 px-4 py-4 mx-auto max-w-7xl sm:flex-row sm:items-center sm:justify-between">

    <div>
      <h1 className="text-2xl font-bold text-gray-800">
        Admin Dashboard
      </h1>

      <p className="text-sm text-gray-500">
        Manage Photo Editing Services
      </p>
    </div>

    <div className="flex items-center gap-3">

      {/* Header Video Manage */}
      <button
        onClick={() => {
          window.location.href = "/headerVideoManage";
        }}
        className="px-5 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Header Image Manage
      </button>
      {/* Header Video Manage */}
      <button
        onClick={() => {
          window.location.href = "/about";
        }}
        className="px-5 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        About Section Manage
      </button>
      <button
        onClick={() => {
          window.location.href = "/socialicon";
        }}
        className="px-5 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Icon Manage
      </button>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="px-5 py-2 font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>

      <button
  onClick={() => {
    window.location.href = "/";
  }}
  className="flex items-center gap-2 px-5 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>

  Go to Home
</button>

    </div>

  </div>
</div>

      <main className="px-4 py-8 mx-auto max-w-7xl">

        {/* MESSAGE */}
        {message && (
          <div className="p-4 mb-6 font-medium bg-white border rounded-lg shadow-sm">
            {message}
          </div>
        )}

        {/* ================================================= */}
        {/* FORM */}
        {/* ================================================= */}

        <div className="p-6 mb-8 bg-white rounded-xl shadow">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {editingId
                  ? "Edit Service"
                  : "Add New Service"}
              </h2>

              <p className="text-sm text-gray-500">
                Enter all service information below
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel Edit
              </button>
            )}

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* CATEGORY + TITLE */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* CATEGORY */}

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Category
                </label>

                <div className="relative">

                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={(e) => {
                      handleChange(e);
                      setShowCategoryDropdown(true);
                    }}
                    onFocus={() => {
                      setShowCategoryDropdown(true);
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        setShowCategoryDropdown(false);
                      }, 150);
                    }}
                    placeholder="portrait"
                    autoComplete="off"
                    className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  {showCategoryDropdown && (
                    <div className="absolute left-0 right-0 z-50 mt-1 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg max-h-52">

                      {filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                          <button
                            key={category}
                            type="button"
                            onMouseDown={(e) => {
                              e.preventDefault();
                            }}
                            onClick={() => {
                              setForm((prev) => ({
                                ...prev,
                                category: category,
                              }));

                              setShowCategoryDropdown(false);
                            }}
                            className="block w-full px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          >
                            {category}
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-xs text-gray-400">
                          No existing category
                        </div>
                      )}

                    </div>
                  )}

                </div>

                <p className="mt-1 text-xs text-gray-400">
                  Click to select existing category or type a new one
                </p>
              </div>

              {/* CATEGORY TITLE */}

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Category Title / Name
                </label>

                <input
                  type="text"
                  name="categoryTitle"
                  value={form.categoryTitle}
                  onChange={handleChange}
                  placeholder="Portrait Photo Editing"
                  className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

            </div>

            {/* PRICE */}

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Price Text
              </label>

              <input
                type="text"
                name="priceText"
                value={form.priceText}
                onChange={handleChange}
                placeholder="Only $6 per photo."
                className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* DESCRIPTION */}

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                placeholder="Write service description..."
                className="w-full px-4 py-3 border rounded-lg outline-none resize-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* FEATURES */}

            <div>

              <div className="flex items-center justify-between mb-3">

                <label className="text-sm font-semibold text-gray-700">
                  Features
                </label>

                <button
                  type="button"
                  onClick={addFeature}
                  className="px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  + Add Feature
                </button>

              </div>

              <div className="space-y-3">

                {form.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex gap-2"
                  >

                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        handleFeatureChange(
                          index,
                          e.target.value
                        )
                      }
                      placeholder={`Feature ${index + 1}`}
                      className="flex-1 px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeFeature(index)
                      }
                      className="px-4 text-white bg-red-500 rounded-lg hover:bg-red-600"
                    >
                      ×
                    </button>

                  </div>
                ))}

              </div>

            </div>

            {/* ================================================= */}
            {/* IMAGES */}
            {/* ================================================= */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* BEFORE IMAGE */}

              <div>

                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Before Image
                </label>

                <label
                  className={`inline-block px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg ${
                    beforeUploading
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-blue-600"
                  }`}
                >
                  {beforeUploading
                    ? "Uploading..."
                    : "Browse Image"}

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    disabled={beforeUploading}
                    onChange={handleBeforeImageUpload}
                  />
                </label>

                {form.beforeImage && (
                  <div className="relative mt-3">

                    <img
                      src={form.beforeImage}
                      alt="Before Preview"
                      className="object-cover w-full h-40 rounded-lg"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          beforeImage: "",
                        }))
                      }
                      className="absolute px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-lg top-2 right-2 hover:bg-red-600"
                    >
                      Remove
                    </button>

                  </div>
                )}

              </div>

              {/* AFTER IMAGE */}

              <div>

                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  After Image
                </label>

                <label
                  className={`inline-block px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg ${
                    afterUploading
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-green-600"
                  }`}
                >
                  {afterUploading
                    ? "Uploading..."
                    : "Browse Image"}

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    disabled={afterUploading}
                    onChange={handleAfterImageUpload}
                  />
                </label>

                {form.afterImage && (
                  <div className="relative mt-3">

                    <img
                      src={form.afterImage}
                      alt="After Preview"
                      className="object-cover w-full h-40 rounded-lg"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          afterImage: "",
                        }))
                      }
                      className="absolute px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-lg top-2 right-2 hover:bg-red-600"
                    >
                      Remove
                    </button>

                  </div>
                )}

              </div>

            </div>

            {/* FEATURED */}

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">

              <input
                type="checkbox"
                name="isFeatured"
                checked={form.isFeatured}
                onChange={handleChange}
                className="w-5 h-5"
              />

              <div>
                <p className="font-semibold text-gray-800">
                  Featured Service
                </p>

                <p className="text-xs text-gray-500">
                  Only one service per category can be featured.
                </p>
              </div>

            </div>

            {/* BUTTONS */}

            <div className="flex flex-col gap-3 sm:flex-row">

              <button
                type="submit"
                disabled={
                  saving ||
                  beforeUploading ||
                  afterUploading
                }
                className="px-6 py-3 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Service"
                  : "Add Service"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              )}

            </div>

          </form>
        </div>

        {/* ================================================= */}
        {/* SERVICE LIST */}
        {/* ================================================= */}

        <div className="p-6 bg-white rounded-xl shadow">

          <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                All Services
              </h2>

              <p className="text-sm text-gray-500">
                Total: {services.length} services
              </p>
            </div>

            {/* SEARCH */}

            <div className="w-full lg:w-96">

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by category or name..."
                className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              />

            </div>

          </div>

          {/* LOADING */}

          {loading ? (
            <div className="py-12 text-center">

              <p className="text-gray-500">
                Loading services...
              </p>

            </div>
          ) : filteredServices.length === 0 ? (
            <div className="py-12 text-center">

              <p className="text-gray-500">
                No services found.
              </p>

            </div>
          ) : (
            <div className="space-y-5">

              {filteredServices.map((service) => (

                <div
                  key={service.id}
                  className="overflow-hidden border rounded-xl"
                >

                  {/* TOP */}

                  <div className="flex flex-col gap-4 p-5 bg-gray-50 lg:flex-row lg:items-start lg:justify-between">

                    <div>

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="text-lg font-bold text-gray-800">
                          {service.categoryTitle}
                        </h3>

                        {service.isFeatured && (
                          <span className="px-2 py-1 text-xs font-bold text-white bg-yellow-500 rounded">
                            FEATURED
                          </span>
                        )}

                      </div>

                      <p className="mt-1 text-sm text-gray-500">
                        Category:{" "}
                        <span className="font-medium text-gray-700">
                          {service.category}
                        </span>
                      </p>

                      <p className="mt-1 font-semibold text-green-600">
                        {service.priceText}
                      </p>

                    </div>

                    {/* ACTIONS */}

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          handleEdit(service)
                        }
                        className="px-4 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(service.id)
                        }
                        className="px-4 py-2 font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                  {/* BODY */}

                  <div className="p-5">

                    {/* IMAGES */}

                    <div className="grid grid-cols-1 gap-4 mb-5 md:grid-cols-2">

                      {service.beforeImage && (
                        <div>

                          <p className="mb-2 text-sm font-semibold text-gray-600">
                            Before Image
                          </p>

                          <img
                            src={service.beforeImage}
                            alt="Before"
                            className="object-cover w-full h-52 rounded-lg"
                          />

                        </div>
                      )}

                      {service.afterImage && (
                        <div>

                          <p className="mb-2 text-sm font-semibold text-gray-600">
                            After Image
                          </p>

                          <img
                            src={service.afterImage}
                            alt="After"
                            className="object-cover w-full h-52 rounded-lg"
                          />

                        </div>
                      )}

                    </div>

                    {/* DESCRIPTION */}

                    <div className="mb-5">

                      <h4 className="mb-2 font-semibold text-gray-700">
                        Description
                      </h4>

                      <p className="text-sm leading-6 text-gray-600">
                        {service.description}
                      </p>

                    </div>

                    {/* FEATURES */}

                    <div>

                      <h4 className="mb-2 font-semibold text-gray-700">
                        Features
                      </h4>

                      <div className="flex flex-wrap gap-2">

                        {service.features?.map(
                          (feature, index) => (
                            <span
                              key={index}
                              className="px-3 py-2 text-sm bg-gray-100 rounded-lg"
                            >
                              {feature}
                            </span>
                          )
                        )}

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

      </main>
    </div>
  );
}

export default Dashboard;