## Pre-requisites

A Whop V2 API key from [https://dash.whop.com/settings/developer](https://dash.whop.com/settings/developer) is required

Create a `.env.local` file in the project directory and add your Whop key
```
WHOP_API_KEY=xxx
```

## Run the project

To start the project:

```bash
npm run dev
```

The project will run at [http://localhost:3000](http://localhost:3000)

## Usage

Validate a key:

POST
```
/api/validate/[key]
```
