import { useQuery } from "@tanstack/react-query";
import axios from "axios";


function useProduct(id) {
  return useQuery({
    queryKey: ["product",id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/shoes/${id}`);
      return response.data;
    },
    enabled : !!id,
  });
}

export default useProduct;
