import Image from "../models/slideimagesModel.js";

export const uploadImage = async (req, res) => {
  const image = await Image.create({
    imageUrl: req.file.path,
  });

  res.status(201).json(image);
};

export const getImages = async (req, res) => {
  const images = await Image.find();
  res.json(images);
};
