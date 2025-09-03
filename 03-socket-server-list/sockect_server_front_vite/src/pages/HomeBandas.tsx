import {Navbar} from '../components/UI/Navbar'
import {Bandas} from '../components/Bands/Bandas'
import {AddBands} from '../components/Bands/AddBands'
import {StatsCards} from '../components/UI/StatsCards'


export const HomeBandas = () => {
  return (

    <div className='min-vh-100 bg-light'>
      {/* Header */}
      <Navbar/>
      {/* Main Content */}
      <div className='container py-5'>
        <div className='row g-4'>
          {/* Band List Section HomeBandas */}
          <Bandas />
          {/* Add Band Section */}
          <div className='col-lg-4'>
            <AddBands />
            {/* Stats Card */}
            <StatsCards />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeBandas
