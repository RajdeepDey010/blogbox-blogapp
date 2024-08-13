import { IPost } from '@/api/types'
import { create } from 'zustand'

type State = {
  currentBlog?: IPost
}

type Action = {
  setCurrentBlog: (blog?: IPost) => void
}


export const useCurrentBlogStore = create<State & Action>((set) => ({
  currentBlog: undefined,
  setCurrentBlog: (blog?: IPost) => {
    set(()=>({currentBlog: blog}))
  }
}))