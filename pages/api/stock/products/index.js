import { connect, model, models, Schema } from "mongoose";
const connectionString =
  "mongodb+srv://user1:jZw5I9q20qi07FMz@cluster0.ze6mnns.mongodb.net/stock";

export default async function handler(req, res) {
  await connect(connectionString);
  console.log("req.method: ", req.method);

  if (req.method === "GET") {
    const products = await Article.find();
    res.status(200).json(products);
  } else if (req.method === "POST") {
    console.log(typeof req.body);
    // res.status(200).json(req.body)
    const product = await Article.create(req.body);
    res.status(201).json(product);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const productSchema = new Schema({
  code: String,
  name: String,
  price: String,
});

const Product = models?.product || model("product", productSchema);
