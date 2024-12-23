import { IEditPostRequest, IUser } from '@/api/types'
import { create } from 'zustand'

type State = {
  user?: IUser | null,
  setUser: (user: IUser | null) => void
}

type Action = {
  
}


export const useUserStore = create<State>((set) => ({
  user: null,
  setUser: (user: IUser | null) => {
    set(()=>({user: user}))
  }
}))