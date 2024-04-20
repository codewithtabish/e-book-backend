import app from './src/app';
import { config } from './src/config/config';
import connectWithDB from './src/config/db';

const startServer = async () => {
  await connectWithDB();
  const PORT = config.PORT || 9000;

  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
};

startServer();
