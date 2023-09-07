import React, { useEffect } from 'react'
import Bill from '../Components/Billpage/Bill'
import Sidebar from '../Components/Sidebar/Sidebar'
import { getallcompanies, getnotdeletedallcompanies } from '../apicalls/Company';
import { getallServices } from '../apicalls/Service';
import { getallinvoices } from '../apicalls/Invoice';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogout } from '../Redux/Authslice';

const Billing = () => {
  const dispatch =useDispatch()
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [companydetails, setCompanydetails] = useState([]);
  const [servicedetails, setServicedetails] = useState([]);
  const [loading, setLoading] = useState(true);


  const getCompanyData = async () => {
    const response = await getnotdeletedallcompanies();
    setCompanydetails(response.Data);
  };

  const getServiceData = async () => {
    const responseService = await getallServices();
    setServicedetails(responseService.Data);
  };

  const getallInvoices = async () => {
    const response = await getallinvoices()
    if (response.success) {
      const invoiceCounter = response.Data.length + 1;
      const formattedCounter = invoiceCounter.toString().padStart(2, '0');
      const newInvoiceNumber = `B2C${formattedCounter}`;
      setInvoiceNumber(newInvoiceNumber);
    } else {
      if(response.message==="invalid token please login"){
        toast.error(response.message)
        dispatch(setLogout())
      }
      //  toast.error("invoices is not getting")
    }

  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await Promise.all([getCompanyData(), getServiceData(), getallInvoices()]);
      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '0 0 auto' }}>
          <Sidebar />
        </div>
        <div style={{ flex: '1', overflowY: 'scroll' }}>
          <Bill invoiceNumber={invoiceNumber} companydetails={companydetails} servicedetails={servicedetails} />
        </div>
      </div>

    </>
  )
}

export default Billing
