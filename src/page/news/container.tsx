import { useState } from "react";
import { DataProps, useAppContext } from "../../context/AppContext";
import NewsView from "./view";

const NewsContainer = () => {
  const { updateData } = useAppContext();
  const [itemSelected, setItemSelected] = useState<DataProps | null>(null);

  const handleOnSave = () => {
    updateData((prev) =>
      prev?.filter((filter) => filter.id !== itemSelected?.id)
    );
  };

  return (
    <NewsView
      handleOnSave={handleOnSave}
      itemSelected={itemSelected}
      setItemSelected={setItemSelected}
    />
  );
};

export default NewsContainer;
