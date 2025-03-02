const app = require('./app');
const initialize = require('./config/database').initialize;

const PORT = 3001;

app.listen(PORT, async () => {
  console.log(`Server running on port  ${PORT}`);

  try {
    await initialize();
  } catch (error) {
    console.log('Error connecting to the database:', error);
  }
});
