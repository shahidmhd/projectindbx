// import React from 'react'

// const Changepassword = () => {
//   return (
//    <>
// dbdfbfdvfdfvfdkvfdn
//    </>
//   )
// }

// export default Changepassword
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { changepassword } from '../../apicalls/User';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';




const Changepassword = () => {
    const navigate =useNavigate()


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data); // You can handle the form submission here
        try {
            const response = await changepassword(data)
            if (response.success) {
                toast.success(response.message)
                navigate('/login')
            } else {
                toast.error(response.message)
            }
        } catch (err) {
            console.log(err);
            toast.error("unknown error")
        }

    };



    return (
        <section className="vh-100 gradient-custom" style={{ backgroundImage: `url(01-cargo-vs-freight.jpg)`, backgroundSize: 'cover' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 pb-4 ">Change password</h2>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-outline form-white mb-4">
                                            <input
                                                placeholder="Enter your email"
                                                type="email"
                                                id="email"
                                                className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                                                {...register('email', {
                                                    required: 'Email is required',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                        message: 'Invalid email address',
                                                    },
                                                    // Add any additional validation rules for email
                                                })}
                                            />
                                            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                        </div>
                                        {/* <div className="form-outline form-white mb-4">
                                            <input
                                                placeholder="Enter current password"
                                                type="password"
                                                id="currentPassword"
                                                className={`form-control form-control-lg ${errors.currentPassword ? 'is-invalid' : ''}`}
                                                {...register('currentPassword', {
                                                    required: 'Current password is required',
                                                    minLength: {
                                                        value: 6,
                                                        message: 'Password must have at least 6 characters',
                                                    },
                                                    // Add any additional validation rules for current password
                                                })}
                                            />
                                            {errors.currentPassword && <div className="invalid-feedback">{errors.currentPassword.message}</div>}
                                        </div> */}
                                        <div className="form-outline form-white mb-4">
                                            <input
                                                placeholder="Enter new password"
                                                type="password"
                                                id="newPassword"
                                                className={`form-control form-control-lg ${errors.newPassword ? 'is-invalid' : ''}`}
                                                {...register('newPassword', {
                                                    required: 'New password is required',
                                                    minLength: {
                                                        value: 6,
                                                        message: 'Password must have at least 6 characters',
                                                    },
                                                    // Add any additional validation rules for new password
                                                })}
                                            />
                                            {errors.newPassword && <div className="invalid-feedback">{errors.newPassword.message}</div>}
                                            <div className="mt-3 text-end">
                                                <Link className="px-5 text-decoration-none text-primary" to="/">Back to Home</Link>
                                            </div>
                                        </div>
                                        <button className="btn btn-outline-light btn-lg px-5" type="submit">Change</button>
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

export default Changepassword;
