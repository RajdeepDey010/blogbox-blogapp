import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { useUserStore } from '@/stores/UserStore'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { useAuthApi } from '@/api/auth/hook'

function Navbar() {
  const { user } = useUserStore()
  const { logout } = useAuthApi()
  const navigate = useNavigate()
  console.log(user)
  return (
    <nav className='border-b-2 sticky top-0 z-10 bg-white font-bold w-full text-lg text-black flex items-center px-4 py-2'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white text-2xl'>
          BlogBox
        </span>
      </Link>
      <ul className='flex-grow text-center'>
        {!!user && <>
          <li className='inline-block py-4'>
            <Link to='/' className='pl-6 pr-8'>
              Home
            </Link>
          </li>
          <li className='inline-block py-4'>
            <Link to='/myblogs' className='pl-6 pr-8'>
              MyBlogs
            </Link>
          </li>
          <li className='inline-block py-4'>
            <Link to='/write' className='pl-6 pr-8'>
              Write
            </Link>
          </li>
        </>}
      </ul>
      {!!user ? <div className='px-6 flex items-center'>
        <i className="fa-solid fa-circle-user pr-2 text-2xl"></i>
        <DropdownMenu>
          <DropdownMenuTrigger><h1>Hi, {user.firstName}</h1></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user.firstName}, {user.lastName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className='cursor-pointer'>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
        : <Button onClick={() => navigate('/signin')}>Sign in</Button>}
    </nav>
  )
}

export default Navbar
