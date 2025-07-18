import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Homepage from "pages/homepage";
import AccountDashboard from "pages/account-dashboard";
import PremiumFeatures from "pages/premium-features";
import KnowledgeBase from "pages/knowledge-base";
import DownloadCenter from "pages/download-center";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/account-dashboard" element={<AccountDashboard />} />
        <Route path="/premium-features" element={<PremiumFeatures />} />
        <Route path="/knowledge-base" element={<KnowledgeBase />} />
        <Route path="/download-center" element={<DownloadCenter />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;