const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
const port = 3002;

const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.use(cors()); 

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Файл не загружен' });
  }

  // Генерируем URL для доступа к загруженному файлу
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.originalname}`;

  res.json({ message: 'Файл успешно загружен', fileUrl });
});


app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});