import BlogPage from '../../components/BlogPage'

const index = () => {
    return (
        <div>
            <div className='mb-20'>
                <h1 className='sm:text-4xl text-2xl font-bold my-6 text-gray-900'>
                    My Blog
                </h1>
                <BlogPage/>
            </div>
        </div>
    )
}

export default index
