## Whop License Middleware

A simple to use and deploy api for validating Whop keys

## Usage

API usage examples in the postman folder 

[How to import a postman collection](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/#importing-postman-data)

Validate a key:

POST
```
/api/license/[key]/validate
```

Update a key's metadata:

POST
```
/api/license/[key]/update
```

Reset a key:

POST
```
/api/license/[key]/reset
```

## Deploy on Vercel

1. Get Whop API key from [Whop Developer Settings](https://dash.whop.com/settings/developer) and save for later

2. Copy the project ![Github site "Use this template" dropdown- "Create a new repository" selected](https://i.imgur.com/N2ekoK6.png)

3. Login/Sign up for [Vercel](https://vercel.com/#get-started). Create a new project and select the copied repository: ![Vercel site import git repository](https://i.imgur.com/7K2q9IW.png)

4. Add your Whop API key as a project environment variable and deploy ![Vercel site configure project add environment variable](https://i.imgur.com/k24CU7s.png)

5. You can now use this deployed api to securely and simply validate, reset, and update license keys for your Whop company!

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
