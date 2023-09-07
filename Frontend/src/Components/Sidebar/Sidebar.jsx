import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch}from 'react-redux'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';
import { setLogout } from '../../Redux/Authslice';


const Sidebar = () => {
  const dispatch=useDispatch()
  const navigate = useNavigate()
  const handlelogout = () => {
    // localStorage.removeItem('token')
    dispatch(setLogout())
    // navigate('/login')
  }

  const handleHomeClick = () => {
    navigate('/')
  }

  const handleClientsClick = () => {
    navigate('/company')
  };

  const handleServicesClick = () => {
    // Code to handle click on "Services" menu item
    navigate('/Service')
  };

  const handleInvoiceClick = () => {
    // Code to handle click on "Invoice" menu item
    navigate('/invoice')
  };

  const handleInvoictableclick=()=>{
    navigate('/table')
  }

  const handleReportclick=()=>{
    navigate('/Report')
  }

  const handlechangepassword=()=>{
    navigate('/change-password')
  }




  return (
    <div style={{ height: '100vh', position: 'sticky', top: 0 }}>
      <CDBSidebar>
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}
          style={{ cursor: 'pointer' }} ><span onClick={handleHomeClick}>Home</span></CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            {/* Add onClick handlers to each SidebarMenuItem */}
            <CDBSidebarMenuItem icon="th-large" onClick={handleClientsClick}>
              Company
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="th-large" onClick={handleServicesClick}>
              Services
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="th-large" onClick={handleInvoiceClick}>
             Create Invoice
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="th-large" onClick={handleInvoictableclick}>
              Invoice Details
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="th-large" onClick={handleReportclick}>
              Report
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
        <CDBSidebarMenuItem icon="th-large" onClick={handlechangepassword}>
              Change password
            </CDBSidebarMenuItem>
          <div className="sidebar-btn-wrapper" style={{ padding: '20px 5px' }}>
            <CDBSidebarMenu>
              <CDBSidebarMenuItem icon="credit-card" iconType="solid" onClick={handlelogout} >
                logout
              </CDBSidebarMenuItem>
            </CDBSidebarMenu>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
