import express from 'express';
import menuRoutes from './routes/menuRoutes.js';
import typeRoutes from './routes/typeRoutes.js';

const app = express();

app.use(express.json());

app.use('/api/menus', menuRoutes);
app.use('/api/types', typeRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
