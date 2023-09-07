import React from 'react';
import { useReactToPrint } from 'react-to-print';

const Printing = ({ invoiceData }) => {
  console.log(invoiceData);
  // function formatDate(dateString) {
  //   const date = new Date(dateString);
  //   const formattedDate = date.toLocaleDateString("en-US");
  //   return formattedDate;
  // }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-based
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="page-content container pt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8" >
          <div className="container border p-3 mx-auto" ref={componentRef} >
            <div className="row" >
              <div className="col-12 text-center mb-3 ">
                <span className="text-default-d3" style={{ fontSize: "2em", fontWeight: "bold" }}>INDBX PRIVATE LIMITED</span>
              </div>

              <div className="col-12 text-center">
                <span className="text-default-d3">KP 14/432, CHULLIKKAPARAMBA,</span><br />
                <span className="text-default-d3">CHERUVADI, Kozhikode, Kerala, 673661</span><br />
                <span className='text-default-d3'>GSTIN: 32AAGCI3195M1ZA</span>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-sm-6">
                <div>
                  <div>
                    <span className="font-weight-bold">Company Name :</span>
                    {invoiceData?.selectedCompanyId?.companyname ? invoiceData.selectedCompanyId.companyname : ''}

                  </div>

                  <div><span className="font-weight-bold">Box No:</span> {invoiceData?.boxNo}</div>
                  <div><span className="font-weight-bold">Total Weight :</span> {invoiceData?.totalWeight}</div>
                  <div><span className="font-weight-bold">AirWayBill No :</span> {invoiceData?.airwayBillNo}</div>
                </div>
              </div>

              <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                <div className='print-date'>
                  <hr className="d-sm-none" />
                  <div className="m2">
                    <div className="my-2">
                      <div><span className="font-weight-bold">Date :</span> {formatDate(invoiceData?.selectedDate)}</div>
                    </div>
                    <div className="my-2">
                      <span className="font-weight-bold">Invoice No:</span> {invoiceData?.invoiceNumber}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <table className="table table-striped table-borderless">
                <thead style={{ backgroundColor: "#84B0CA" }} className="text-white">
                  <tr>
                    <th scope="col" style={{ backgroundColor: "black", color: 'white' }}>No</th>
                    <th scope="col" style={{ backgroundColor: "black", color: 'white' }}>Service Name</th>
                    <th scope="col" style={{ backgroundColor: "black", color: 'white' }}>HSN Code</th>
                    <th scope="col" style={{ backgroundColor: "black", color: 'white' }}>Weight</th>
                    <th scope="col" style={{ backgroundColor: "black", color: 'white' }}>Amount</th>
                    <th scope="col" style={{ backgroundColor: "black", color: 'white' }}>Total</th>
                  </tr>
                </thead>
                <tbody className="text-95 text-secondary-d3">
                  {invoiceData?.tableRows && invoiceData?.tableRows.map((row, index) => (
                    <tr key={row._id}>
                      <td>{index + 1}</td>
                      <td>{row.serviceName}</td>
                      <td>{row.HSNCode}</td>
                      <td>{row.weight}</td>
                      <td>{row.amount}</td>
                      <td>{row.total}</td>
                    </tr>
                  ))}
                  {/* Add more rows here */}
                </tbody>
              </table>
              <div style={{ paddingLeft: "35em" }}>
                <div className="row my-2">
                  <div className="col-7 text-right">SubTotal</div>
                  <div className="col-5">₹{invoiceData?.subtotal}</div>
                </div>
                <div className="row my-2">
                  <div className="col-7 text-right">GST 18%</div>
                  <div className="col-5">₹{invoiceData?.gst18}</div>
                </div>
                <div className="row my-2">
                  <div className="col-7 text-right">SGST 9%</div>
                  <div className="col-5">₹{invoiceData?.SGST}</div>
                </div>
                <div className="row my-2">
                  <div className="col-7 text-right">CGST 9%</div>
                  <div className="col-5">₹{invoiceData?.CGST}</div>
                </div>
                <div className="row my-2">
                  <div className="col-7 text-right" style={{ fontWeight: "bold" }}>Total Amount</div>
                  <div className="col-5" style={{ fontWeight: "bold" }}>₹{invoiceData?.totalAmount}</div>
                </div>
              </div>
            </div>

            {/* <hr /> */}

            {/* <div className="d-flex justify-content-between align-items-center mt-3">
              <span className="text-secondary-d1 text-105">Thank you for your purchase</span>
              <button
                className="btn btn-primary mt-3"
                onClick={handlePrint}
              >
                Print
              </button>
            </div> */}
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
              <span className="text-secondary-d1 text-105"></span>
              <button
                className="btn btn-primary mt-3"
                onClick={handlePrint}
              >
                Print
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Printing;
