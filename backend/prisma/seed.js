const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const khodams = [
    { nama: "THE BAHLUL", deskripsi: "entitas penyedot etanol dan penghisap element minyak.", elemen: "minyak" },
    { nama: "THE SAWIT", deskripsi: "Jiwa yang mampu menumbuhkan lahan tanaman surgawi bernama kociose sawit.", elemen: "tanah" },
    { nama: "lukyut", deskripsi: "kebal terhadap tebasan kekuatan manapun menumbuhkan kekuasaan abadi.", elemen: "baja" },
    { nama: "the wi wok the tok", deskripsi: "dapat mengendalikan boneka dan menaikan reputasi kekuasaan dengan cepat.", elemen: "burung" },
   { nama: "the banteng", deskripsi: "bergerak dengan cepat dapat mengendalikan kursi dan menguasai kursi.", elemen: "Api" },
    { nama: "the kuota haji", deskripsi: "teknik memanipulasi jumlah apapun tanpa di ketahui siapapun.", elemen: "kertas" },
    // Tambahkan lebih banyak lagi di sini
  ];

  for (const k of khodams) {
    await prisma.khodam.create({ data: k });
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });