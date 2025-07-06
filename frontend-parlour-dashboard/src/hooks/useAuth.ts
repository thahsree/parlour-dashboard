import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";



const PORT = process.env.NEXT_PUBLIC_BASE_URL;

const fetchUser = async () => {
  const user = localStorage.getItem("loggedUser");
  if (!user) throw new Error("user not found");

  return JSON.parse(user);
};

export const useAuth = () => {
  const queryClient = useQueryClient();

  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchUser,
    staleTime: Infinity,
  });

  

  const loginMutation = useMutation({
    mutationFn: async (formData: { email: string; password: string }) => {
     

      return;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["authUser"], user);
     
    },
    onError: (err: any) => {
      alert(err.response?.data?.message || "Login failed");
    },
  });

  // 🔹 Logout Mutation
  const logout = () => {
    
    
  };



  return {    
  };
};
