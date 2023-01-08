import type { NextApiRequest, NextApiResponse } from 'next'

const validateLicenseKey = async ({ key }: { key: string; metadata: { [key: string]: string } }) => {
  if (typeof process.env.WHOP_API_KEY !== 'string') return { message: 'Silly developer. You forgot to add your WHOP_API_KEY to this project' }

  const response = await fetch(`https://api.whop.com/api/v2/memberships/${key}/validate_license`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.WHOP_API_KEY}`
    },
    body: JSON.stringify({ 
      metadata: "authorization_code"
    })
  })

  return response.json()
}

const isKeyString = (key: string | string[] | undefined): key is string => typeof key === 'string'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(400).json({ message: 'Request must be POST' })

  const { key } = req.query;
  const { metadata } = req.body

  if (!isKeyString(key)) return res.status(400).json({ message: 'Key is required. /validate/[key]' })

  validateLicenseKey({key: key, metadata: metadata}).then((data) => {
    console.log(data);
  })

  res.status(200).json({ name: 'John Doe' })
}
