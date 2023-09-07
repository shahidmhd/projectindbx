import React, { useEffect, useState } from 'react';
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { CSVLink } from 'react-csv';
import { fetchcompanyinvoices, fetchserviceinvoices, searchdatas } from '../../apicalls/Invoice';
import './Report.css'

import jsPDF from 'jspdf';
import 'jspdf-autotable';


const Reportpage = ({ invoiceData, companydetails, serviceDetails }) => {
  // const tableRef = useRef(null);


  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate2, setSelectedDate2] = useState(new Date());
  const [invoiceDatas, setinvoiceDatas] = useState(invoiceData)
  const [filterinvoiceDatas, setfilterinvoiceDatas] = useState(invoiceDatas)

  // const handlePdfDownload = () => {
  //   const pdfString = ReactDOMServer.renderToString(<PdfDocument data={data().rows} />);
  //   const pdfBlob = new Blob([pdfString], { type: 'application/pdf' });
  //   const pdfUrl = URL.createObjectURL(pdfBlob);
  //   const a = document.createElement('a');
  //   a.href = pdfUrl;
  //   a.download = 'report.pdf';
  //   a.click();
  // };

  const handlePdfDownload = () => {
      // Define your heading text
      const headingText = `Invoice Report - ${selectedDate.toLocaleDateString()} to ${selectedDate2.toLocaleDateString()}`;
    // Define your table headers
    const headers = [
      'Invoice No',
      'Invoice Date',
      'Box No',
      'Airway Bill',
      'Service Name',
      'Company Name',
      'HSN Code',
      'Weight',
      'Unit Value',
      'Taxable Value',
      'IGST',
      'SGST',
      'CGST',
      'Total',
    ];
  
    // Assuming data is a function that returns your data
    const dataRows = data().rows;
  
    // Extract the rows from your data object
    const rows = dataRows.map(item => [
      item.InvoiceNo,
      item.InvoiceDate,
      item.BoxNo,
      item.Airwaybill,
      item.ServiceName,
      item.CompanyName,
      item.HSNCode,
      item.weight,
      item.unitvalue,
      item.Taxablevalue,
      item.IGST,
      item.SGST,
      item.CGST,
      item.Total,
    ]);
  
    const doc = new jsPDF();
  
    // Calculate column widths for 100%
    const tableWidth = doc.internal.pageSize.width - 20; // Subtracting 20 to account for margins
    const cellWidth = tableWidth / headers.length;

    // Add the heading text to the PDF
  doc.text(headingText, 20, 10); // Adjust the position (x, y) as needed

  
    // Add content to the PDF using autoTable
    // Generate the table with 100% width and smaller font size for headers
    doc.autoTable({
      head: [headers],
      body: rows,
      theme: 'plain', // Use 'plain' theme to avoid styling that may override the width
      columnStyles: { 0: { cellWidth } }, // Apply the calculated column width to all columns
      headStyles: {
        fontSize: 5, // Adjust the font size as needed
        fillColor: [200, 200, 200], // Optional background color for headers
      },
      bodyStyles: {
        fontSize: 4, // Adjust the body font size as needed
      },
      startY: 20 + doc.getTextDimensions(headingText).h, // Start the table below the heading
    });
  
    // Save or download the PDF
    doc.save('report.pdf');
  };
  

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-based
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };



  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
  };
  function formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-based
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }




  const filterDataByDate = async (startdate, enddate) => {
    const formattedStartDate = formatDateToDDMMYYYY(startdate);
    const formattedEndDate = formatDateToDDMMYYYY(enddate);
    const response = await searchdatas(formattedStartDate, formattedEndDate)
    if (response && response.filteredInvoices && response.filteredInvoices.length > 0) {
      setfilterinvoiceDatas(response.filteredInvoices);
    } else {
      setfilterinvoiceDatas([]);
    }
    // setinvoiceDatas(response.filteredInvoices)
    // setfilterinvoiceDatas(response.filteredInvoices)
  }


  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const handleCompanyChange = async (event) => {
    setSelectedCompany(event.target.value);
    const response = await fetchcompanyinvoices(event.target.value)
    if (response.success) {
      setinvoiceDatas(response.matchingInvoices)
      setfilterinvoiceDatas(response.matchingInvoices)
    } else {
      setinvoiceDatas(invoiceData)
      setfilterinvoiceDatas(invoiceData)
    }

  };

  const handleServiceChange = async (event) => {
    setSelectedService(event.target.value);

    const updatedInvoiceDatas = invoiceDatas.map(invoiceData => {
      if (invoiceData.tableRows) {
        const matchedRows = invoiceData.tableRows.filter(row => row.serviceName === event.target.value);
        return {
          ...invoiceData,
          tableRows: matchedRows,
        };
      }
      return invoiceData;
    });

    setfilterinvoiceDatas(updatedInvoiceDatas);




    // const response = await fetchserviceinvoices(event.target.value)
    // setinvoiceDatas(response.matchingInvoices)
    // console.log(response.matchingInvoices, "service matched datas");
  };




  const [totals, setTotals] = useState({
    taxableValue: 0,
    igst: 0,
    sgst: 0,
    cgst: 0,
    totalAmount: 0,
  });


  useEffect(() => {
    if (filterinvoiceDatas && filterinvoiceDatas.length > 0) {
      let totalTaxableValue = 0;
      let totalIGST = 0;
      let totalSGST = 0;
      let totalCGST = 0;
      let totalAmount = 0;

      filterinvoiceDatas.forEach((item) => {
        item.tableRows.forEach((row) => {
          const taxableValue = row.weight * row.amount;
          const igst = (taxableValue * 0.18).toFixed(2);
          const sgst = (taxableValue * 0.09).toFixed(2); // SGST is half of IGST
          const cgst = (taxableValue * 0.09).toFixed(2); // CGST is half of IGST
          const rowTotal = (taxableValue + parseFloat(igst)).toFixed(2);

          totalTaxableValue += taxableValue;
          totalIGST += parseFloat(igst);
          totalSGST += parseFloat(sgst);
          totalCGST += parseFloat(cgst);
          totalAmount += parseFloat(rowTotal);
        });
      });

      setTotals({
        taxableValue: totalTaxableValue.toFixed(2),
        igst: totalIGST.toFixed(2),
        sgst: totalSGST.toFixed(2),
        cgst: totalCGST.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
      });
    }else{
      setTotals({
        taxableValue: 0.00,
        igst:0.00,
        sgst:0.00,
        cgst:0.00,
        totalAmount:0.00,
      });

    }
  }, [filterinvoiceDatas]);


  const data = () => {
    if (!Array.isArray(invoiceDatas)) {
      return {
        columns: [],
        rows: [],
      };
    }
    const formattedTotalAmount = `${totals.totalAmount}`;
    const formattedtotalIGST = ` ${totals.igst}`;
    const formattedtotalSGST = ` ${totals.sgst}`;
    const formattedtotalCGST = `${totals.cgst}`;
    return {
      columns: [
        // {
        //   label: 'No',
        //   field: 'No',
        //   width: 50,
        //   attributes: {
        //     'aria-controls': 'DataTable',
        //     'aria-label': 'No',
        //   },
        // },
        {
          label: 'Invoice No',
          field: 'InvoiceNo',
          width: 150,
          attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'Invoice No',
          },
        },
        {
          label: 'InvoiceDate',
          field: 'InvoiceDate',
          width: 100,
        },
        {
          label: 'Box No',
          field: 'BoxNo',
          width: 100,
        },
        {
          label: 'Airway Bill',
          field: 'Airwaybill',
          sort: 'asc',
          width: 100,
        },
        {
          label: 'Service Name',
          field: 'ServiceName',
          sort: 'disabled',
          width: 100,
        },
        {
          label: 'Company Name',
          field: 'CompanyName',
          sort: 'disabled',
          width: 100,
        },
        {
          label: 'HSN Code',
          field: 'HSNCode',
          sort: 'disabled',
          width: 100,
        },
        {
          label: 'Weight',
          field: 'weight',
          sort: 'disabled',
          width: 100,
        },
        {
          label: 'Unit Value',
          field: 'unitvalue',
          sort: 'disabled',
          width: 100,
        },
        {
          label: 'Taxable Value',
          field: 'Taxablevalue',
          sort: 'disabled',
          width: 100,
        },
        {
          label: 'IGST',
          field: 'IGST',
          sort: 'disabled',
          width: 100,
        },
        {
          label: 'SGST',
          field: 'SGST',
          sort: 'disabled',
          width: 100,
        },
        {
          label: 'CGST',
          field: 'CGST',
          sort: 'disabled',
          width: 100,
        },
        {
          label: 'Total',
          field: 'Total',
          sort: 'disabled',
          width: 100,
        },
      ],
      rows: [...filterinvoiceDatas?.flatMap((item, index) =>
        item.tableRows.map((row, rowIndex) => ({
          // No: index + 1,
          InvoiceNo: item.invoiceNumber,
          InvoiceDate: formatDate(item.selectedDate),
          BoxNo: item.boxNo,
          Airwaybill: item.airwayBillNo,
          ServiceName: row.serviceName,
          CompanyName: item.selectedCompanyId?.companyname || 'Company Deleted',
          HSNCode: row.HSNCode,
          weight: row.weight,
          unitvalue: row.amount,
          Taxablevalue: row.weight * row.amount,
          IGST: (row.weight * row.amount * 0.18).toFixed(2),
          SGST: ((row.weight * row.amount * 0.18) / 2).toFixed(2), // SGST is half of IGST
          CGST: ((row.weight * row.amount * 0.18) / 2).toFixed(2), // CGST is half of IGST
          Total: (row.weight * row.amount + row.weight * row.amount * 0.18).toFixed(2), // Taxablevalue + gst18
        }))
      ),
      // Add an additional row with empty values
      {
        No: '',
        InvoiceNo: '',
        InvoiceDate: '',
        BoxNo: '',
        Airwaybill: '',
        ServiceName: '',
        CompanyName: '',
        HSNCode: '',
        weight: '',
        unitvalue: '',
        Taxablevalue: 'Total:',
        IGST: formattedtotalIGST,
        SGST: formattedtotalSGST,
        CGST: formattedtotalCGST,
        Total: formattedTotalAmount,
      },
      ]
    }
  };
  return (
    <>
      <div className='container-fluid p-5' style={{ minHeight: '100vh', overflowY: 'auto' }}>
        <div className='mb-4'>
          <h1 className='text-center mb-3'>Manage Your Report</h1>
        </div>
        <div className='text-center mb-3'>
          <div className='row justify-content-center align-items-center'>
            <div className='col-md-auto'>
              From:   <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat='dd/MM/yyyy'
                placeholderText='Select a date'
                className='datepicker mx-2 narrow-datepicker form-control'
              />
            </div>
            <div className='col-md-auto'>
              To:  <DatePicker
                selected={selectedDate2}
                onChange={handleDateChange2}
                dateFormat='dd/MM/yyyy'
                placeholderText='Select a date'
                className='datepicker mx-2 narrow-datepicker form-control'
              />
            </div>
            <div className='col-md-auto'>
              <button
                className='btn btn-large btn-dark btn-sm mb-2'
                onClick={() => filterDataByDate(selectedDate, selectedDate2)}
              >
                Search
              </button>
            </div>
            <div className='row justify-content-center align-items-center d-flex mt-3'>
              {/* <div className='col-md-auto mb-2'>
                <button className='btn btn-sm btn-dark' disabled>
                  PDF
                </button>
              </div> */}
              <div className='col-md-auto mb-2'>
                <CSVLink
                  data={data().rows}
                  filename={'report.xls'}
                  className='btn btn-sm btn-dark'
                >
                  Excel
                </CSVLink>
              </div>
              <div className='col-md-auto mb-2'>
                <CSVLink
                  data={data().rows}
                  filename={'report.csv'}
                  className='btn btn-sm btn-dark'
                >
                  CSV
                </CSVLink>
              </div>
              <div className='col-md-auto mb-2'>
                <button
                  className='btn btn-sm btn-dark'
                  onClick={handlePdfDownload}
                >
                  PDF
                </button>
              </div>
            </div>

          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
            <select className="select" style={{
              border: 'none', background: 'none', color: 'black', padding: '5px'
            }}
              onChange={handleCompanyChange}
              value={selectedCompany}
            >
              <option value="">Select company</option>
              {companydetails?.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.companyname}
                </option>
              ))}
            </select>

            <select className="select" style={{ border: 'none', background: 'none', color: 'black', padding: '5px' }}
              onChange={handleServiceChange}
              value={selectedService}
            >
              <option value="">Select service</option>
              {serviceDetails?.map((service) => (
                <option key={service._id} value={service.id}>
                  {service.servicename}
                </option>
              ))}
            </select>

          </div>
        </div>

        <div className='custom-datatable-container'> {/* Add a container for the table */}
          <CDBContainer>
            <CDBCard>
              <CDBCardBody>
                <div className='custom-datatable-scrollable'> {/* Add a scrollable wrapper */}
                  <CDBDataTable
                    striped
                    bordered
                    hover
                    entriesOptions={[5, 20, 25]}
                    entries={5}
                    pagesAmount={4}
                    data={data()}
                    className="custom-datatable" // Add a custom class name to the table
                  />
                </div>
              </CDBCardBody>
            
            </CDBCard>
          </CDBContainer>
        </div>
      </div>


    </>

  );
};

export default Reportpage;
