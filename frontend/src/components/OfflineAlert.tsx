import { useState, useEffect } from "react";
import { Snackbar, Alert, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  "& .MuiAlert-root": {
    width: "100%",
    borderRadius: theme.shape.borderRadius,
  },
}));

const OfflineAlert = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowAlert(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowAlert(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <StyledSnackbar
      open={showAlert}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={isOnline ? 3000 : null}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={isOnline ? "success" : "warning"}
        variant="filled"
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1">
            {isOnline
              ? "¡Conexión restaurada! Los datos se sincronizarán automáticamente."
              : "Estás offline. Algunas funciones pueden estar limitadas."}
          </Typography>
        </Box>
      </Alert>
    </StyledSnackbar>
  );
};

export default OfflineAlert;
