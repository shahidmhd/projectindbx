import React from 'react'
import { deleteservice } from '../apicalls/Service'
import { toast } from 'react-toastify'


const DeleteserviceModal = ({ setShowdeleteModal, render, setrender, id }) => {

    const handledelete = async () => {
        await deleteservice(id)
        setShowdeleteModal(false)
        setrender(!render)
        toast.success("Service Deleted")
    }
    return (
        <>
            <div className='modal show' tabIndex='-1' style={{ display: 'block' }}>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header' style={{ backgroundColor: 'black' }}>
                            <h5 className='modal-title' id='staticBackdropLabel' style={{ color: 'white' }}>
                                Delete Service
                            </h5>
                            <button onClick={() => setShowdeleteModal(false)} type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' style={{ color: 'white', borderColor: 'white', cursor: 'pointer' }}  ><i className='fas fa-times'></i></button>
                        </div>
                        <div className='modal-body'>
                            <p>Are you sure you want to delete this Service?</p>
                        </div>
                        <div className='modal-footer'>
                            <button onClick={() => setShowdeleteModal(false)} type='button' className='btn btn-secondary'>
                                Cancel
                            </button>
                            <button onClick={() => handledelete()} type='button' className='btn btn-danger' >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteserviceModal
