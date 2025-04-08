# Discount Planner

Una aplicación para gestionar y planificar descuentos de servicios financieros, bancos, fintechs y tarjetas de crédito.

## Características

- Gestión de cuentas bancarias y tarjetas
- Seguimiento de descuentos disponibles
- Filtrado por categorías y días de la semana
- Interfaz moderna y fácil de usar
- API RESTful con Node.js y Express
- Base de datos MySQL

## Requisitos

- Node.js >= 14
- MySQL >= 8.0
- npm o yarn

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/discount-planner.git
cd discount-planner
```

2. Instalar dependencias del backend:

```bash
npm install
```

3. Configurar la base de datos:

- Crear una base de datos MySQL
- Copiar el archivo `.env.example` a `.env` y configurar las variables de entorno
- Ejecutar el script SQL en `src/database/schema.sql`

4. Instalar dependencias del frontend:

```bash
cd frontend
npm install
```

## Ejecución

1. Iniciar el servidor backend:

```bash
npm run dev
```

2. Iniciar el frontend (en otra terminal):

```bash
cd frontend
npm run dev
```

3. Abrir el navegador en `http://localhost:5173`

## Estructura del Proyecto

```
discount-planner/
├── src/
│   ├── config/
│   ├── database/
│   ├── models/
│   ├── routes/
│   └── server.ts
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
│   └── package.json
├── package.json
└── README.md
```

## API Endpoints

### Usuarios

- GET /api/users - Obtener todos los usuarios
- GET /api/users/:id - Obtener un usuario por ID
- POST /api/users - Crear un nuevo usuario

### Descuentos

- GET /api/discounts - Obtener todos los descuentos
- GET /api/discounts/category/:category - Obtener descuentos por categoría
- GET /api/discounts/day/:dayOfWeek - Obtener descuentos por día
- GET /api/discounts/user/:userId - Obtener descuentos de un usuario

### Cuentas

- GET /api/accounts/user/:userId - Obtener cuentas de un usuario
- POST /api/accounts - Crear una nueva cuenta
- PUT /api/accounts/:id - Actualizar una cuenta
- DELETE /api/accounts/:id - Eliminar una cuenta

## Contribución

1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
