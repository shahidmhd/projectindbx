// import React, { useState } from 'react'
// import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
// import { useNavigate } from 'react-router-dom';
// import { deleteInvoice, getselectedinvioce } from '../../apicalls/Invoice';
// import { toast } from 'react-toastify';


// function Invoicetables({ invoices, render, setrender }) {
//   const navigate = useNavigate()
//   function formatDate(dateString) {
//     const date = new Date(dateString);
//     const formattedDate = date.toLocaleDateString("en-US");
//     return formattedDate;
//   }

//   const handleprintpage = async (item) => {
//     console.log(item);
//     const response = await getselectedinvioce(item._id)
//     navigate(`/print/${item._id}`);
//   };


//   const handledeletepage = async (item) => {
//     console.log(item);
//     const response = await deleteInvoice(item._id)
//     console.log(response);
//     if (response.success) {
//       toast.success("invoice deleted")
//       setrender(!render)
//     }
//   }

//   const handleeditpage = (invoiceid) => {
//     navigate(`/detail/${invoiceid}`)

//   }
//   return (
//     <>
//       <div className='container-fluid p-5'>
//         {/* Invoice Heading */}
//         <div className='mb-4'>
//           <h1 className='text-center mb-3'>Invoice Management</h1>
//           <p className='text-center text-muted'>
//             Welcome to the invoice management page. Below is a list of invoices.
//           </p>
//         </div>
//         {/*  */}
//         <div className='row justify-content-center'>
//           <div className='col-lg-12 col-md-12 col-sm-12'>
//             <div className='mb-3'>
//             </div>
//             <div className='p-3' style={{ height: '700px', overflow: 'auto' }}>
//               <MDBTable align='middle'>
//                 <MDBTableHead>
//                   <tr>
//                   <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                       No
//                     </th>
//                     <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                       Invoice Number
//                     </th>
//                     <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                       Box no
//                     </th>
//                     <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                       Airwaybill no
//                     </th>
//                     <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                       Company name
//                     </th>
//                     <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                       Total Weight
//                     </th>
//                     <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                       Date
//                     </th>
//                     <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                       Actions
//                     </th>
//                     <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                       Actions
//                     </th>
//                     <th style={{ backgroundColor: 'black', color: 'white' }} scope='col'>
//                       Actions
//                     </th>
//                   </tr>
//                 </MDBTableHead>
//                 <MDBTableBody>
//                   {invoices &&
//                     invoices.map((item,index) => (
//                       <tr key={item._id}>
//                         <td>
//                           <p className='fw-normal mb-1'>{index+1}</p>
//                         </td>
//                         <td>
//                           <div className='d-flex align-items-center'>
//                             <div className='ms-3'>
//                               <p className='fw-bold mb-1'>{item.invoiceNumber}</p>
//                             </div>
//                           </div>
//                         </td>
//                         <td>
//                           <p className='fw-normal mb-1'>{item.boxNo}</p>
//                         </td>
//                         <td>
//                           <p className='fw-normal mb-1'>{item.airwayBillNo}</p>
//                         </td>
//                         <td>
//                           <p className='fw-normal mb-1'>{item.selectedCompanyId && item.selectedCompanyId.companyname ? item.selectedCompanyId.companyname : 'company Deleted'}</p>

//                         </td>
//                         <td>
//                           <p className='fw-normal mb-1'>{item.totalWeight}</p>
//                         </td>
//                         <td>
//                           <p className='fw-normal mb-1'>{formatDate(item.selectedDate)}</p>
//                         </td>

//                         <td>
//                           <MDBBadge onClick={() => handleprintpage(item)} color='black' pill style={{cursor:'pointer'}}>
//                             deatails
//                           </MDBBadge>
//                         </td>
//                         <td>
//                           <MDBBadge onClick={() => handleeditpage(item._id)} color='primary' pill style={{cursor:'pointer'}}>
//                             Edit
//                           </MDBBadge>
//                         </td>
//                         <td>
//                           <MDBBadge onClick={() => handledeletepage(item)} color='danger' pill style={{cursor:'pointer'}}>
//                             delete
//                           </MDBBadge>
//                         </td>
//                       </tr>
//                     ))}

//                 </MDBTableBody>

//               </MDBTable>
//             </div>
//           </div>
//         </div>
//       </div>


//     </>
//   )
// }

// export default Invoicetables


import React, { useState } from 'react';
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import { useNavigate } from 'react-router-dom';
import { deleteInvoice, getselectedinvioce } from '../../apicalls/Invoice';
import { toast } from 'react-toastify';
const Invoicetables = ({ invoices, render, setrender }) => {
  const navigate = useNavigate()
  // function formatDate(dateString) {
  //   console.log(dateString,"date ");
  //   const date = new Date(dateString);
  //   const formattedDate = date.toLocaleDateString("en-US");
  //   return formattedDate;
  // }
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-based
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/ ${year}`;
    return formattedDate;
  }


  const handleeditpage = (invoiceid) => {
    navigate(`/detail/${invoiceid}`)

  }


  const handleprintpage = async (item) => {
    console.log(item);
    const response = await getselectedinvioce(item._id)
    navigate(`/print/${item._id}`);
  };


  const handledeletepage = async (item) => {
    const response = await deleteInvoice(item._id)
    if (response.success) {
      toast.success("invoice deleted")
      setrender(!render)
    }
  }


  const data = () => {
    if (!Array.isArray(invoices)) {
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
          width: 50,
        },
        {
          label: 'Invoice Number',
          field: 'invoiceNumber',
          width: 100,
        },
        {
          label: 'Company Name',
          field: 'CompanyName',
          width: 100,
        },
        {
          label: ' Box No',
          field: 'BoxNo',
          width: 100,
        },
        {
          label: 'AirwayBill No',
          field: 'AirwayBillNo',
          width: 100,
        },
        {
          label: 'Total weight',
          field: 'totalweight',
          width: 100,
        },
        {
          label: 'Date',
          field: 'Date',
          width: 100,
        },
        {
          label: 'option',
          field: 'details',
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
      rows: invoices.map((item, index) => ({
        No: index + 1,
        invoiceNumber: item.invoiceNumber,
        CompanyName: item.selectedCompanyId && item.selectedCompanyId.companyname ? item.selectedCompanyId.companyname : 'company Deleted',
        BoxNo: item.boxNo,
        AirwayBillNo: item.airwayBillNo,
        totalweight: item.totalWeight,
        totalAmount: item.totalAmount,
        Date: formatDate(item.selectedDate),
        details: (
          <button
            onClick={() => handleprintpage(item)}
            style={{ cursor: 'pointer' }}
            className="btn btn-dark btn-sm"
          >
            details
          </button>
        ),
        editButton: (
          <button
            onClick={() => handleeditpage(item._id)}
            style={{ cursor: 'pointer' }}
            className="btn btn-primary btn-sm"
          >
            Edit
          </button>
        ),
        deleteButton: (
          <button
            onClick={() => handledeletepage(item)}
            style={{ cursor: 'pointer' }}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        ),
      })),
    };
  };

  // Rest of your component code

  return (
    <div className='container-fluid p-5' style={{ height: '100vh', overflowY: 'auto' }}>
      {/* Invoice Heading */}
      <div className='mb-4'>
        <h1 className='text-center mb-3'>Manage Your Invoice</h1>
        <p className='text-center text-muted'>
          Welcome to the Invoice Management Dashboard.</p>
      </div>
      {/*  */}
      <div className='text-center mb-3'>
        <button className='btn btn-large' onClick={() => navigate('/invoice')} style={{ backgroundColor: 'black', color: 'white', cursor: 'pointer' }}>Add Invoice</button>
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
  );
};

export default Invoicetables;




