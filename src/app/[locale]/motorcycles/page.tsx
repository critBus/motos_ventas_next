import React from "react";
import TagBrowseMotorcyclesSection from "./_components/TagBrowseMotorcyclesSection";
import SearchSection from "./_components/SearchSection";
import InventorySection from "./_components/InventorySection";

const Page = () => {
  return (
    <div>
      <TagBrowseMotorcyclesSection />
      <SearchSection />
      <InventorySection />
    </div>
  );
};

export default Page;
