import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { AddCompanydata } from '../apicalls/Company';
import { toast } from 'react-toastify';


const AddCompany = ({ showModal, setShowModal, render, setrender }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const response = await AddCompanydata(data)
        if (response.success) {
            toast.success(response.message)
            setShowModal(false)
            setrender(!render)

        } else {
            setShowModal(false)
            setrender(!render)
            toast.error(response.message)
        }

    };

    return (
        <div className={`modal ${showModal ? 'show' : ''}`} tabIndex='-1' style={{ display: showModal ? 'block' : 'none' }}>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header' style={{ backgroundColor: 'black' }}>
                        <h5 className='modal-title' id='staticBackdropLabel' style={{ color: 'white' }}>
                            Add New Company
                        </h5>
                        <button
                            type='button'
                            className='btn-close'
                            data-bs-dismiss='modal'
                            aria-label='Close'
                            onClick={() => setShowModal(false)}
                            style={{ color: 'white', borderColor: 'white' }}
                        ><i className='fas fa-times'></i></button>
                    </div>

                    <div className='modal-body'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='form-outline mb-4'>
                                <Controller
                                    name='companyname'
                                    control={control}
                                    rules={{ required: 'Company name is required' }}
                                    render={({ field }) => (
                                        <>
                                            <input {...field} type='text' id='form6Example3' className={`form-control ${errors.companyname ? 'is-invalid' : ''}`} placeholder='Company name' />
                                            {errors.companyname && <div className='invalid-feedback'>{errors.companyname.message}</div>}
                                        </>
                                    )}
                                />
                            </div>

                            <div className='form-outline mb-4'>
                                <Controller
                                    name='location'
                                    control={control}
                                    rules={{ required: 'location is required' }}
                                    render={({ field }) => (
                                        <>
                                            <input {...field} type='text' id='form6Example4' className={`form-control ${errors.location ? 'is-invalid' : ''}`} placeholder='location' />
                                            {errors.location && <div className='invalid-feedback'>{errors.location.message}</div>}
                                        </>
                                    )}
                                />
                            </div>

                            <div className='form-outline mb-4'>
                                <Controller
                                    name='person'
                                    control={control}
                                    rules={{ required: 'Person name is required' }}
                                    render={({ field }) => (
                                        <>
                                            <input {...field} type='text' id='form6Example5' className={`form-control ${errors.person ? 'is-invalid' : ''}`} placeholder='Person' />
                                            {errors.person && <div className='invalid-feedback'>{errors.person.message}</div>}
                                        </>
                                    )}
                                />
                            </div>

                            <div className='form-outline mb-4'>
                                <Controller
                                    name='contactNo'
                                    control={control}
                                    rules={{
                                        required: 'Contact No is required',
                                        pattern: { value: /^[0-9]{10}$/, message: 'Contact number must be exactly 10 digits' },
                                    }}
                                    render={({ field }) => (
                                        <>
                                            <input {...field} type='text' id='form6Example6' className={`form-control ${errors.contactNo ? 'is-invalid' : ''}`} placeholder='Contact No' />
                                            {errors.contactNo && <div className='invalid-feedback'>{errors.contactNo.message}</div>}
                                        </>
                                    )}
                                />
                            </div>


                            <div className='w-100 text-center'>
                                <button
                                    type='submit'
                                    className='btn btn-primary btn-block mb-4'
                                    style={{
                                        display: 'inline-block',
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        textDecoration: 'none',
                                        borderRadius: '5px',
                                        transition: 'background-color 0.3s ease',
                                        backgroundColor: 'black'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = 'lightblue';
                                        e.target.style.color = 'black'; // Change text color on hover
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = 'black';
                                        e.target.style.color = 'white'; // Revert text color back to white
                                    }}
                                >
                                    Add company
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCompany;
