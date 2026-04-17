import { Outlet } from 'react-router-dom'
import Header from '../UI/Header'

const AppLayout = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
    </div>
  )
}

export default AppLayout