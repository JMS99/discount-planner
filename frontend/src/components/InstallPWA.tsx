import { useState, useEffect } from "react";
import { Snackbar, Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  "& .MuiSnackbarContent-root": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    maxWidth: "100%",
    width: "100%",
  },
}));

const InstallPWA = () => {
  const [showInstall, setShowInstall] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevenir que Chrome muestre automáticamente el mini-infobar
      e.preventDefault();
      // Guardar el evento para que podamos activarlo más tarde
      setDeferredPrompt(e);
      // Mostrar nuestro banner de instalación
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Mostrar el prompt de instalación
    deferredPrompt.prompt();

    // Esperar a que el usuario responda al prompt
    const { outcome } = await deferredPrompt.userChoice;

    // Limpiar el prompt guardado
    setDeferredPrompt(null);
    setShowInstall(false);

    console.log(`User response to the install prompt: ${outcome}`);
  };

  const handleClose = () => {
    setShowInstall(false);
  };

  return (
    <StyledSnackbar
      open={showInstall}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={handleClose}
      message={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography variant="body1">
            Instala Discount Planner para acceder rápidamente
          </Typography>
          <Box>
            <Button color="inherit" onClick={handleClose} sx={{ mr: 1 }}>
              Más tarde
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleInstallClick}
            >
              Instalar
            </Button>
          </Box>
        </Box>
      }
    />
  );
};

export default InstallPWA;
