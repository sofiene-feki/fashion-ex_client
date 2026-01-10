import React, { useEffect, useState } from "react";
import CreateCategoryCard from "../../category/CreateCategoryCard";
import CategoryCard from "../../category/CategoryCard";
import { createCategory, getCategories, removeCategory } from "../../../functions/Categories";


export default function CategoryConfig() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [media, setMedia] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await getCategories();
    setCategories(data);
  };

  const handleCreate = async () => {
    if (!category.trim()) return alert("Nom requis");

    setLoading(true);
    try {
      await createCategory({
        name: category,
        media,
      });

      setCategory("");
      setMedia([]);
      setSelectedMedia(null);
      fetchCategories();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette catégorie ?")) return;
    await removeCategory(id);
    fetchCategories();
  };

  return (
    <div className="space-y-6">
      {/* Grid */}
      <div className="grid grid-cols-1   gap-4">
        {/* Create card */}
        <CreateCategoryCard
          name={category}
          setName={setCategory}
          media={media}
          selectedMedia={selectedMedia}
          setSelectedMedia={setSelectedMedia}
          onAddMedia={setMedia}
          onDeleteMedia={setMedia}
          onSubmit={handleCreate}
          loading={loading}
        />

        {/* Existing categories */}
        {categories.map((cat) => (
          <CategoryCard
            key={cat._id}
            category={cat}
            onDelete={() => handleDelete(cat._id)}
            onEdit={() => console.log("edit later")}
          />
        ))}
      </div>
    </div>
  );
}
