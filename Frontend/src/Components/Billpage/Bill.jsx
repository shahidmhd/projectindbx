import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    MDBCard,
    MDBCardBody,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBTypography,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
} from 'mdb-react-ui-kit';
import { AddINVOICEdata } from '../../apicalls/Invoice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Bill = ({ companydetails, servicedetails, invoiceNumber }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selctedCompantId, setselectedCompanyId] = useState('');
    const [Airwaybillno, setAirwaybillno] = useState('')
    const [tableRows, settableRows] = useState([])
    const [SelectedService, setSelectedService] = useState(null)
    const [SelectedServiceId, setSelectedServiceId] = useState(null)
    const [invoiceData, setinvoiceData] = useState({})
    const [boxNo, setBoxno] = useState('')
    const navigate = useNavigate()

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddRow();
        }
    };


    const handleCompanyChange = (e) => {
        const selectedCompanyId = e.target.value;
        setselectedCompanyId(selectedCompanyId);
    };
    const handleWeightChange = (index, newWeight) => {
        const updatedTableRows = [...tableRows];
        updatedTableRows[index].weight = Number(newWeight);
        settableRows(updatedTableRows);

        // Calculate row total based on new weight and amount
        const rowTotal = newWeight * updatedTableRows[index].amount;
        updatedTableRows[index].total = rowTotal;
    };


    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-based
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }


    const handleamountChange = (index, newamount) => {
        const updatedTableRows = [...tableRows];
        updatedTableRows[index].amount = Number(newamount);
        settableRows(updatedTableRows);

        // Calculate row total based on new weight and amount
        const rowTotal = newamount * updatedTableRows[index].weight;
        updatedTableRows[index].total = rowTotal;
    }


    const handleAddRow = () => {
        settableRows(prevRows => [...prevRows, {
            serviceName: '',
            HSNCode: '',
            weight: 0,
            amount: 0,
            total: 0
        }]);
    };


    const handleDeleteRow = (index) => {
        settableRows((prevRows) => prevRows.filter((_, i) => i !== index));
    };

    const handleServiceChange = (index, serviceId) => {
        const selectedServiceId = serviceId;
        const selectedServiceData = servicedetails.find((service) => service._id === selectedServiceId);
        if (selectedServiceData) {
            const updatedTableRows = [...tableRows]; // Clone the tableRows array
            updatedTableRows[index] = {
                ...updatedTableRows[index],
                id: selectedServiceData._id,
                serviceName: selectedServiceData.servicename,
                HSNCode: selectedServiceData.HSNCode,
                amount: selectedServiceData.Rate,
                total: selectedServiceData.Rate * tableRows[index].weight
            };

            settableRows(updatedTableRows); // Update the tableRows state
            setSelectedService(selectedServiceData);
            setSelectedServiceId(selectedServiceData._id);
        } else {
            // Handle the case when the selected service is not found
            console.log("service is not in there");
        }
    };

    useEffect(() => {
        const subtotal = tableRows.reduce((total, row) => {
            const rowSubtotal = row.total || 0;
            return total + rowSubtotal;
        }, 0);
        const totalWeight = tableRows.reduce((totalWeight, row) => {
            return totalWeight + (row.weight || 0);
        }, 0);

        const gst18 = subtotal * 0.18;
        const CGST = gst18 / 2
        const SGST = gst18 / 2
        const totalAmount = subtotal + gst18

        const updatedInvoiceData = {
            ...invoiceData,
            subtotal: parseFloat(subtotal.toFixed(2)),
            gst18: parseFloat(gst18.toFixed(2)),
            CGST: parseFloat(CGST.toFixed(2)),
            SGST: parseFloat(SGST.toFixed(2)),
            totalAmount: parseFloat(totalAmount.toFixed(2)),
            totalWeight: parseFloat(totalWeight.toFixed(2)),
        };

        setinvoiceData(updatedInvoiceData);

    }, [tableRows]);


    const handleSave = async () => {
        if (!selctedCompantId || selctedCompantId.trim() === "") {
            toast.error("Please select a Company", {
                hideProgressBar: true,
            });
            return;
        }


        if (!boxNo || boxNo.trim() === "") {
            toast.error("Please enter a valid box number", {
                hideProgressBar: true,
            });
            return;
        }

        if (!selectedDate) {
            toast.error("Select Date", {
                hideProgressBar: true,
            });
            return;
        }

        if (!Airwaybillno || Airwaybillno.trim() === "") {
            toast.error("Please enter a valid airway bill number", {
                hideProgressBar: true,
            });
            return;
        }

        if (!SelectedService && tableRows.length <= 0) {
            toast.error("Please select a Service", {
                hideProgressBar: true,
            });
            return;
        }
        if (invoiceData.totalWeight <= 0) {
            toast.error("Please Add weight", {
                hideProgressBar: true,
            });
            return;
        }
        if (invoiceData.subtotal === 0) {
            toast.error("Please select a Service", {
                hideProgressBar: true,
            });
            return;

        }


        const dataToSave = {
            selectedDate: selectedDate,
            date: formatDate(selectedDate),
            selectedCompanyId: selctedCompantId,
            invoiceNumber,
            boxNo,
            airwayBillNo: Airwaybillno,
            tableRows: tableRows,
            subtotal: invoiceData.subtotal,
            gst18: invoiceData.gst18,
            SGST: invoiceData.SGST,
            CGST: invoiceData.CGST,
            totalAmount: invoiceData.totalAmount,
            totalWeight: invoiceData.totalWeight,
        };

        // Use 'dataToSave' to save or process the data as needed
        // Here you can save the data to your backend or do whatever you need with it
        const response = await AddINVOICEdata(dataToSave);
        if (response.success) {
            toast.success('Invoice saved successfully!', {
                hideProgressBar: true,
            });
            navigate('/table')
        }else{
            toast.error("invoice No added ")
        }
        // Add your logic to save the data or perform other actions

        // Example: Clear the form after saving
        setSelectedDate(new Date());
        setselectedCompanyId('');
        setBoxno('');
        setAirwaybillno('');
        settableRows([]);
        // ... (clear other states)

    };



    return (
        <MDBContainer className="py-5">
            <MDBCard style={{ border: '3px solid black' }}>
                <div className="d-flex flex-column flex-md-row" style={{ backgroundColor: "#fff", border: '2px solid black' }}>
                    {/* <div className="bg-primary d-flex align-items-center justify-content-center min-w-10em" style={{ backgroundColor: '#79c8db', height: '12em' }}>
                        {/* hii */}
                    {/* </div> */}
                    <div className="flex-grow-1 d-flex flex-column">
                        <div className="text-center text-white p-3" style={{ backgroundColor: '#79c8db' }}>
                            <h1>INDBX PRIVATE LIMITED</h1>
                        </div>
                        <div className="p-3 d-flex flex-column-reverse flex-md-row justify-content-between">
                            <div className="mb-3 mb-md-0">
                                <p>
                                    KP 14/432, CHULLIKKAPARAMBA,<br />
                                    <span style={{ fontWeight: 300 }}>CHERUVADI, Kozhikode, Kerala, 673661</span>
                                </p>
                                <p>GSTIN:32AAGCI3195M1ZA</p>
                            </div>
                            <div className="date-input mt-3 mt-md-0">
                                <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="dd/MM/yyyy" placeholderText="Select a date" className='datepicker' /><br />
                                <b> Invoice NO:{invoiceNumber ? invoiceNumber : 'B2C01'}</b>
                            </div>
                        </div>
                        {/* <div className="d-none d-md-flex align-items-center justify-content-center min-w-10em hide-on-print" style={{ backgroundColor: '#79c8db', height: '12em' }}> */}
                        {/* hide-on-print */}
                        {/* </div> */}
                    </div>
                </div>

                <MDBCardBody>
                    <MDBRow className="justify-content-center">
                        <MDBCol xl="8">
                            <MDBTypography listUnStyled>
                                <div className="d-md-flex flex-md-row flex-column justify-content-between">
                                    <div className="d-flex flex-column mb-3 me-md-3">
                                        <span className="text-muted fw-bold">Company</span>
                                        <select
                                            className="select form-select mt-1"
                                            value={selctedCompantId}
                                            onChange={handleCompanyChange}
                                        >
                                            <option value="">Select company</option>
                                            {companydetails &&
                                                companydetails.map((item, index) => (
                                                    <option key={index} value={item._id}>
                                                        {item.companyname}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className="d-flex flex-column mb-3 me-md-3">
                                        <span className="text-muted fw-bold">Box No:</span>
                                        <input
                                            type="number"
                                            onChange={(e) => setBoxno(e.target.value)}
                                            value={boxNo}
                                            className="form-control mt-1"
                                            style={{ width: "80px" }} // Adjust the width as needed
                                        />
                                    </div>
                                    <div className="d-flex flex-column mb-3 me-md-3">
                                        <span className="text-muted fw-bold">Total weight:</span>
                                        <div
                                            className="border p-1 mt-1 form-control"
                                            style={{
                                                width: "80px", // Adjust the width as needed
                                                height: "30px",
                                                lineHeight: "1.5",
                                            }}
                                        >
                                            {invoiceData?.totalWeight}
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column mb-3">
                                        <span className="text-muted fw-bold">AirwayBill N.O:</span>
                                        <input
                                            type="number"
                                            onChange={(e) => setAirwaybillno(e.target.value)}
                                            value={Airwaybillno}
                                            className="form-control mt-1"
                                            style={{ width: "80px" }} // Adjust the width as needed
                                        />
                                    </div>
                                </div>
                            </MDBTypography>
                        </MDBCol>
                    </MDBRow>
                    {/* {tableRows.length === 0 && (
                        <div className="my-2 mx-1 d-flex justify-content-end">
                            <button
                                className='btn'
                                size="sm"
                                onClick={handleAddRow}
                            >
                                <MDBIcon style={{ color: 'green' }} fas icon="plus-circle" />
                            </button>
                        </div>
                    )} */}
                    <MDBRow className="my-2 mx-1 justify-content-center">
                        <MDBCol lg="12" className="table-responsive">
                            <MDBTable striped borderless>
                                <MDBTableHead className="text-white" style={{ backgroundColor: "#84B0CA" }}>
                                    <tr>
                                        <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                                            N.O
                                        </th>
                                        <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                                            Service Name
                                        </th>
                                        <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                                            HSN Code
                                        </th>
                                        <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                                            Weight
                                        </th>
                                        <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                                            Amount
                                        </th>
                                        <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                                            Total
                                        </th>
                                        <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                                            Action
                                        </th>
                                        <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                                            Action
                                        </th>

                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody style={{ justifyItems: "center" }}>
                                    {tableRows.map((row, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <select
                                                    className="select"
                                                    style={{
                                                        border: 'none',
                                                        background: 'none',
                                                        color: 'black',
                                                        padding: '5px',
                                                    }}

                                                    onChange={(e) => handleServiceChange(index, e.target.value)}
                                                >
                                                    <option value="">select service</option>
                                                    {servicedetails &&
                                                        servicedetails.map((item) => (
                                                            <option key={item._id} value={item._id}>
                                                                {item.servicename}
                                                            </option>
                                                        ))}
                                                </select>
                                            </td>
                                            <td>{row.HSNCode}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={row.weight ? row.weight : ''}
                                                    onChange={(e) => handleWeightChange(index, e.target.value)}
                                                    onKeyPress={handleEnterKeyPress}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={row.amount ? row.amount : ''}
                                                    onChange={(e) => handleamountChange(index, e.target.value)}
                                                    onKeyPress={handleEnterKeyPress}
                                                />
                                            </td>
                                            <td>{row.total}</td>
                                            <td>
                                                <button
                                                    className='btn'
                                                    size="sm"
                                                    onClick={() => handleDeleteRow(index)}
                                                >
                                                    <MDBIcon style={{ color: 'red' }} fas icon="trash-alt" />
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className='btn'
                                                    size="sm"
                                                    onClick={handleAddRow}
                                                >
                                                    <MDBIcon style={{ color: 'green' }} fas icon="plus-circle" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {tableRows.length === 0 && (
                                        settableRows(prevRows => [...prevRows, {
                                            serviceName: '',
                                            HSNCode: '',
                                            weight: 0,
                                            amount: 0,
                                            total: 0
                                        }])
                                    )}
                                </MDBTableBody>


                            </MDBTable>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol xl="8">
                            <p className="ms-3">Note:</p>
                        </MDBCol>
                        <MDBCol xl="3">
                            <MDBTypography listUnStyled>
                                <li className="text-muted ms-3">
                                    <span className="text-black me-4">SubTotal</span>₹{invoiceData?.subtotal}
                                </li>
                                <li className="text-muted ms-3 mt-2">
                                    <span className="text-black me-4">GST 18%</span>₹{invoiceData?.gst18}
                                </li>
                                <li className="text-muted ms-3 mt-2">
                                    <span className="text-black me-4">SGST 9%</span>₹{invoiceData?.SGST}
                                </li>
                                <li className="text-muted ms-3 mt-2">
                                    <span className="text-black me-4">CGST 9%</span>₹{invoiceData?.CGST}
                                </li>
                            </MDBTypography>
                            <p className="text-black float-start">
                                <span className="text-black me-3">Total Amount</span>
                                <span style={{ fontSize: "25px" }}>₹{invoiceData?.totalAmount}</span>
                            </p>
                        </MDBCol>
                    </MDBRow>
                    <hr style={{ border: '3px solid black' }} />
                    {/* ... (rest of the JSX) */}
                    <MDBRow className="justify-content-center">
                        <MDBCol xl="10" className="text-center mb-3 mb-md-0">
                            <p>Thank you for your purchase</p>
                        </MDBCol>
                        <MDBCol xl="2" className="d-flex justify-content-center">
                            <button
                                className="text-capitalize btn"
                                style={{ backgroundColor: "#60bdf3", color: 'white' }}
                                onClick={handleSave}
                            >
                                <MDBIcon fas icon="save" className="me-2" />
                                SAVE
                            </button>
                        </MDBCol>
                    </MDBRow>

                    {/* ... (rest of the JSX) */}
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    )
}

export default Bill
