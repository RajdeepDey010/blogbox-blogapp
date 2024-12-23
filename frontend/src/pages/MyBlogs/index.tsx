import { useBlogApi } from "@/api/blog/hook"
import BlogCard from "@/components/BlogCard"
import Loading from "@/components/Loading"
import MainLayout from "@/MainLayout"
import { useUserStore } from "@/stores/UserStore"
import { useEffect } from "react"

const MyBlogs = () => {
  const { userPosts, getAllPostsForUser, loading } = useBlogApi()
  const { user } = useUserStore()
  useEffect(() => {
    if (user) {
      getAllPostsForUser(user.id)
    }
  }, [user])
  return (
    <MainLayout>
      <>{loading && <Loading />}</>
      <div className="my-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {userPosts.map(item => <BlogCard key={item.id} blog={item} />)}
        </div>
      </div>
    </MainLayout>
  )
}

export default MyBlogs
