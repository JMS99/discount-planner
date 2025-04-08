import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Bienvenido a Discount Planner
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Organiza y maximiza tus descuentos en un solo lugar
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid component="div" item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                Mis Descuentos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Revisa todos los descuentos disponibles para tus cuentas y
                tarjetas.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate("/discounts")}>
                Ver Descuentos
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid component="div" item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                Mis Cuentas
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gestiona tus cuentas bancarias, tarjetas y fintechs.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate("/accounts")}>
                Gestionar Cuentas
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid component="div" item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                Calendario
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Planifica tus compras según los descuentos disponibles por día.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate("/calendar")}>
                Ver Calendario
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
