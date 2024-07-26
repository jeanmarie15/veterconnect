require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const morgan=require('morgan');

// Configuraciones
app.set('port', process.env.PORT || 9000);
app.set('json spaces', 2)

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Routes
// Importar rutas
const indexRoutes = require('./routes');
const userRoutes = require('./routes/users');
const petRoutes = require('./routes/pets');
const appointmentRoutes = require('./routes/appoiments');
const companyRoutes = require('./routes/company');
const licenseRoutes = require('./routes/licenses');
const ownerRoutes = require('./routes/owners');
const settingsRoutes = require('./routes/settings');
const authRoutes = require('./routes/authenticate');
const accountRoutes = require('./routes/account');
const vaccineRoutes = require('./routes/vaccines');
const dewormerRoutes = require('./routes/dewormer');
const examRoutes = require('./routes/exams');

// Usar rutas
app.use(indexRoutes);
// Servir imágenes como archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/license', licenseRoutes);
app.use('/owner', ownerRoutes);
app.use('/auth', authRoutes);
app.use('/account', accountRoutes);
app.use('/settings', settingsRoutes);
app.use('/vaccine', vaccineRoutes);
app.use('/dewormer', dewormerRoutes);
app.use('/exam', examRoutes);


app.use('/user', userRoutes);
app.use('/pet', petRoutes);
app.use('/appoiments', appointmentRoutes);
app.use('/company', companyRoutes);
app.use('/settings', settingsRoutes);





//Iniciando el servidor, escuchando...
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});