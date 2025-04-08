import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Discount Planner
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Inicio
          </Button>
          <Button color="inherit" component={RouterLink} to="/discounts">
            Descuentos
          </Button>
          <Button color="inherit" component={RouterLink} to="/accounts">
            Mis Cuentas
          </Button>
          <Button color="inherit" component={RouterLink} to="/profile">
            Perfil
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
