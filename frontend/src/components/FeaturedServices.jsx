// 1. Fetch services
// 2. Display loading
// 3. Display error
// // 4. Display empty state
// 5. Display services
//   Loading? -> Skeleton Cards -> Error? ->Error State -> Empty? -> EmptyState -> Success -> Service Cards

import React, { useEffect, useState } from "react";
import * as serviceService from "../services/serviceService";
import SkeletonCard from "./SkeletonCard";
import EmptyState from "./EmptyState";
import { SearchX, XCircle } from "lucide-react";
import ServiceCard from "./ServiceCard";
import ErrorState from "./ErrorState";
import SectionHeader from "./SectionHeader";

function FeaturedServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await serviceService.getServices();

      setServices(response.data?.services || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong please try later",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const featuredServices = services.slice(0, 8);

  return (
    <div className="  bg-slate-950 py-12  px-12 ">
      {loading && (
        <div>
          <SectionHeader
            badge="Popular"
            title="Most Requested Services"
            subtitle="These services are the most requested by our customers."
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-12  px-12 ">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      )}

      {services.length === 0 && loading === false && error === null && (
        <EmptyState
          icon={<SearchX />}
          title="No services found"
          description="There are no services available at the moment."
          actionLabel="Browse Categories"
          actionLink="/categories"
        />
      )}

      {featuredServices.length > 0 && (
        <div>
          <SectionHeader
            badge="Popular"
            title="Most Requested Services"
            subtitle="These services are the most requested by our customers."
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  py-12  px-12 ">
            {featuredServices.map((service) => {
              return <ServiceCard service={service} key={service.id} />;
            })}
          </div>
        </div>
      )}
      {error && (
        <ErrorState
          icon={<XCircle />}
          title="Something went wrong"
          description={error}
          onRetry={fetchServices}
        />
      )}
    </div>
  );
}

export default FeaturedServices;
