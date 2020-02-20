const express = require("express");
const router = express.Router();
const StorageLink = require("../models/storageLink");

//Get all
router.get("/", async (req, res) => {
  try {
    const storageLinks = await StorageLink.find();
    res.json(storageLinks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get one
router.get("/:id", getStorageLink, (req, res) => {
  res.json(res.storageLink);
});

//Get
router.get("/category/:category", async (req, res) => {
  try {
    const storageLinks = await StorageLink.find({
      categorie: req.params.category
    });
    res.json(storageLinks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Create one
router.post("/", async (req, res) => {
  const storageLink = new StorageLink({
    categorie: req.body.categorie,
    urlToStore: req.body.urlToStore
  });
  try {
    const newStorageLink = await storageLink.save();
    //201 : Successfully created an object
    res.status(201).json(newStorageLink);
  } catch (err) {
    //400: something wrong with the user
    res.status(400).json({ message: err.message });
  }
});

//Update one
router.patch("/:id", getStorageLink, async (req, res) => {
  if (req.body.categorie != null) {
    res.storageLink.categorie = req.body.categorie;
  }

  if (req.body.urlToStore != null) {
    res.storageLink.urlToStore = req.body.urlToStore;
  }

  try {
    const updateStorageLink = await res.storageLink.save();
    res.json(updateStorageLink);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete one
router.delete("/:id", getStorageLink, async (req, res) => {
  try {
    await res.storageLink.remove();
    res.json({ message: "Deleted StorageLink" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Eviter les repetitions
async function getStorageLink(req, res, next) {
  try {
    storageLink = await StorageLink.findById(req.params.id);
    if (storageLink == null) {
      return res.status(404).json({ message: "Cannot find storageLink" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.storageLink = storageLink;
  //Allow us to move to the next
  next();
}

module.exports = router;
