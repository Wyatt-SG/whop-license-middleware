import type { NextApiRequest, NextApiResponse } from "next";

const updateMetadata = async ({
  key,
  metadata,
}: {
  key: string;
  metadata: { [key: string]: string };
}) => {
  if (typeof process.env.WHOP_API_KEY !== "string")
    return {
      error: {
        status: 500,
        message:
          "Silly developer. You forgot to add your WHOP_API_KEY to this project",
      },
    };

  const response = await fetch(
    `https://api.whop.com/api/v2/memberships/${key}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.WHOP_API_KEY}`,
      },
      body: JSON.stringify({
        metadata: metadata,
      }),
    }
  );

  return response.json();
};

const isKeyString = (key: string | string[] | undefined): key is string =>
  typeof key === "string";

/**
 * @swagger
 * /api/license/{key}/update:
 *   post:
 *     description: Update key metadata
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               metadata:
 *                 type: object
 *                 example: { "anything": "you want" }
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "Request must be POST" });

  const { key } = req.query;
  const { metadata } = req.body;

  if (!isKeyString(key))
    return res.status(400).json({ message: "Key is required" });

  const result = await updateMetadata({ key, metadata });

  if (result?.error)
    return res.status(result.error?.status || 400).json(result);

  res.status(200).json(result);
}
