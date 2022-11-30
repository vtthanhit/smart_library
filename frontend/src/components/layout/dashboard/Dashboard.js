import DashboardBookRequest from './components/DashboardBookResquest';
import Breadcrumbs from '../Breadcrumbs';

const Dashboard = () => {
  return (
    <div className='pb-0 w-full flex items-stretch flex-auto flex-col justify-between'>
      <div className='py-6 flex-grow xs:px-2 xxl:max-w-1400 w-full mr-auto ml-auto'>
        <div className='flex justify-between items-center'>
          <Breadcrumbs />
        </div>
        <DashboardBookRequest />
      </div>
    </div>
  )
}

export default Dashboard