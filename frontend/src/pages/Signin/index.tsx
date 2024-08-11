import { Button, Label, Spinner, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

function index() {
    return (
        <div>
            <div className='flex-1'>
                <div className='text-center'>
                    <span className='px-2 py-1 font-bold dark:text-white text-4xl'>
                        SignIn
                    </span>
                </div>
                <form className='flex flex-col gap-4'>
                    <div>
                        <Label value='Your email' />
                        <TextInput
                            type='email'
                            placeholder='name@company.com'
                            id='email'
                        />
                    </div>
                    <div>
                        <Label value='Your password' />
                        <TextInput
                            type='password'
                            placeholder='**********'
                            id='password'
                        />
                    </div>
                    <Button
                        gradientDuoTone='purpleToPink'
                        type='submit'
                    >
                        {false ? (
                            <>
                                <Spinner size='sm' />
                                <span className='pl-3'>Loading...</span>
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </Button>
                </form>
                <div className='flex gap-2 text-sm mt-5'>
                    <span>Dont Have an account?</span>
                    <Link to='/signup' className='text-blue-500'>
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default index
