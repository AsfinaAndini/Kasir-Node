const { uploadCover } = require("../utils/upload-util").single("image");
const Food = require("../models/index").food;
const Op = require("sequelize").Op;
const path = require("path");
const fs = require("fs");

//mengeksport variabel supaya bisa digunakan di file lain
exports.getAllFood = async (req, res) => {
  try {
    let foods = await Food.findAll();
    return res.json({
      success: true,
      data: foods,
      message: "All food have been loaded",
    });
  } catch (error) {
    console.error(error);
    res.json({ message: "Internal Server Error" });
  }
};

//mengeksport variabel supaya bisa digunakan di file lain
exports.findFood = async (req, res) => {
  //mengambil kata kunci dengan keyword
  let keyword = req.body.keyword;

  //mencari data
  let foods = await Food.findAll({
    where: {
      [Op.or]: [
        { id: { [Op.substring]: keyword } },
        { name: { [Op.substring]: keyword } },
        { spicy_level: { [Op.substring]: keyword } },
        { price: { [Op.substring]: keyword } },
      ],
    },
  });

  if (foods.length == 0) {
    return res.json({
      success: false,
      message: "Data foods not found",
    });
  }

  //mengirim data
  return res.json({
    success: true,
    data: foods,
    message: "All foods have been loaded",
  });
};

//mengeksport variabel supaya bisa digunakan di file lain
exports.addFood = async (req, res) => {
  try {
    // jalan kan function uploadCover
    uploadCover.single("cover")(req, res, async (error) => {
      // jika ada error
      if (error) return res.json({ message: error });

      //jika tidak ada file yang di uploadCover
      if (!req.file) return res.json({ message: "nothing to upload Photos" });

      //menyiapkan data
      let data = {
        nama: req.body.nama,
        spicy_level: req.body.spicy_level,
        price: req.body.price,
        gambar: req.file.filename,
      };

      //menjalankan proses membuat
      await Food.create(data);
      return res.json({
        success: true,
        data: data,
        message: "All food have been loaded",
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//mengeksport variabel supaya bisa digunakan di file lain
exports.updateFood = async (request, response) => {
  try {
    //menjalankan fungsi uploadCover
    uploadCover.single("image")(request, response, async (error) => {
      //jika ada error
      if (error) return response.json({ message: error });

      //mengambil id menggunakan params
      let id = request.params.id;

      //menyiapkan data buku
      let data = {
        nama: req.body.nama,
        spicy_level: req.body.spicy_level,
        price: req.body.price,
        gambar: req.file.filename,
      };

      //jika ada foto baru
      if (request.file) {
        //mengambil foto lama yang ada di database
        const selectedFood = await Food.findOne({ where: { id: id } });

        // menyimpan foto lama di variabel
        const oldPhoto = selectedFood.cover;

        //menyiapkan nama foto sesuai dengan nama folder
        const pathCover = path.join(__dirname, `../images`, oldPhoto);

        //jika ada foto lama maka akan dihapus
        if (fs.existsSync(pathCover)) {
          fs.unlink(pathCover, (error) => {
            console.log(id, error);
          });
        }

        // memperbarui foto sesuai dengan inputan
        data.cover = request.file.filename;
      }

      //jalankan proses uploadCover
      await Food.update(data, { where: { id: id } });
      return response.json({
        success: true,
        data: data,
        message: "Data food has been updated",
      });
    });
  } catch (error) {
    console.error(error);
    res.json({ message: "Internal Server Error" });
  }
};

//mengeksport variabel supaya bisa digunakan di file lain
exports.deleteFood = async (req, res) => {
  try {
    //mengambil id menggunakan params
    const id = req.params.id;

    //menyiapkan data book sesuai dengan id
    const data = await Food.findOne({ where: { id: id } });

    //menyiapkan foto food di variabel
    const oldPhoto = data.cover;

    //menamakan foto sesuai dengan nama folder
    const pathCover = path.join(__dirname, `../images`, oldPhoto);

    //jika foto ditemukan maka akan dihapus
    if (fs.existsSync(pathCover)) {
      fs.unlink(pathCover, (error) => console.log(error));
    }

    //menjalankan perintah hapus
    Food.destroy({ where: { id: id } });
    //jika berhasil maka buka promise dengan then
    return res.json({
      success: true,
      message: "food deleted",
    });
  } catch (error) {
    console.error(error);
    res.json({ message: "Internal Server Error" });
  }
};
