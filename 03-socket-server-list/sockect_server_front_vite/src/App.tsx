
import { HomeBandas } from './components/Bands/HomeBandas'
import AddBands from './components/Bands/AddBands'
import StatsCards from './components/UI/StatsCards'
import Navbar from './components/UI/Navbar'

function App() {

  return (
    <div className='min-vh-100 bg-light'>
      {/* Header */}
      <Navbar/>
      {/* Main Content */}
      <div className='container py-5'>
        <div className='row g-4'>
          {/* Band List Section HomeBandas */}
          <HomeBandas />
          {/* Add Band Section */}
          <div className='col-lg-4'>
            <AddBands />
            {/* Stats Card */}
            <StatsCards />
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default App
