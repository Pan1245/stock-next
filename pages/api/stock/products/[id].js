import { connect, model, models, Schema } from "mongoose";
const connectionString = process.env.MONGODB_URI;

export default async function handler(req, res) {
  await connect(connectionString);
  console.log("req.method: ", req.method);
  console.log("req.query.id", req.query.id);

  const id = req.query.id;
  if (req.method === "GET") {
    // Get only one document
    const product = await Product.findOne({ _id: id });
    res.status(200).json(product);
  } else if (req.method === "DELETE") {
    const deletedProduct = await Product.deleteOne({ _id: id });
    res.status(200).json(deletedProduct);
  } else {
    res.setHander("Allow", ["GET", "DELETE"]);
    res.status(405).end("Method ${req.method} Not Allowed");
  }
}

const productSchema = new Schema({
  code: String,
  name: String,
  price: String,
});

const Product = models?.product || model("product", productSchema);
