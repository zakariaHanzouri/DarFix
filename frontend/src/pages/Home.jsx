import EmptyState from "../components/EmptyState";
import FeaturedServices from "../components/FeaturedServices";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import SkeletonCard from "../components/SkeletonCard";
import { SearchX } from "lucide-react";

function Home() {
  return (
    <>
      <Hero />

      <FeaturedServices />
    </>
  );
}

export default Home;
