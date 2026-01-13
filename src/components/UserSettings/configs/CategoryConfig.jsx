import React, { useEffect, useState } from "react";
import CreateCategoryCard from "../../category/CreateCategoryCard";
import CategoryCard from "../../category/CategoryCard";
import { createCategory, getCategories, removeCategory } from "../../../functions/Categories";

export default function CategoryConfig() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null); // single image
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await getCategories();
    setCategories(data);
  };

  // Handle category creation
  const handleCreate = async () => {
    if (!category.trim()) return alert("Nom requis");

    setLoading(true);
    try {
      await createCategory({
        name: category,
        imageFile: selectedMedia?.file || null,
      });

      // Reset state
      setCategory("");
      setSelectedMedia(null);
      fetchCategories();
    } catch (err) {
      console.error("Category creation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle image selection
  const handleCategoryImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    const mediaItem = {
      src: previewUrl,
      type: file.type.startsWith("video") ? "video" : "image",
      file, // keep the actual file for submit
    };

    setSelectedMedia(mediaItem);
    e.target.value = ""; // allow re-upload of same file if needed
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette catégorie ?")) return;
    await removeCategory(id);
    fetchCategories();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {/* Create new category */}
        <CreateCategoryCard
          name={category}
          setName={setCategory}
          selectedMedia={selectedMedia}
          setSelectedMedia={setSelectedMedia}
          onAddMedia={handleCategoryImageUpload}
          onDeleteMedia={() => setSelectedMedia(null)}
          onSubmit={handleCreate}
          loading={loading}
        />

        {/* Existing categories */}
        {categories.map((cat) => (
          <CategoryCard
            key={cat._id}
            category={cat}
            onDelete={() => handleDelete(cat._id)}
          />
        ))}
      </div>
    </div>
  );
}
