import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginUser } from '../apicalls/User';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setLogin } from '../Redux/Authslice';




const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await LoginUser(data)
            if (response.success) {
                toast.success(response.message)
                dispatch(setLogin({ userToken: response.data }))
                navigate('/')

            } else {
                toast.error(response.message)
            }
        } catch (err) {
           toast.error(err)
        }
    };

    // Custom validation function to check for empty or whitespace input
    const validateNotEmpty = (value) => {
        if (!value.trim()) {
            return 'This field is required';
        }
        return true;
    };

    return (
        <section className="vh-100 gradient-custom" style={{ backgroundImage: `url(01-cargo-vs-freight.jpg)`, backgroundSize: 'cover' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-outline form-white mb-4">
                                            <input
                                                placeholder='enter your email'
                                                type="email"
                                                id="typeEmailX"
                                                className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                                                {...register('email', {
                                                    required: 'Email is required',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                        message: 'Invalid email address',
                                                    },
                                                    validate: validateNotEmpty, // Custom validation
                                                })}
                                            />
                                            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <input
                                                placeholder='enter your password'
                                                type="password"
                                                id="typePasswordX"
                                                className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                                                {...register('password', {
                                                    required: 'Password is required',
                                                    minLength: {
                                                        value: 6,
                                                        message: 'Password must have at least 6 characters',
                                                    },
                                                    validate: validateNotEmpty, // Custom validation
                                                })}
                                            />
                                            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                                            {/* <div className="mt-3 text-end">
                                                <Link className="px-5 text-decoration-none text-primary" to="/change-password">Change Password</Link>
                                            </div> */}
                                        </div>
                                        <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
