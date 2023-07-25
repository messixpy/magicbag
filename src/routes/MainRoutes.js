import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Dashboard from '../pages/dashboard/Dashboard'
import Claim from '../pages/claim/Claim'
import Incinerator from '../pages/incinerator/Incinerator'
import Treasury from '../pages/treasury/Treasury'
import Staking from '../pages/staking/Staking'
import Slidebar from '../components/slidebar/Slidebar'

const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Slidebar/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/claim' element={<Claim/>}/>
        <Route path='/incinerator' element={<Incinerator/>}/>
        <Route path='/treasury' element={<Treasury/>}/>
        <Route path='/staking' element={<Staking/>}/>
    </Routes>
  )
}
export default MainRoutes