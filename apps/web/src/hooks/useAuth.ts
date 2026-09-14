import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; 
import { authService } from "../services/auth.service";

export function useAuth() {
    return useQuery({
        queryKey: ["auth", "me"],
        queryFn: authService.me,
        retry: false,
    });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["auth", "me"],
      });
    },
  });
}