import MainLayout from "@/MainLayout"
import { useCurrentBlogStore } from "@/stores/CurrentBlog"

function BlogPage() {
  const { currentBlog } = useCurrentBlogStore()
  // const tmpDate = String(currentBlog?.createdAt);
  
  return (
    <MainLayout>
      <div className="flex flex-col items-center p-4">
        <div className="w-1/2 mx-auto mb-20">
          <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
            {currentBlog?.title}
          </h1>
          
          <p className="text-base leading-relaxed text-justify">
            {currentBlog?.content}
          </p>
        </div>
      </div>
    </MainLayout>
  )
}

export default BlogPage
