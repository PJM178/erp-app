// import pkg from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();
// const { Pool } = pkg;

// const pool = new Pool({
//   host: process.env.PGHOST,
//   port: process.env.PGPORT ? Number(process.env.PGPORT) : 5000,
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   database: process.env.PGDATABASE,
// });

// export async function connectToDb(retries = 20, delay = 1000) {
//   let retry = 0;
//   let attempt = 1;

//   while (retry < retries) {
//     try {
//       const res = await pool.query('SELECT NOW()');
//       console.log('✅ Connected to PostgreSQL at', res.rows[0].now);
//       break;
//     } catch (err) {
//       console.warn(`Database not ready, retrying - attempt ${attempt}/${retries}`);

//       if (attempt === retries) {
//         console.error(`Could not connect to the PostgreSQL after ${retries} retries`);
//         console.log('\n🧹 Closing database pool...');
//         await pool.end();
//         console.log('👋 Server stopped.');
//         process.exit();
//       }
//     } finally {
//       retry++;
//       attempt++;
//     }

//     await new Promise(res => setTimeout(res, delay));
//   }
// }

// process.on('SIGINT', async () => {
//   console.log('\n🧹 Closing database pool...');
//   await pool.end();
//   console.log('👋 Server stopped.');
//   process.exit(0);
// });

// export default pool;
