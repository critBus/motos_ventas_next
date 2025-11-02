import { api } from "@/service/api";
import type { MotorcyclesResponse } from "@/types/motorcycles.types";

export const forHome = async (): Promise<MotorcyclesResponse> => {
  const response = await api.get<MotorcyclesResponse>("motorcycles/", {
    params: {
      is_visible_in_home: true,
      ordering: "visibility_index_in_home",
      status: "active",
    },
  });
  return response.data;
};
