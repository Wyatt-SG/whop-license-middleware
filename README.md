## Pre-requisites

A Whop V2 API key from [https://dash.whop.com/settings/developer](https://dash.whop.com/settings/developer) is required

Create a `.env.local` file in the project directory and add your Whop key
```
WHOP_API_KEY=xxx
```

## Instal deps and run the project

1. Install the project dependencies:

```bash
npm ci
```

2. Start the project:

```bash
npm run dev
```

The project will run at [http://localhost:3000](http://localhost:3000)

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
