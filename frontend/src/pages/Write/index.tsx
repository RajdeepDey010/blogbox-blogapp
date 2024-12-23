import { useBlogApi } from "@/api/blog/hook"
import Loading from "@/components/Loading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import MainLayout from "@/MainLayout"
import { useUserStore } from "@/stores/UserStore"
import { useRef } from "react"

const Write = () => {
  const { createPost, loading } = useBlogApi()
  const { user } = useUserStore()
  const blog = useRef<{ title: string, content: string }>({ title: '', content: '' })
  const newPost = () => {
    createPost({ userId: user?.id as string, content: blog.current.content, title: blog.current.title })
  }
  return (
    <MainLayout>
      <>{loading && <Loading />}</>
      <div className="flex items-center justify-center p-4">
        <div className="w-[100%] md:w-full">
          <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              Write a Blog
            </h3>
            <Label className="block text-gray-700 text-sm font-bold mb-2">
              Title:
            </Label>
            <Input
              type="text"
              onChange={(e) => blog.current.title = e.target.value}
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <Label className="block text-gray-700 text-sm font-bold mb-2">
              Description:
            </Label>
            <Textarea
              rows={10}
              onChange={(e) => blog.current.content = e.currentTarget.value}
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            />
            <Button
              type="submit"
              onClick={newPost}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Write
