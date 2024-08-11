import React from 'react'

const index = () => {
    return (
        <form className='shadow rounded px-8 pt-6 pb-8 mb-4'>
            <h3 className='text-xl font-bold mb-4 text-gray-900'>
                Write a Blog
            </h3>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
                Your Title :
            </label>
            <input
                type='text'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            <label className='block text-gray-700 text-sm font-bold mb-2'>
                Your Content :
            </label>
            <textarea
                rows={15}
                cols={50}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rouded focus:outline-none focus:shadow-outline'
            >
                Add
            </button>
        </form>
    )
}

export default index
