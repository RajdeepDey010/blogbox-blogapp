import { useBlogApi } from "@/api/blog/hook"
import BlogCard from "@/components/BlogCard"
import Loading from "@/components/Loading"
import MainLayout from "@/MainLayout"
import { useEffect } from "react"

function Home() {
    const {loading, posts, getAllPosts} = useBlogApi()
    useEffect(()=>{
        getAllPosts()
    },[])
    return (
        <MainLayout>
            <>{loading && <Loading />}</>
            <div className="mb-20 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {posts.map(item=>(
                    <BlogCard key={item.id} blog={item} />
                ))}                
            </div>
        </MainLayout>
    )
}

export default Home