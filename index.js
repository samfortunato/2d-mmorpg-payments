const { fastify } = require('fastify');
const fastifyCors = require('fastify-cors');
const { Stripe } = require('stripe');

const server = fastify({ logger: true });
const stripe = new Stripe('sk_test_qmOUTLgYKZEOTk74EyRGvd9D', { apiVersion: '2020-08-27' });

server.register(fastifyCors, {
  origin: [
    'http://localhost:8080',
    'http://superatomic.net',
  ],
});

server.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: '2D MMORPG Subscription',
        },
        unit_amount: 500,
      },
      quantity: 1,
    }],
    mode: 'payment',
    // success_url: 'http://localhost:8080', // local
    // cancel_url: 'http://localhost:8080', // local
    success_url: 'http://superatomic.net', // prod lol
    cancel_url: 'http://superatomic.net', // prod lol
  });

  return { id: session.id };
});

server.get('/health', async (_, res) => {
  res
    .code(200)
    .send();
});

const start = async () => {
  try {
    await server.listen(8082, '0.0.0.0');
  } catch (err) {
    server.log.error(err);

    process.exit(1);
  }
};

start();
