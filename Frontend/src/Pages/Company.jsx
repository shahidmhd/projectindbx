
import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Companycreation from '../Components/CompanyCreation/Companycreation'
import { getallcompanies, getnotdeletedallcompanies } from '../apicalls/Company'
import Loading from './Loading'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setLogout } from '../Redux/Authslice'


const Company = () => {
  const dispatch=useDispatch()
  const [company, setcompany] = useState([])
  const [render, setrender] = useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getallcompany()
  }, [render])

  const getallcompany = async () => {
    try {
      setLoading(true);
      const response = await getnotdeletedallcompanies()
      if (response.success) {
        setcompany(response.Data)
        setLoading(false)
      } else {
        if(response.message==="invalid token please login"){
          toast.error(response.message)
          dispatch(setLogout())
        }
        // toast.error(response.message)


      }
    } catch (err) {
      toast.error("err.message")
    }

  }


  return (
    <>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          {loading ? <Loading /> : null}
         {!loading&& <Companycreation Company={company} render={render} setrender={setrender} />}
        </div>
      </div>
    </>

  )
}

export default Company
