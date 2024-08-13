import { useState } from "react";
import { ICreatePostRequest, IEditPostRequest, IPost } from "../types";
import axios, { AxiosError } from 'axios'
import { basurl } from "@/config/config";
import { toast } from "@/components/ui/use-toast";
import { errorHandler } from "@/lib/utils";

export function useBlogApi() {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState<IPost[]>([])
  const [userPosts, setUserPosts] = useState<IPost[]>([])

  async function createPost(payload: ICreatePostRequest) {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post<IPost>(basurl+'createpost', payload,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast({
        variant: "default",
        title: "Success",
        description: "Blog created",
      });
      return res.data;
    } catch (error) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Error",
        description: errorHandler(error),
      });
    } finally {
      setLoading(false)
    }
  }

  async function getAllPosts() {
    setLoading(true)
    try {
      const res = await axios.get<IPost[]>(basurl+'allpost')
      setPosts(res.data)
    } catch (error) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Error",
        description: errorHandler(error),
      });
    } finally {
      setLoading(false)
    }
  }

  async function getAllPostsForUser(userId: string) {
    setLoading(true)
    const token = localStorage.getItem('token')
    try {
      const res = await axios.get<IPost[]>(basurl+`userpost/${userId}/posts`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUserPosts(res.data)
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

  async function editPost(payload: IEditPostRequest) {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await axios.put<IPost>(basurl+'editpost', payload,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data;
    } catch (error) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Error",
        description: (error as AxiosError).response?.data as string,
      });
    } finally {
      setLoading(false)
    }
  }

  async function deletePost(userId: string, postId: string) {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await axios.delete(basurl+`/delpost/${userId}/posts/${postId}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data;
    } catch (error) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Error",
        description: (error as AxiosError).response?.data as string,
      });
    } finally {
      setLoading(false)
    }
  }

  return {
    posts,
    userPosts,
    loading,
    createPost,
    getAllPosts,
    getAllPostsForUser,
    editPost,
    deletePost
  }
}