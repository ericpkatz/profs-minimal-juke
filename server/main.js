const PORT = process.env.PORT || 3000;
const server = require('./index')
const {db, syncAndSeed } = require('./db')

const init = async () => {
  try {
    await syncAndSeed();
    server.listen(PORT, () => console.log(`

          Listening on port ${PORT}

          http://localhost:${PORT}/

      `));
  } catch (err) {
    console.log(`There was an error starting up!`, err);
  }
}

init();
