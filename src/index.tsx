import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import './scss/2cexy.scss';
import { ToastProvider} from 'react-toast-notifications';
import Modal from 'react-modal';
Modal.setAppElement(document.getElementById('root') as HTMLElement);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <HashRouter>
    <ScrollToTop />
    <ToastProvider>
      <HomePage />
    </ToastProvider>
  </HashRouter>,
);
