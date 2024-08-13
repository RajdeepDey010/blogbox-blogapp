import { useUserStore } from "@/stores/UserStore";
import { useState } from "react";
import { ILoginRequest, ISignupRequest, IUser } from "../types";
import axios from 'axios'
import { basurl } from "@/config/config";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router";
import { errorHandler } from "@/lib/utils";

export function useAuthApi() {
  const { setUser } = useUserStore()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  async function login(payload: ILoginRequest) {
    setLoading(true)
    try {
      const res = await axios.post<IUser>(basurl + 'login', payload)
      console.log(res)
      if (Object.keys(res.data).length) {
        localStorage.setItem("token", res.data.token as string)
        localStorage.setItem("email", res.data.email)
        setUser(res.data)
        navigate('/myblogs')
      }
    } catch (error) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Error",
        description: errorHandler(error)
      });
    } finally {
      setLoading(false)
    }
  }

  async function signup(payload: ISignupRequest) {
    setLoading(true)
    try {
      const res = await axios.post<IUser>(basurl + 'register', payload)
      if (Object.keys(res.data).length) {
        localStorage.setItem("token", res.data.token as string)
        localStorage.setItem("email", res.data.email)
        setUser(res.data)
        navigate('/myblogs')
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: errorHandler(error),
      });
    } finally {
      setLoading(false)
    }
  }

  async function getUser(email: string) {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post<IUser>(basurl + 'getUser', { email: email }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUser({ ...res.data, token: token as string })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: errorHandler(error),
      });
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    localStorage.clear()
    setUser(null)
  }

  return {
    login,
    signup,
    getUser,
    logout,
    loading
  }
}