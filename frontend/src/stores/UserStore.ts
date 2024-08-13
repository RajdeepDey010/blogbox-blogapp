import { IUser } from '@/api/types'
import { create } from 'zustand'

type State = {
  user?: IUser | null
}

type Action = {
  setUser: (user: IUser | null) => void
}


export const useUserStore = create<State & Action>((set) => ({
  user: null,
  setUser: (user: IUser | null) => {
    set(()=>({user: user}))
  }
}))