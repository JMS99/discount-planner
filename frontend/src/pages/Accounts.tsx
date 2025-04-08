import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import axios from "axios";

interface Account {
  id: number;
  institution_name: string;
  institution_type: string;
  account_type: string;
  account_number: string;
}

const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newAccount, setNewAccount] = useState({
    institution_id: "",
    account_type: "",
    account_number: "",
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/accounts/user/1"
      ); // TODO: Replace with actual user ID
      setAccounts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching accounts:", error);
      setLoading(false);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/api/accounts", {
        ...newAccount,
        user_id: 1, // TODO: Replace with actual user ID
      });
      fetchAccounts();
      handleClose();
      setNewAccount({
        institution_id: "",
        account_type: "",
        account_number: "",
      });
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Mis Cuentas
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ mb: 3 }}
      >
        Agregar Nueva Cuenta
      </Button>

      {loading ? (
        <Typography>Cargando cuentas...</Typography>
      ) : (
        <Grid container spacing={3}>
          {accounts.map((account) => (
            <Grid item xs={12} sm={6} md={4} key={account.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {account.institution_name}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {account.institution_type}
                  </Typography>
                  <Typography variant="body2">
                    Tipo: {account.account_type}
                  </Typography>
                  <Typography variant="body2">
                    Número: {account.account_number}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Ver Descuentos</Button>
                  <Button size="small" color="error">
                    Eliminar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Nueva Cuenta</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Institución"
            value={newAccount.institution_id}
            onChange={(e) =>
              setNewAccount({ ...newAccount, institution_id: e.target.value })
            }
            sx={{ mt: 2 }}
          >
            <MenuItem value="1">Banco 1</MenuItem>
            <MenuItem value="2">Banco 2</MenuItem>
            <MenuItem value="3">Fintech 1</MenuItem>
          </TextField>
          <TextField
            select
            fullWidth
            label="Tipo de Cuenta"
            value={newAccount.account_type}
            onChange={(e) =>
              setNewAccount({ ...newAccount, account_type: e.target.value })
            }
            sx={{ mt: 2 }}
          >
            <MenuItem value="SAVINGS">Cuenta de Ahorros</MenuItem>
            <MenuItem value="CHECKING">Cuenta Corriente</MenuItem>
            <MenuItem value="CREDIT">Tarjeta de Crédito</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Número de Cuenta"
            value={newAccount.account_number}
            onChange={(e) =>
              setNewAccount({ ...newAccount, account_number: e.target.value })
            }
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Accounts;
