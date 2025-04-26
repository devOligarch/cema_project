import { ObjectId } from "mongodb"
import client from "../../../lib/db"

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await client.connect()
      const db = client.db()

      const clientCol = db.collection("clients")

      let programs = req.body.programs

      await clientCol.insertOne({
        name: req.body.name,
        age: req.body.age,
        height: req.body.height,
        weight: req.body.weight,
        gender: req.body.gender,
        programs: programs?.map((program) => new ObjectId(`${program}`)),
        registered_at: new Date(),
      })

      return res.status(200).json({
        title: "Client created",
      })
    } catch (err) {
      return res.status(405).json({
        error: "Operation failed",
      })
    }
  }

  return res.status(405).json({ error: "Method not allowed" })
}
