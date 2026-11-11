import 'dotenv/config';
const database = new URL(
  process.env.DATABASE_URL ?? 'http://unconfigured.invalid',
);
if (
  !['localhost', '127.0.0.1', '[::1]'].includes(database.hostname) ||
  database.pathname !== '/ischoolie_dev'
)
  throw new Error(
    'Authentication integration tests require the local ischoolie_dev database. No remote database tests are permitted.',
  );
