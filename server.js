const { Client } = require('pg');
require('dotenv').config(); // Untuk menggunakan variabel dari .env

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

client.connect()
  .then(() => console.log('✅ Connected to Supabase Database!'))
  .catch(err => console.error('❌ Connection error', err.stack));

// Contoh query untuk test koneksi
client.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Query error', err.stack);
  } else {
    console.log('Database Time:', res.rows[0]);
  }
  client.end();
});
