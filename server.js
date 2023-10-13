const express = require('express');
const fileUpload = require('express-fileupload');
const port = 3002;
const cors = require('cors');

const app = express();

app.use(cors()); 
app.use(fileUpload({createParentPath: true}))

app.post('/upload', (req, res) => {

  if (!req.files) {
    return res.status(400).json({msg: "No file uploaded"})
  }

  const file = req.files.file;

  if(!file) return res.json({error: "Incorrect input name"});

  file.mv(`public/uploads/${file.name}`, err => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    console.log('file was uploaded');

    res.json({filePath: `/uploads/${file.name}`})
  })
})

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});