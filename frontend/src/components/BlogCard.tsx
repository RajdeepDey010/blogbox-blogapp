import { IPost } from '@/api/types'
import { useCurrentBlogStore } from '@/stores/CurrentBlog'
import { useNavigate } from 'react-router-dom'
import path from '../asset/volie.jpg'

function BlogCard({ blog }: { blog: IPost }) {
  const { setCurrentBlog } = useCurrentBlogStore()
  const navigate = useNavigate()
  return (
    <div onClick={() => {
      setCurrentBlog(blog)
      navigate('/blogpage')
    }} className="cursor-pointer">
      <div className="bg-white border border-gray-300 shadow-md rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-lg duration-300">
        <img
          className="h-48 w-full object-cover md:h-fit md:max-w-full"
          src={path}
          alt='Volie Bot'
        />
        <h2 className="text-xl font-semibold mb-4">{blog.title}</h2>
        <p>{blog.content.substring(0, 50)} ...</p>
        <div className="absolute bottom-2 right-2 text-right">
          <p className="italic text-gray-600">By: {blog.firstName}</p>
        </div>
      </div>
    </div>
  )
}

export default BlogCard