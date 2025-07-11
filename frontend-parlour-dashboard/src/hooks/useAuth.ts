/* eslint-disable @typescript-eslint/no-explicit-any */
import { disconnectSocket, initSocket } from "@/lib/Socket";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

const PORT = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4444/api';
let socket: Socket | null = null;

const fetchUser = async () => {
  const user = localStorage.getItem("loggedUser");
  if (!user) throw new Error("user not found");

  return JSON.parse(user);
};


export const useAuth = () => {
    
    const router = useRouter();
  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchUser,
  });

    useEffect(() => {
    if (user && (!socket || !socket.connected)) {
      console.log(user._id, "userID");
      socket = initSocket(user._id);
      socket.connect();

    }
  }, [user]);
  const loginMutation = useMutation({
    mutationFn: async (formData: { email: string; password: string }) => {
    
        console.log(PORT)
        const res = await axios.post(`${PORT}/user/login`,formData)
        if(res){
            localStorage.setItem("loggedUser", JSON.stringify(res.data.user));
            localStorage.setItem("token", JSON.stringify(res.data.token));
            alert('user logged in')
            router.push('/dashboard');
        }
      return res.data.user;
    },
    onSuccess: (user) => {
    
      queryClient.setQueryData(["authUser"], user);
     
    },
    onError: (err: any) => {
      alert(err.response?.data?.message || "Login failed");
    },
  });

  // 🔹 Logout Mutation
  const logout = async() => {
       const res = await axios.post(`${PORT}/user/logout`,)
        console.log(res,'logout');
        if (socket) {
        disconnectSocket();
      }
        if(res){
             queryClient.setQueryData(["authUser"], '');
             localStorage.removeItem("loggedUser");
             localStorage.removeItem("token");
            alert('user logged out')
            router.push('/');
        }
        
      return;
    
  };

  return {   
    loginMutation,
    logout ,
    user,
    isLoading,
    isError
  };
};
