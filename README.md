# Whop License Middleware

A simple to use and deploy api for validating Whop keys

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FWyatt-SG%2Fwhop-license-middleware&env=WHOP_API_KEY&envDescription=Whop%20API%20Key%20from%20the%20Whop%20Dashboard&envLink=https%3A%2F%2Fdash.whop.com%2Fsettings%2Fdeveloper)

## Endpoints

API request examples in the postman folder 

[How to import a postman collection](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/#importing-postman-data)

### Validate a key:

POST
```
/api/license/[key]/validate
```
Body:
```json
{
  "metadata": {
    "anything": "you want"
  }
}
```

### Reset a key:

POST
```
/api/license/[key]/reset
```

### Update a key's metadata:

POST
```
/api/license/[key]/update
```
Body:
```json
{
  "metadata": {
    "anything": "you want"
  }
}
```

## Run locally

1. Create a `.env.local` file in the project directory and add your [Whop API key](https://dash.whop.com/settings/developer)

```
WHOP_API_KEY=xxx
```

2. Install the project dependencies:

```bash
npm ci
```

3. Start the project:

```bash
npm run dev
```

The project will run at [http://localhost:3000](http://localhost:3000)
