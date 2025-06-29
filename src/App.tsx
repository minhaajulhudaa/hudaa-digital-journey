
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SiteProvider } from "@/hooks/useSite";
import { ThemeProvider } from "@/hooks/useTheme";
import Layout from "@/components/Layout";
import SiteLayout from "@/components/SiteLayout";
import Index from "./pages/Index";
import SiteRegistration from "./pages/SiteRegistration";
import SiteIndex from "./pages/SiteIndex";
import SitePackages from "./pages/SitePackages";
import SiteBlog from "./pages/SiteBlog";
import SiteCourses from "./pages/SiteCourses";
import SiteEvents from "./pages/SiteEvents";
import SiteKnowledgeBase from "./pages/SiteKnowledgeBase";
import SiteAbout from "./pages/SiteAbout";
import SiteContact from "./pages/SiteContact";
import SiteLogin from "./pages/SiteLogin";
import SiteAdmin from "./pages/SiteAdmin";
import SiteBooking from "./pages/SiteBooking";
import Packages from "./pages/Packages";
import Blog from "./pages/Blog";
import Courses from "./pages/Courses";
import Events from "./pages/Events";
import KnowledgeBase from "./pages/KnowledgeBase";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Booking from "./pages/Booking";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SiteProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Main Platform Routes */}
                <Route path="/" element={
                  <Layout>
                    <Index />
                  </Layout>
                } />
                <Route path="/register-site" element={
                  <Layout>
                    <SiteRegistration />
                  </Layout>
                } />
                <Route path="/packages" element={
                  <Layout>
                    <Packages />
                  </Layout>
                } />
                <Route path="/blog" element={
                  <Layout>
                    <Blog />
                  </Layout>
                } />
                <Route path="/courses" element={
                  <Layout>
                    <Courses />
                  </Layout>
                } />
                <Route path="/events" element={
                  <Layout>
                    <Events />
                  </Layout>
                } />
                <Route path="/knowledge-base" element={
                  <Layout>
                    <KnowledgeBase />
                  </Layout>
                } />
                <Route path="/about" element={
                  <Layout>
                    <About />
                  </Layout>
                } />
                <Route path="/contact" element={
                  <Layout>
                    <Contact />
                  </Layout>
                } />
                <Route path="/login" element={
                  <Layout>
                    <Login />
                  </Layout>
                } />
                <Route path="/admin" element={
                  <Layout>
                    <Admin />
                  </Layout>
                } />
                <Route path="/booking" element={
                  <Layout>
                    <Booking />
                  </Layout>
                } />
                <Route path="/terms" element={
                  <Layout>
                    <Terms />
                  </Layout>
                } />
                <Route path="/privacy" element={
                  <Layout>
                    <Privacy />
                  </Layout>
                } />

                {/* Site-specific Routes */}
                <Route path="/:siteSlug" element={
                  <SiteLayout>
                    <SiteIndex />
                  </SiteLayout>
                } />
                <Route path="/:siteSlug/packages" element={
                  <SiteLayout>
                    <SitePackages />
                  </SiteLayout>
                } />
                <Route path="/:siteSlug/blog" element={
                  <SiteLayout>
                    <SiteBlog />
                  </SiteLayout>
                } />
                <Route path="/:siteSlug/courses" element={
                  <SiteLayout>
                    <SiteCourses />
                  </SiteLayout>
                } />
                <Route path="/:siteSlug/events" element={
                  <SiteLayout>
                    <SiteEvents />
                  </SiteLayout>
                } />
                <Route path="/:siteSlug/knowledge-base" element={
                  <SiteLayout>
                    <SiteKnowledgeBase />
                  </SiteLayout>
                } />
                <Route path="/:siteSlug/about" element={
                  <SiteLayout>
                    <SiteAbout />
                  </SiteLayout>
                } />
                <Route path="/:siteSlug/contact" element={
                  <SiteLayout>
                    <SiteContact />
                  </SiteLayout>
                } />
                <Route path="/:siteSlug/login" element={
                  <SiteLayout>
                    <SiteLogin />
                  </SiteLayout>
                } />
                <Route path="/:siteSlug/admin" element={
                  <SiteLayout>
                    <SiteAdmin />
                  </SiteLayout>
                } />
                <Route path="/:siteSlug/booking" element={
                  <SiteLayout>
                    <SiteBooking />
                  </SiteLayout>
                } />

                {/* Catch-all route for 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </SiteProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
