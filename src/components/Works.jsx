"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Card, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const categories = ["All", "Web Design", "Development", "App"];

export default function Works() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(3);

  // Fetching data with TanStack Query
  const { data: works = [], isLoading, isError } = useQuery({
    queryKey: ['works', activeCategory],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/api/works?category=${activeCategory}`);
      return res.data;
    }
  });

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setVisibleCount(3); // Reset count on category change
  };

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center mb-10">My Works</h2>
        
        {/* Categories */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {categories.map((cat) => (
            <Button 
              key={cat} 
              type={activeCategory === cat ? "primary" : "default"}
              onClick={() => handleCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="text-center py-10">
            <Spin size="large" />
          </div>
        )}

        {isError && (
          <div className="text-center text-red-500 py-10">
            Failed to load data from server!
          </div>
        )}

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {works.slice(0, visibleCount).map((work, index) => (
            <motion.div
              key={work._id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hoverable cover={<img alt={work.title} src={work.img || "https://placehold.co/400x300"} />}>
                <Card.Meta title={work.title} description={work.category} />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        {!isLoading && visibleCount < works.length && (
          <div className="text-center mt-10">
            <Button size="large" onClick={() => setVisibleCount(works.length)}>
              View More in {activeCategory}
            </Button>
          </div>
        )}
      </motion.div>
    </section>
  );
}