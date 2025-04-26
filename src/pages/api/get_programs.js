import client from "../../../lib/db"

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await client.connect()
      const db = client.db()

      // const programs = await db.collection("programs").find().toArray()

      const programs = await db
        .collection("programs")
        .aggregate([
          {
            $lookup: {
              from: "clients",
              let: { programId: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ["$$programId", "$programs"],
                    },
                  },
                },
              ],
              as: "clients",
            },
          },
          {
            $addFields: {
              clientCount: { $size: "$clients" },
            },
          },
          {
            $project: {
              clients: 0,
            },
          },
        ])
        .toArray()

      return res.status(200).json({ programs })
    } catch (error) {
      console.error("MongoDB error:", error)
      return res.status(500).json({ error: "Operation failed" })
    }
  }

  return res.status(405).json({ error: "Method not allowed" })
}
