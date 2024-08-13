import { isAxiosError } from "axios";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const errorHandler = (e: unknown) => {
  if (isAxiosError(e)) {
    if(Array.isArray(e.response?.data?.message)) {
      let str=""
      const len = e.response?.data?.message.length
      for(let i=0; i<len-1; i++) {
        if(typeof e.response?.data?.message[i] === 'object' && e.response?.data?.message[i]?.message)
          str+=e.response?.data?.message[i]?.message+"\n\n"
        else
          str+= e.response?.data?.message[i]+"\n\n"
      }
      if(typeof e.response?.data?.message[len-1] === 'object' && e.response?.data?.message[len-1]?.message)
        str+= e.response?.data?.message[len-1]?.message 
      else
        str+= e.response?.data?.message[len-1]
      return str
    }

    else if (e?.response?.data?.message) {
      return e.response.data.message;
    }

    else if (e?.response?.data?.msg) {
      return e.response.data.msg;
    }

    return e.message
  }

  return '';
};
