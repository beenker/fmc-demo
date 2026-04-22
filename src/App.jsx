import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Pakketten from './pages/Pakketten';
import Keuzehulp from './pages/Keuzehulp';
import KeuzehulpFilter from './pages/Keuzehulp-filter';
import Assistant from "./pages/Assistant";
import Configurator from "./pages/Configurator";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-slate-900 font-sans">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pakketten" element={<Pakketten />} />
          <Route path="/keuzehulp" element={<Keuzehulp />} />
          <Route path="/keuzehulp-filter" element={<KeuzehulpFilter />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/configurator" element={<Configurator />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}