import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Pakketten from './pages/Pakketten';
import Keuzehulp from './pages/Keuzehulp';
import Assistant from "./pages/Assistant";


export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-slate-900 font-sans">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pakketten" element={<Pakketten />} />
          <Route path="/keuzehulp" element={<Keuzehulp />} />
          <Route path="/assistant" element={<Assistant />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}