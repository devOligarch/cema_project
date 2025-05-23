import client from "../../../lib/db"

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await client.connect()
      const db = client.db()

      const programsCol = db.collection("programs")

      await programsCol.insertOne({
        name: req.body.name,
        color: req.body.color,
        createdAt: new Date(),
      })

      return res.status(200).json({
        title: "Program created",
      })
    } catch (err) {
      return res.status(405).json({
        error: "Operation failed",
      })
    }
  }

  return res.status(405).json({ error: "Method not allowed" })
}
