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

  const navView = document.getElementById('nav-view')
  function handleBar() {
    // navView?.classList.toggle('hidden');
    navView?.classList.replace('hidden', 'block')
  }
  function handleX() {
    navView?.classList.replace('block', 'hidden')
  }
  return (
    <nav className='border-b-2 sticky top-0 z-10 bg-white font-bold w-full text-lg text-black flex justify-between items-center px-4 py-2'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white text-2xl'>
          BlogBox
        </span>
      </Link>

      <ul className='hidden md:flex text-center'>
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
      {!!user ? <>
        <Button
          className='p-2 md:hidden'
          variant="outline"
          size="icon"
          onClick={handleBar}
        >
          <i className="fa-solid fa-bars text-2xl"></i>
        </Button>

        <div className='hidden mx-4 md:flex items-center'>
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
      </>
        : <Button onClick={() => navigate('/signin')}>Sign in</Button>}

      {/* nav-view */}
      {!!user && <div id='nav-view' className='fixed hidden inset-0 bg-white'>
        <div id='nav-bar' className="border-b-2 flex justify-between items-center  px-4 py-2">
          <Link
            to='/'
            className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
          >
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white text-2xl'>
              BlogBox
            </span>
          </Link>

          <Button
            className='md:hidden p-2'
            variant="outline"
            size="icon"
            onClick={handleX}
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </Button>
        </div>

        <div className='mx-4 my-2 flex flex-col'>
          <Link to='/' className='pt-2 pb-2'>
            <span>Home</span>
          </Link>
          <Link to='/myblogs' className='pt-2 pb-2'>
            <span>MyBlogs</span>
          </Link>
          <Link to='/write' className='pt-2 pb-2'>
            <span>Write</span>
          </Link>
        </div>

        <div className='mx-4 flex items-center'>
          <i className="fa-solid fa-circle-user pr-2 text-2xl"></i>
          <DropdownMenu>
            <DropdownMenuTrigger><h1>Hi, {user.firstName}</h1></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user.firstName}, {user.lastName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className='cursor-pointer'>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>}
    </nav>
  )
}

export default Navbar
