import { Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function index() {
    const [formData, setFormData] = useState({})

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };
    console.log(formData)

    return (
        <div>
            <div className='flex-1'>
                <div className='text-center'>
                    <span className='px-2 py-1 font-bold dark:text-white text-4xl'>
                        SignUp
                    </span>
                </div>
                <form className='flex flex-col gap-4'>
                    <div>
                        <Label value='Your firstname' />
                        <TextInput
                            type='text'
                            placeholder='John'
                            id='firstname'
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label value='Your lastname' />
                        <TextInput
                            type='text'
                            placeholder='Wick'
                            id='lastname'
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label value='Your email' />
                        <TextInput
                            type='email'
                            placeholder='name@company.com'
                            id='email'
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label value='Your password' />
                        <TextInput
                            type='password'
                            placeholder='Password'
                            id='password'
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label value='Re-type password' />
                        <TextInput
                            type='password'
                            placeholder='Password'
                            id='re-password'
                            onChange={handleChange}
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
                            'Sign Up'
                        )}
                    </Button>
                </form>
                <div className='flex gap-2 text-sm mt-5'>
                    <span>Have an account?</span>
                    <Link to='/signin' className='text-blue-500'>
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default index
