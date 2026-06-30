import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DramasGrid from './components/DramasGrid';

function List() {
  return (
    <div>
      <Navbar active="2" />
      <DramasGrid />
      <Footer />
    </div>
  );
}

export default List;