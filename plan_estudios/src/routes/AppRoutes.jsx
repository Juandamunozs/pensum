// npm install react-router-dom

import { Routes, Route, Navigate } from 'react-router-dom';
import Pensum from '../pages/Pensum';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Plan_de_estudios" />} />
      <Route path="/Plan_de_estudios" element={<Pensum />} />
    </Routes>
  );
}
