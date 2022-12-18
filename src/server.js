const App = require('./app');

init();

async function init() {
  try {
    const app = new App();
    await app.start(3001);
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
