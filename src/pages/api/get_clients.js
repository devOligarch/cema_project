import client from "../../../lib/db"

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await client.connect()
      const db = client.db()

      let clients = await db
        .collection("clients")
        .aggregate([
          {
            $lookup: {
              from: "programs",
              localField: "programs",
              foreignField: "_id",
              as: "programs",
            },
          },
        ])
        .toArray()

      return res.status(200).json({ clients })
    } catch (error) {
      return res.status(500).json({ error: "Operation failed" })
    }
  }

  return res.status(405).json({ error: "Method not allowed" })
}
