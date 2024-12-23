import { IEditPostRequest, IPost } from '@/api/types'
import { create } from 'zustand'

type State = {
  currentBlog?: IPost,
  editBlog?: IEditPostRequest
}

type Action = {
  setCurrentBlog: (blog?: IPost) => void,
  setEditBlog: (blog?: IEditPostRequest) => void
}


export const useCurrentBlogStore = create<State & Action>((set) => ({
  currentBlog: undefined,
  setCurrentBlog: (blog?: IPost) => {
    set(()=>({currentBlog: blog}))
  },
  setEditBlog: (blog?: IEditPostRequest) => {
    set(()=>({editBlog: blog}))
  }
}))