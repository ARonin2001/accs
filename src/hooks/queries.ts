import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "../api";

export class Queries {
  private static API_URL: string = import.meta.env.VITE_API;

  static get<T>(api: string, queryKey: string[] = []) {
    return useQuery({
      queryKey,
      queryFn: async () => {
        const response = await instance.get<T>(this.API_URL + api);
        return response.data;
      },
    });
  }

  static getMutationPost<P, G>(api: string) {
    return useMutation({
      mutationFn: async (value: P) => {
        const response = await instance.post<G>(this.API_URL + api, value);
        return response.data;
      },
    });
  }
}
