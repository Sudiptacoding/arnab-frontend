"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Button, Drawer } from "antd";
import {
  DownOutlined,
  MenuOutlined,
  UserOutlined,
  RightOutlined,
} from "@ant-design/icons";

const API_URL = "https://arnab-backend.vercel.app";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // ===============================
  // GET SERVICES & CREATE CATEGORIES
  // ===============================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const res = await axios.get(`${API_URL}/api/services`);
        const services = Array.isArray(res.data) ? res.data : [];

        const categoryMap = new Map();
        services.forEach((service) => {
          const category = service.category?.trim();
          if (category && !categoryMap.has(category)) {
            categoryMap.set(category, {
              category,
              beforeImage: service.beforeImage,
              categoryTitle: service.categoryTitle,
            });
          }
        });

        setCategories(Array.from(categoryMap.values()));
      } catch (error) {
        console.error("CATEGORY FETCH ERROR:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // ===============================
  // SLUG CREATE
  // ===============================
  const createSlug = (category) => {
    return encodeURIComponent(
      category
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
    );
  };

  // Smooth scroll and close drawer handler
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    setOpen(false);
    
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">

        {/* ================= LOGO ================= */}
        <Link
          href="/"
          onClick={(e) => handleScrollTo(e, "top")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="bg-amber-500 text-white font-extrabold px-2 py-1 rounded text-xl">
            Fix
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-xl font-black text-black tracking-wider">
              Best choice
            </span>
            <span className="text-[10px] text-gray-500 font-semibold tracking-widest">
             PHOTOSHOP SINCE 2018
            </span>
          </div>
        </Link>

        {/* ================= DESKTOP MENU ================= */}
        <nav className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">

          <a
            href="#top"
            onClick={(e) => handleScrollTo(e, "top")}
            className="hover:text-amber-500 cursor-pointer"
          >
            Home
          </a>

          {/* ================= SERVICES ================= */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 hover:text-amber-500 py-7"
            >
              Services
              <DownOutlined className="text-[10px]" />
            </button>

            {/* CATEGORY MEGA MENU */}
            {servicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[850px] bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 z-[100]">
                {loadingCategories ? (
                  <div className="py-10 text-center text-gray-400">
                    Loading categories...
                  </div>
                ) : categories.length === 0 ? (
                  <div className="py-10 text-center text-gray-400">
                    No categories found
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-5">
                    {categories.map((item) => (
                      <Link
                        key={item.category}
                        href={`/category/${createSlug(item.category)}`}
                        onClick={() => setServicesOpen(false)}
                        className="group"
                      >
                        <div className="rounded-xl overflow-hidden bg-gray-100 border border-gray-200 hover:border-amber-500 transition-all duration-300">
                          <div className="relative w-full h-36 overflow-hidden bg-gray-200">
                            {item.beforeImage ? (
                              <img
                                src={item.beforeImage}
                                alt={item.category}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                No Image
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
                          </div>
                          <div className="p-3">
                            <h3 className="text-sm font-bold text-gray-800 group-hover:text-amber-500 transition-colors capitalize">
                              {item.category}
                            </h3>
                            {item.categoryTitle && (
                              <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                                {item.categoryTitle}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <a
            href="#about"
            onClick={(e) => handleScrollTo(e, "about")}
            className="hover:text-amber-500 cursor-pointer"
          >
            About Us
          </a>

          <a
            href="#services"
            onClick={(e) => handleScrollTo(e, "services")}
            className="hover:text-amber-500 cursor-pointer"
          >
            We Provide
          </a>



          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "contact")}
            className="hover:text-amber-500 cursor-pointer"
          >
            Contact Us
          </a>
        </nav>

        {/* ================= ACTION BUTTONS ================= */}
<div className="hidden lg:flex items-center gap-3">
  {/* "Get a Quote" (11 chars) -> "Free Sample" (11 chars) */}
  <Button
    size="large"
    className="!rounded-full !border-amber-500 !text-amber-500 font-semibold"
  >
    Free Sample
  </Button>

  {/* "Try for Free" (12 chars) -> "Order Retouch" (13 chars) */}
  <Button
    size="large"
    type="primary"
    className="!rounded-full !bg-amber-500 font-semibold border-none hover:!bg-amber-600"
  >
    Order Retouch
  </Button>

  <button className="flex items-center gap-1 text-gray-600 ml-2 hover:text-amber-500">
    <UserOutlined className="text-xl" />
    <DownOutlined className="text-[10px]" />
  </button>
</div>

        {/* ================= MOBILE MENU TRIGGER ================= */}
        <button
          className="lg:hidden text-2xl text-gray-700"
          onClick={() => setOpen(true)}
        >
          <MenuOutlined />
        </button>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      <Drawer
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        <div className="flex flex-col gap-4 font-semibold text-base text-gray-800">

          <a
            href="#top"
            onClick={(e) => handleScrollTo(e, "top")}
            className="text-amber-500 py-1"
          >
            Home
          </a>

          {/* Mobile Accordion Services */}
          <div className="border-y border-gray-100 py-2">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between py-1 text-gray-800 hover:text-amber-500"
            >
              <span>Services</span>
              <DownOutlined
                className={`text-xs transition-transform duration-300 ${
                  mobileServicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Click to Toggle Services Submenu */}
            {mobileServicesOpen && (
              <div className="flex flex-col gap-3 pt-3 pl-2 transition-all">
                {loadingCategories ? (
                  <p className="text-xs text-gray-400">Loading...</p>
                ) : categories.length === 0 ? (
                  <p className="text-xs text-gray-400">No categories found</p>
                ) : (
                  categories.map((item) => (
                    <Link
                      key={item.category}
                      href={`/category/${createSlug(item.category)}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-amber-50 text-gray-700 hover:text-amber-600"
                    >
                      {item.beforeImage ? (
                        <img
                          src={item.beforeImage}
                          alt={item.category}
                          className="w-10 h-10 rounded-md object-cover border"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">
                          N/A
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="capitalize font-bold text-sm">
                          {item.category}
                        </span>
                        {item.categoryTitle && (
                          <span className="text-[10px] text-gray-400 line-clamp-1">
                            {item.categoryTitle}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          <a
            href="#about"
            onClick={(e) => handleScrollTo(e, "about")}
            className="py-1 hover:text-amber-500"
          >
            About Us
          </a>

          <a
            href="#services"
            onClick={(e) => handleScrollTo(e, "services")}
            className="py-1 hover:text-amber-500"
          >
            We Provide
          </a>



          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "contact")}
            className="py-1 hover:text-amber-500"
          >
            Contact Us
          </a>

          <div className="flex flex-col gap-3 mt-6">
            <Button
              size="large"
              className="!rounded-full !border-amber-500 !text-amber-500 font-semibold"
            >
              Free Sample
            </Button>

            <Button
              size="large"
              type="primary"
              className="!rounded-full !bg-amber-500 font-semibold"
            >
              Order Retouch
            </Button>
          </div>
        </div>
      </Drawer>
    </header>
  );
}