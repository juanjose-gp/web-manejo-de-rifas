import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import AdminLogin from './pages/admin/login';
import AdminDashboard from './pages/admin/dashboard';
import RaffleForm from './components/admin/form_raffle';
import CreateRafflePage from './pages/admin/create_raffle';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Login" element={<AdminLogin/>}/>
        <Route path="Admin" element={<AdminDashboard/>}/>
        <Route path="rifa nueva" element={<RaffleForm/>}/>
        <Route path="/admin/crear rifa" element={<CreateRafflePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
