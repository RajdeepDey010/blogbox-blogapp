import { ReactNode } from 'react'
import Navbar from './components/Navbar'

function MainLayout({children}:{children: ReactNode}) {
  return (
    <div className='max-w-[1600px] w-full mx-auto h-full'>
      <Navbar />
      <div className='p-4'>
        {children}
      </div>
    </div>
  )
}

export default MainLayout