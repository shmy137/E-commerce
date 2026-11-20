import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import React from "react";

function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/shoes");
      return response.data;
    },
  });
}

export default useProducts;
