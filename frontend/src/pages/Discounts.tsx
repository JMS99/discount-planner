import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import axios from "axios";

interface Discount {
  id: number;
  institution_name: string;
  category: string;
  description: string;
  discount_percentage: number;
  day_of_week?: number;
  start_date?: string;
  end_date?: string;
}

const Discounts = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/discounts");
      setDiscounts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching discounts:", error);
      setLoading(false);
    }
  };

  const categories = ["all", ...new Set(discounts.map((d) => d.category))];

  const filteredDiscounts =
    selectedCategory === "all"
      ? discounts
      : discounts.filter((d) => d.category === selectedCategory);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Descuentos Disponibles
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={selectedCategory}
          onChange={(_, newValue: string) => setSelectedCategory(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {categories.map((category) => (
            <Tab
              key={category}
              label={category === "all" ? "Todos" : category}
              value={category}
            />
          ))}
        </Tabs>
      </Box>

      {loading ? (
        <Typography>Cargando descuentos...</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredDiscounts.map((discount) => (
            <Grid item xs={12} sm={6} md={4} key={discount.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {discount.institution_name}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {discount.category}
                  </Typography>
                  <Typography variant="body2">
                    {discount.description}
                  </Typography>
                  <Typography variant="h5" color="primary" sx={{ mt: 2 }}>
                    {discount.discount_percentage}% OFF
                  </Typography>
                  {discount.day_of_week && (
                    <Typography variant="body2" color="text.secondary">
                      Día:{" "}
                      {
                        [
                          "Domingo",
                          "Lunes",
                          "Martes",
                          "Miércoles",
                          "Jueves",
                          "Viernes",
                          "Sábado",
                        ][discount.day_of_week]
                      }
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button size="small">Ver Detalles</Button>
                  <Button size="small" color="primary">
                    Aplicar Descuento
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Discounts;
