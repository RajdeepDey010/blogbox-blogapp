import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className='border-b-2 sticky top-0 bg-white font-bold w-full text-lg text-black flex items-center'>
            <Link
                to='/'
                className='pl-6 pr-8 self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
            >
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white text-2xl'>
                    BlogBox
                </span>
            </Link>
            <ul className='flex-grow text-center'>
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
            </ul>
            <div className='px-6 flex items-center'>
                <i className="fa-solid fa-circle-user pr-2 text-2xl"></i>
                <h1>Pande</h1>
            </div>
        </nav>
    )
}

export default Navbar
