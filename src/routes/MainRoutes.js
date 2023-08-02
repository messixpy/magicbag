import React, { lazy, Suspense } from 'react';
import { Route, Routes,Navigate } from 'react-router-dom';
import Slidebar from '../components/slidebar/Slidebar';

// Lazy loading for pages
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const Claim = lazy(() => import('../pages/claim/Claim'));
const Incinerator = lazy(() => import('../pages/incinerator/Incinerator'));
const Treasury = lazy(() => import('../pages/treasury/Treasury'));
const Staking = lazy(() => import('../pages/staking/Staking'));

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/"element={<Navigate to="dashboard" />} />
      <Route path="/dashboard" element={<Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense>} />
      <Route path="/claim" element={<Suspense fallback={<div>Loading...</div>}><Claim /></Suspense>} />
      <Route path="/incinerator" element={<Suspense fallback={<div>Loading...</div>}><Incinerator /></Suspense>} />
      <Route path="/treasury" element={<Suspense fallback={<div>Loading...</div>}><Treasury /></Suspense>} />
      <Route path="/staking" element={<Suspense fallback={<div>Loading...</div>}><Staking /></Suspense>} />
    </Routes>
  );
};

export default MainRoutes;
