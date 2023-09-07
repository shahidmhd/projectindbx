import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Details from '../Components/Details/Details'
import { getallcompanies } from '../apicalls/Company'
import { getallServices } from '../apicalls/Service'
import { useParams } from 'react-router-dom'
import { getselectedinvioce } from '../apicalls/Invoice';

const Detailpage = () => {
  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);
  const [companydetails, setcompanydetails] = useState([]);
  const [servicedetails, setservicedetails] = useState([]);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await getselectedinvioce(id);
        setInvoiceData(response.Data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInvoiceData();
  }, [id]);

  useEffect(() => {
    getcomapanydata()
    getServicedata()
  }, [])


  const getcomapanydata = async () => {
    const response = await getallcompanies()
    setcompanydetails(response.Data)
  }

  const getServicedata = async () => {
    const responseservice = await getallServices()
    setservicedetails(responseservice.Data)
  }



  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '0 0 auto' }}>
          <Sidebar />
        </div>
        <div style={{ flex: '1', overflowY: 'scroll' }}>
          {invoiceData && <Details companydetails={companydetails} servicedetails={servicedetails} invoiceData={invoiceData} />}
        </div>
      </div>

    </>
  )
}

export default Detailpage



