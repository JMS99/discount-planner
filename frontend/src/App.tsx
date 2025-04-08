import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/Navbar";
import InstallPWA from "./components/InstallPWA";
import OfflineAlert from "./components/OfflineAlert";
import Home from "./pages/Home";
import Discounts from "./pages/Discounts";
import Accounts from "./pages/Accounts";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discounts" element={<Discounts />} />
          <Route path="/accounts" element={<Accounts />} />
        </Routes>
        <InstallPWA />
        <OfflineAlert />
      </Router>
    </ThemeProvider>
  );
}

export default App;
