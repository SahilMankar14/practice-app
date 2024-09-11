import axios from "axios";
import React, { useEffect, useState } from "react";

const useResInfo = ({ id = 757874 }) => {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id) => {
    try {
      console.log("ID:", id);
      const data = await axios.get(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.100706&lng=79.0736323&restaurantId=${id}`
      );
      console.log(data);
      setMenu(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};

export default useResInfo;
