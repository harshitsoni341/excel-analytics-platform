const multer = require('multer');
const XLSX = require('xlsx');
const File = require('../models/File');

const storage = multer.memoryStorage();
const upload = multer({ storage }).single('file');

exports.uploadFile = (req, res) => {
  upload(req, res, async function (err) {
    if (err || !req.file) return res.status(400).json({ error: "File error" });

    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    const saved = await File.create({
      userId: req.user.id,
      fileName: req.file.originalname,
      data
    });

    res.json({ message: "File uploaded", file: saved });
  });
};

exports.getHistory = async (req, res) => {
  const files = await File.find({ userId: req.user.id });
  res.json(files);
};
