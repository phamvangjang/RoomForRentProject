import React, { useEffect, useState } from 'react'
import { Button, InputForm } from '../../components'
import { useLocation, useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const Login = () => {
    const navigate = useNavigate()
    const { isLoggedIn, msg, update } = useSelector(state => state.auth)
    const [invalidFields, setInvalidFields] = useState([])
    const location = useLocation()
    const dispatch = useDispatch()
    const [isRegister, setIsRegister] = useState(location.state?.flag)
    const [payload, setPayload] = useState({
        phone: '',
        password: '',
        name: ''
    })

    useEffect(() => {
        msg && Swal.fire('Oops!', msg, 'error')
    }, [msg, update])

    // console.log(location)
    useEffect(() => {
        setIsRegister(location.state?.flag)
    }, [location.state?.flag])

    useEffect(() => {
        isLoggedIn && navigate('/')
    }, [isLoggedIn])

    const handleSubmit = async () => {
        let finalPayload = isRegister ? payload : {
            phone: payload.phone,
            password: payload.password
        }
        let invalids = validate(finalPayload)
        if (invalids === 0) isRegister ? dispatch(actions.register(payload)) : dispatch(actions.SignIn(payload))
    }

    const validate = (payload) => {
        let invalids = 0
        let fields = Object.entries(payload)
        fields.forEach(item => {
            if (item[1] === '') {
                setInvalidFields(prev => [...prev, {
                    name: item[0],
                    message: 'This field must not is empty'
                }])
                invalids++
            }
        })
        fields.forEach(item => {
            switch (item[0]) {
                case 'password':
                    if (item[1].length < 6) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Password must be at least 6 characters'
                        }])
                        invalids++
                    }
                    break;
                case 'phone':
                    if (!+item[1]) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Your phone number is invalid'
                        }])
                        invalids++
                    }
                    break;
                default:
                    break;
            }
        })
        return invalids
    }

    return (
        <div className='bg-white rounded-md shadow-sm w-[600px] p-8 pb-[100px]'>
            <h3 className='font-semibold text-2xl'>{isRegister ? 'Register' : 'Sign In'}</h3>
            <div className='w-full flex flex-col gap-3 mb-5'>
                {isRegister && <InputForm
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    label={'Full name'}
                    value={payload.name}
                    setValue={setPayload}
                    keyPayload={'name'} />}
                <InputForm
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    label={'Phone number'}
                    value={payload.phone}
                    setValue={setPayload}
                    keyPayload={'phone'} />
                <InputForm
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    label={'Password'}
                    value={payload.password}
                    setValue={setPayload}
                    keyPayload={'password'}
                    type='password' />
                <Button
                    text={isRegister ? 'Register' : 'Sign In'}
                    bgColor='bg-secondary1'
                    textColor='text-white'
                    fullWidth
                    onClick={handleSubmit}
                />
            </div>

            <div className='flex items-center justify-between'>
                {isRegister
                    ? <small>Do you have Account? <span
                        className='text-blue-500 hover:underline cursor-pointer'
                        onClick={() => {
                            setIsRegister(false)
                            setPayload({
                                phone: '',
                                password: '',
                                name: ''
                            })
                        }}>Sign In Now</span></small>
                    : <>
                        <small className='text-blue-500 hover:text-red-500 cursor-pointer'>Forgot Password?</small>
                        <small
                            onClick={() => {
                                setIsRegister(true)
                                setPayload({
                                    phone: '',
                                    password: '',
                                    name: ''
                                })
                            }}
                            className='text-blue-500 hover:text-red-500 cursor-pointer'>New Account?</small>
                    </>}
            </div>
        </div>
    )
}

export default Login