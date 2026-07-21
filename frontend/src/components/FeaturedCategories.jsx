import React, { useEffect, useState } from "react";
import * as categoryService from "../services/categoryService";
import ErrorState from "./ErrorState";
import { SearchX, XCircle } from "lucide-react";
import CategoryCard from "./CategoryCard";
import CategorySkeleton from "./CategorySkeleton";
import EmptyState from "./EmptyState";
import SectionHeader from "./SectionHeader";
function FeaturedCategories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await categoryService.getCategories();
      setCategories(response.data?.categories || []);
    } catch (error) {
      setError(
        error.response?.data.message ||
          "Something went wrong  please try later",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const featuredCategories = categories.slice(0, 8);

  if (loading) {
    return (
      <div className="  bg-slate-950 px-12 py-12  ">
        <SectionHeader
          badge="Categories"
          title="Browse by Category"
          subtitle="Choose a category and discover trusted professionals near you."
        />
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <CategorySkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="  bg-slate-950 py-10  px-12 ">
        <ErrorState
          icon={<XCircle />}
          title="Something went wrong"
          description={error}
          onRetry={fetchCategories}
        />
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="  bg-slate-950 py-10  px-12 ">
        <EmptyState
          icon={<SearchX />}
          title="No categories found"
          description="There are no categories available at the moment."
          actionLabel="Browse Services"
          actionLink="/services"
        />
      </div>
    );
  }

  return (
    <div className="  bg-slate-950   px-12 py-12 ">
      <SectionHeader
        badge="Categories"
        title="Browse by Category"
        subtitle="Choose a category and discover trusted professionals near you."
      />
      <div
        className="grid gap-8 grid-cols-2
md:grid-cols-3
lg:grid-cols-4
"
      >
        {featuredCategories.map((category) => {
          return <CategoryCard category={category} key={category.id} />;
        })}
      </div>
    </div>
  );
}

export default FeaturedCategories;
