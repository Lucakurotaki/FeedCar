import cors from 'cors';
import express from 'express';
import './src/infrastructure/persistence/firestore/index';
import routes from './src/presentation/routes/index';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3000, ()=>{
    console.log('FeedCar is running on port 3000.');
})