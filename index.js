const { fastify } = require('fastify');

const server = fastify({ logger: true });

server.get('/', async (req, res) => {
  return { test: 'penis' };
});

const start = async () => {
  try {
    await server.listen(8082);
  } catch (err) {
    server.log.error(err);

    process.exit(1);
  }
};

start();
