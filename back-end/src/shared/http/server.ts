import 'reflect-metadata';
import 'dotenv/config'
import  app  from './app';
// import { dataSource } from '../Shared/Typeorm';

const port = process.env.PORT || 3000

// dataSource.initialize().then(() => {
//   const server = app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
//   });
// });
