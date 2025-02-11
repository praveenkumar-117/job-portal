
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import RecruiterLogin from './components/RecruiterLogin'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import DashBoard from './pages/DashBoard'
import AddJob from './pages/AddJob'
import ManageJob from './pages/ManageJob'
import ViewApplications from './pages/ViewApplications'
import 'quill/dist/quill.snow.css';

function App() {
  const { showRecruiterLogin } = useContext(AppContext)


  return (
    <>
      {showRecruiterLogin && <RecruiterLogin />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Applications />} />
        <Route path='/dashboard' element={<DashBoard />} >

          <Route path='add-job' element={<AddJob />} />
          <Route path='manage-job' element={<ManageJob />} />
          <Route path='view-applications' element={<ViewApplications />} />

        </Route>



      </Routes>

    </>
  )
}

export default App
