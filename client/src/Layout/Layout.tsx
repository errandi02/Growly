import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = () => {
  return (
    <div className="App">
      <Header />
      <Outlet />
   

 
    </div>
  );
};

export default Layout;
