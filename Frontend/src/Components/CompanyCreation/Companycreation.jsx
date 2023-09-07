import React, { useState } from 'react';
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import Addcompany from '../../Modal/Addcompany';
import Editcompany from '../../Modal/Editcompany';
import DeleteModal from '../../Modal/DeleteModal';
const Companycreation = ({ Company, render, setrender }) => {
    const [showModal, setShowModal] = useState(false)
    const [showeditModal, setShoweditModal] = useState(false);
    const [showdeleteModal, setShowdeleteModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedId, setSelectedid] = useState(null);

    const handleEditClick = (item) => {
        setSelectedCompany(item);
        setShoweditModal(true);
    };

    const data = () => {
        if (!Array.isArray(Company)) {
            return {
                columns: [],
                rows: [],
            };
        }
        return {
            columns: [
                {
                    label: 'No',
                    field: 'No',
                    width: 100,
                },
                {
                    label: 'Company Name',
                    field: 'companyname',
                    width: 200,
                },
                {
                    label: 'Contact No',
                    field: 'contactNo',
                    width: 150,
                },
                {
                    label: 'Location',
                    field: 'location',
                    width: 150,
                },
                {
                    label: 'Person',
                    field: 'person',
                    width: 150,
                },
                {
                    label: 'option',
                    field: 'editButton',
                    width: 100,
                },
                {
                    label: 'option',
                    field: 'deleteButton',
                    width: 100,
                },
            ],
            rows: Company.map((item, index) => ({
                No: index + 1,
                companyname: item?.companyname,
                contactNo: item?.contactNo,
                location: item?.location,
                person: item?.person,
                editButton: (
                    <button
                        onClick={() => handleEditClick(item)}
                        style={{ cursor: 'pointer' }}
                        className="btn btn-primary btn-sm"
                    >
                        Edit
                    </button>
                ),
                deleteButton: (
                    <button
                        style={{ cursor: 'pointer' }} onClick={() => {
                            setSelectedid(item._id)
                            setShowdeleteModal(true)
                        }}
                        className="btn btn-danger btn-sm"
                    >
                        Delete
                    </button>
                ),
            })),
        };
    };

    return (
        <>
            <div className='container-fluid p-5' style={{ height: '100vh', overflowY: 'auto' }}>
                {/* Invoice Heading */}
                <div className='mb-4'>
                    <h1 className='text-center mb-3'>Manage Your Companies</h1>
                    <p className='text-center text-muted'>
                        Welcome to the Company Management Dashboard.</p>
                </div>
                {/*  */}
                <div className='text-center mb-3'>
                    <button className='btn btn-large' onClick={() => setShowModal(true)} style={{ backgroundColor: 'black', color: 'white', cursor: 'pointer' }}>Add Company</button>
                </div>

                <CDBContainer>
                    <CDBCard>
                        <CDBCardBody>
                            <CDBDataTable
                                responsive
                                striped
                                bordered
                                hover
                                entriesOptions={[5, 20, 25]}
                                entries={5}
                                pagesAmount={4}
                                data={data()}
                                materialSearch={true}
                            />
                        </CDBCardBody>
                    </CDBCard>
                </CDBContainer>
            </div>
            <Addcompany showModal={showModal} setShowModal={setShowModal} render={render} setrender={setrender} />
            {Company && <Editcompany showeditModal={showeditModal} setShoweditModal={setShoweditModal} Company={selectedCompany} render={render} setrender={setrender} />}
            {showdeleteModal && <DeleteModal id={selectedId} render={render} setrender={setrender} showdeleteModal={showdeleteModal} setShowdeleteModal={setShowdeleteModal} />}
        </>
    );
};

export default Companycreation;
