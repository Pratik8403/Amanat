import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MobileFrame from './components/ui/MobileFrame';
import Landing from './components/Landing';
import OwnerPage from './pages/OwnerPage';
import NomineePage from './pages/NomineePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MobileFrame>
              <Landing />
            </MobileFrame>
          }
        />
        <Route path="/owner" element={<OwnerPage />} />
        <Route path="/nominee" element={<NomineePage />} />
      </Routes>
    </BrowserRouter>
  );
}
