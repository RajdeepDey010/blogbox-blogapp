// import { useBlogApi } from "@/api/blog/hook"
// import Loading from "@/components/Loading"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import MainLayout from "@/MainLayout"
// import { useCurrentBlogStore } from "@/stores/CurrentBlog"
// import { useUserStore } from "@/stores/UserStore"
// import { useRef } from "react"
// import imgpath from '../../asset/blogPg.jpeg'

// function BlogPage() {
//   const { currentBlog, editBlog } = useCurrentBlogStore()
//   const { user } = useUserStore()
//   const tmpDate = String(currentBlog?.createdAt);
//   const { editPost, loading } = useBlogApi()
//   let blog = useRef<{ title: any, content: any }>({ title: currentBlog?.title, content: currentBlog?.content })
//   const newPost = () => {
//     editPost({ userId: user?.id as string, postId: editBlog?.postId as string, content: blog.current.content, title: blog.current.title })
//   }

//   return (
//     <MainLayout>
//       <>{loading && <Loading />}
//         <div className="flex flex-col items-center p-4">
//           <div className="hidden sm:block">
//             <img src={imgpath} alt="blog_thumbnail" className="h-48 w-full object-fill md:h-fit md:max-w-full" />
//           </div>
//           <div className="md:mx-60 mb-20">
//             <h1 className="sm:text-4xl text-2xl font-bold my-6  text-gray-900">
//               {currentBlog?.title}
//             </h1>

//             <p className="text-base leading-relaxed">
//               {currentBlog?.content}
//             </p>
//             <br />
//             <p className="italic font-semibold text-gray-700">{currentBlog?.firstName} - {tmpDate.substring(0, 10).split('-').reverse().join('-')}</p>
//           </div>

//           {user?.id == currentBlog?.userId && <div className="flex w-full gap-3 justify-between items-center p-4">
//             <Dialog>
//               <DialogTrigger>
//                 <Button
//                   className='p-2 bg-blue-300'
//                   variant="outline"
//                   size="icon"
//                 ><i className="fa-solid fa-pen-to-square"></i></Button>
//               </DialogTrigger>
//               <DialogContent className="md:max-w-[800px]">
//                 <DialogHeader>
//                   <DialogTitle>Edit blog</DialogTitle>
//                 </DialogHeader>
//                 <div>
//                   <Label className="block text-gray-700 text-sm font-bold mb-2">
//                     Edit Title:
//                   </Label>
//                   <Input
//                     type="text"
//                     value={blog.current.title}
//                     onChange={(e) => blog.current.title = e.target.value}
//                     className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
//                   />
//                   <Label className="block text-gray-700 text-sm font-bold mb-2">
//                     Description:
//                   </Label>
//                   <Textarea
//                     rows={10}
//                     value={blog.current.content}
//                     onChange={(e) => blog.current.content = e.currentTarget.value}
//                     className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
//                   />
//                 </div>
//                 <DialogFooter>
//                   <Button
//                     type="submit"
//                     onClick={newPost}
//                   >Save </Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog >

//             <Dialog>
//               <DialogTrigger>
//                 <Button
//                   className='p-2 bg-red-400'
//                   variant="outline"
//                   size="icon"
//                 ><i className="fa-solid fa-trash"></i></Button>
//               </DialogTrigger>
//               <DialogContent className="md:max-w-[300px]">
//                 <DialogHeader>
//                   <DialogTitle>Delete this blog?</DialogTitle>
//                 </DialogHeader>
//                 <DialogFooter>
//                   <Button
//                     type="submit"
//                     className="bg-red-500"
//                   >Yes, delete </Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog >
//           </div>}
//         </div>
//       </>

//     </MainLayout>
//   )
// }

// export default BlogPage

import { useBlogApi } from "@/api/blog/hook";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MainLayout from "@/MainLayout";
import { useCurrentBlogStore } from "@/stores/CurrentBlog";
import { useUserStore } from "@/stores/UserStore";
import { useState } from "react";
import imgpath from '../../asset/blogPg.jpeg';

function BlogPage() {
  const { currentBlog, setCurrentBlog } = useCurrentBlogStore();
  const { user } = useUserStore();
  const tmpDate = String(currentBlog?.createdAt);
  const { deletePost, editPost, loading } = useBlogApi();

  const [title, setTitle] = useState(currentBlog?.title || "");
  const [content, setContent] = useState(currentBlog?.content || "");

  const newPost = () => {
    editPost({
      userId: user?.id as string,
      postId: currentBlog?.id as string,
      content: content,
      title: title
    });
    //setCurrentBlog()
  };

  const delPost = () => {
    deletePost(user?.id as string, currentBlog?.id as string)
  };

  return (
    <MainLayout>
      <>
        {loading && <Loading />}
        <div className="flex flex-col items-center p-4">
          <div className="hidden sm:block">
            <img src={imgpath} alt="blog_thumbnail" className="h-48 w-full object-fill md:h-fit md:max-w-full" />
          </div>
          <div className="md:mx-60 mb-20">
            <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
              {currentBlog?.title}
            </h1>
            <p className="text-base leading-relaxed">
              {currentBlog?.content}
            </p>
            <br />
            <p className="italic font-semibold text-gray-700">
              {currentBlog?.firstName} - {tmpDate.substring(0, 10).split('-').reverse().join('-')}
            </p>
          </div>

          {user?.id === currentBlog?.userId && (
            <div className="flex w-full gap-3 justify-between items-center p-4">
              <Dialog>
                <DialogTrigger>
                  <Button
                    className="p-2 bg-blue-300"
                    variant="outline"
                    size="icon"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Button>
                </DialogTrigger>
                <DialogContent className="md:max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle>Edit blog</DialogTitle>
                  </DialogHeader>
                  <div>
                    <Label className="block text-gray-700 text-sm font-bold mb-2">
                      Edit Title:
                    </Label>
                    <Input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                    <Label className="block text-gray-700 text-sm font-bold mb-2">
                      Description:
                    </Label>
                    <Textarea
                      rows={10}
                      value={content}
                      onChange={(e) => setContent(e.currentTarget.value)}
                      className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        type="submit"
                        onClick={newPost}
                      >
                        Save
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <Button
                    className="p-2 bg-red-400"
                    variant="outline"
                    size="icon"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </DialogTrigger>
                <DialogContent className="md:max-w-[300px]">
                  <DialogHeader>
                    <DialogTitle>Delete this blog?</DialogTitle>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      type="submit"
                      className="bg-red-500"
                    >
                      Yes, delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </>
    </MainLayout>
  );
}

export default BlogPage;