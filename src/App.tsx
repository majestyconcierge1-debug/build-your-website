import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Properties from "./pages/Properties";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import PropertyManagement from "./pages/PropertyManagement";
import PropertyManagementFrance from "./pages/PropertyManagementFrance";
import PropertyManagementItaly from "./pages/PropertyManagementItaly";
import PropertyManagementTunisia from "./pages/PropertyManagementTunisia";
import PropertyManagementUAE from "./pages/PropertyManagementUAE";
import PropertyManagementAlgeria from "./pages/PropertyManagementAlgeria";
import Decoration from "./pages/Decoration";
import Concierge from "./pages/Concierge";
import News from "./pages/News";
import NotFound from "./pages/NotFound";
import WhatsAppButton from "./components/WhatsAppButton";
import CookieConsent from "./components/CookieConsent";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Concierge />} />
              <Route path="/home" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/property-management" element={<PropertyManagement />} />
              <Route path="/property-management/france" element={<PropertyManagementFrance />} />
              <Route path="/property-management/italy" element={<PropertyManagementItaly />} />
              <Route path="/property-management/tunisia" element={<PropertyManagementTunisia />} />
              <Route path="/property-management/uae" element={<PropertyManagementUAE />} />
              <Route path="/property-management/algeria" element={<PropertyManagementAlgeria />} />
              <Route path="/decoration" element={<Decoration />} />
              <Route path="/concierge" element={<Concierge />} />
              <Route path="/news" element={<News />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <WhatsAppButton />
            <CookieConsent />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
