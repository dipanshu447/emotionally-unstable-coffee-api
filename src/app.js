import express from 'express';
import routes from './route.js';

const app = express();

app.use(express.json());
app.use("/", routes);

export default app;