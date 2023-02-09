const router = require("express").Router();
const itemModel = require("../models/itemModel");

router.get("/getitems", async (req, res) => {
  try {
    let items = await itemModel.find({});
    res.status(200).json(items);
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
});

router.post("/additems", async (req, res) => {
  const { name, age } = req.body;
  const newItem = new itemModel({
    name,
    age,
  });
  try {
    newItem.save();
    res.send(`Item added successfully : ${newItem}`);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;