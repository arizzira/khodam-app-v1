// 1. Load Environment Variables paling atas
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// 2. Middleware
app.use(cors()); // Agar bisa diakses dari Frontend (Vercel/Localhost)
app.use(express.json()); // Agar bisa baca JSON dari body request

// 3. Test Route (Untuk ngecek server nyala atau ngga)
app.get('/', (req, res) => {
  res.send('Server Cek Khodam Merah Putih is Running!');
});

// 4. Endpoint Utama: Cek Khodam
app.post('/api/cek-khodam', async (req, res) => {
  const { nama, tglLahir, hobby } = req.body;

  // Validasi input sederhana
  if (!nama || !tglLahir) {
    return res.status(400).json({ 
      success: false, 
      message: "Nama dan Tanggal Lahir wajib diisi!" 
    });
  }

  try {
    // Logic: Ambil 1 data random dari database
    // Kita hitung dulu total data ada berapa
    const count = await prisma.khodam.count();
    
    if (count === 0) {
        return res.status(404).json({ message: "Database Khodam masih kosong. Harap seed data dulu." });
    }

    // Generate angka random berdasarkan jumlah data
    const skip = Math.floor(Math.random() * count);
    
    const randomKhodam = await prisma.khodam.findFirst({
      take: 1,
      skip: skip,
    });

    // Kirim response
    res.json({
      success: true,
      data: {
        user: { nama, tglLahir, hobby },
        khodam: randomKhodam
      }
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Terjadi kesalahan pada server." 
    });
  }
});

// 5. Jalankan Server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});