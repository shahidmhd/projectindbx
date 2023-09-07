import React, { useState } from 'react';
import { CDBContainer, CDBCard, CDBCardBody, CDBDataTable } from 'cdbreact';
import Addservice from '../../Modal/Addservice';
import EditService from '../../Modal/EditService';
import DeleteserviceModal from '../../Modal/DeleteServicemodal';


const Servicecreation = ({ Service, render, setrender }) => {
 
  const [showModal, setShowModal] = useState(false)
  const [showeditModal, setShoweditModal] = useState(false);
  const [selectedservice, setSelectedservice] = useState(null);
  const [showdeleteModal, setShowdeleteModal] = useState(false);
  const [selectedId, setSelectedid] = useState(null);



  const handleEditClick = (item) => {
    setSelectedservice(item)
    setShoweditModal(true);
  };

  const generateRows = () => {
    return Service.map((item, index) => ({
      No: index + 1,
      servicename: item.servicename,
      HSNCode: item.HSNCode,
      Rate: item.Rate,
      GST: item.GST,
      SGST: item.SGST,
      CGST: item.CGST,
      UOM: item.UOM,
      editButton: <button onClick={() => handleEditClick(item)} style={{ cursor: 'pointer' }} className="btn btn-primary btn-sm">Edit</button>,
      deleteButton: <button onClick={() => {
        setSelectedid(item._id)
        setShowdeleteModal(true)
      }} style={{ cursor: 'pointer' }} className="btn btn-danger btn-sm">Delete</button>,

    }));
  };

  const data = () => {
    if (!Array.isArray(Service)) {
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
          label: 'Service Name',
          field: 'servicename',
          width: 200,
        },
        {
          label: 'HSN Code',
          field: 'HSNCode',
          width: 150,
        },
        {
          label: 'Rate',
          field: 'Rate',
          width: 100,
        },
        {
          label: 'IGST%',
          field: 'GST',
          width: 100,
        },
        {
          label: 'SGST%',
          field: 'SGST',
          width: 100,
        },
        {
          label: 'CGST%',
          field: 'CGST',
          width: 100,
        },
        {
          label: 'UOM(kg)',
          field: 'UOM',
          width: 100,
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
      rows: generateRows(),

    };
  };

  return (
    <>
      <div className='container-fluid p-5' style={{ height: '100vh', overflowY: 'auto' }}>
        {/* Invoice Heading */}
        <div className='mb-4'>
          <h1 className='text-center mb-3'>Manage Your Services</h1>
          <p className='text-center text-muted'>
            Welcome to the Service Management Dashboard.</p>
        </div>
        {/*  */}
        <div className='text-center mb-3'>
          <button className='btn btn-large' onClick={() => setShowModal(true)} style={{ backgroundColor: 'black', color: 'white', cursor: 'pointer' }}>Add service</button>
        </div>

        <CDBContainer>
          <CDBCard>
            <CDBCardBody>
              <CDBDataTable
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
      {showModal && <Addservice showModal={showModal} setShowModal={setShowModal} render={render} setrender={setrender} />}
      {showeditModal && <EditService Service={selectedservice} showeditModal={showeditModal} setShoweditModal={setShoweditModal} render={render} setrender={setrender} />}
      {showdeleteModal && <DeleteserviceModal render={render} setrender={setrender} id={selectedId} showdeleteModal={showdeleteModal} setShowdeleteModal={setShowdeleteModal} />}
    </>
  );
};

export default Servicecreation;
