const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
// eslint-disable-next-line max-len
const stripe = require("stripe")("sk_test_51KSDOFSJ7T6EiEpoKM8cIwYPoQ42AiyWQNOHTVTPMils0QLYTcZ4qXBC2GRGHp684eQsKsRLDipsH8tO0G8LygGK00GbgSKNhD");

// API
// App Config
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.get("/", (req, res) => {
  res.status(200).send("Hello Rajwant");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("Payment request received: ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
    payment_method: "pm_card_visa",
    payment_method_types: ["card"],
    confirm: true,
    description: "amazon clone test",
    customer: "cus_AJ6y81jMo1Na3p",
  });

  // Ok- Created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen Command
exports.api = functions.https.onRequest(app);

// Endpoint example:
// http://localhost:5001/clone-e6a4b/us-central1/api
