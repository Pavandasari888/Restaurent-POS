
     const express = require('express');
     const cors = require('cors');
     const path = require('path');
     const analyticsRoutes = require('./routes/analytics');
     const tableRoutes = require('./routes/tables');
     const chefRoutes = require('./routes/chefs');
     const connectDB = require('./data/db');
     require('dotenv').config();

     
     

     const app = express();
     const PORT = 5000;

     connectDB();


     app.use(cors());
     app.use(express.json());
     


     app.use('/assets', express.static(path.join(__dirname, 'assets')));
     app.use('/api/analytics', analyticsRoutes);
     app.use('/api/tables', tableRoutes);
     app.use('/api/chefs', chefRoutes);


     const menuRoutes = require('./routes/menu');
     app.use('/api/menu', menuRoutes);

     const orderRoutes = require('./routes/order');
     app.use('/api/orders', orderRoutes);


     app.get('/', (req, res) => {
     res.send('API is running...');
     });

     app.listen(PORT, () => {
     console.log(`Server is running on http://localhost:${PORT}`);
     });
