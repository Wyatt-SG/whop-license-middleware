import type { NextApiRequest, NextApiResponse } from 'next'

const validateLicenseKey = async ({ key, metadata }: { key: string; metadata: { [key: string]: string } }) => {
  if (typeof process.env.WHOP_API_KEY !== 'string') return { message: 'Silly developer. You forgot to add your WHOP_API_KEY to this project' }

  const response = await fetch(`https://api.whop.com/api/v2/memberships/${key}/validate_license`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.WHOP_API_KEY}`
    },
    body: JSON.stringify({ 
      "metadata": metadata
    })
  })

  return response.json()
}

const isKeyString = (key: string | string[] | undefined): key is string => typeof key === 'string'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(400).json({ message: 'Request must be POST' })

  const { key } = req.query;
  const { metadata } = req.body

  if (!isKeyString(key)) return res.status(400).json({ message: 'Key is required. /validate/[key]' })

  const result = await validateLicenseKey({key: key, metadata: metadata})

  res.status(200).json(result)
}
