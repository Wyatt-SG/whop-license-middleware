import { WhopSDK } from "@whop-sdk/core";

const sdk = new WhopSDK({
  HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${process.env.WHOP_API_KEY}`,
  },
});

export default sdk;
