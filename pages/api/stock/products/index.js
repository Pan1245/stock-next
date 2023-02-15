import { connect, model, models, Schema } from "mongoose";
const connectionString =
  "mongodb+srv://user1:i1ma3KgyTAbkhZuL@cluster0.ze6mnns.mongodb.net/stock";

export default async function handler(req, res) {
  await connect(connectionString);

  if (req.method === "GET") {
    const doc = await Product.find();
    res.status(200).json(doc);
  } else if (req.method === "POST") {
    const doc = await Product.create(req.body);
    res.status(201).json(doc);
  } else {
    res.setHander("Allow", ["GET", "POST"]);
    res.status(405).end("Method ${req.method} Not Allowed");
  }

  res.status(200).json(docs);
}

const productSchema = new Schema({
  code: String,
  name: String,
  price: String,
});

const Product = models?.Product || model("product", productSchema);
