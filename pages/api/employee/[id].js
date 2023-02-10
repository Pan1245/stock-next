import path from "path";
import { promises as fs } from "fs";
export default async function handler(req, res) {
  const jsonDirectory = path.join(process.cwd(), "data");
  const fileContents = await fs.readFile(
    jsonDirectory + "/employees.json",
    "utf8"
  );
  const employees = JSON.parse(fileContents);

  const e = employees.find((employee) => employee.id == req.query.id);
  console.debug(req.query.id, e);

  if (!e) {
    res.status(404).json({ message: "Employee not found" });
    return;
  }
  res.status(200).json(e);
}
