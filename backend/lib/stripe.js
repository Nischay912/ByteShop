// step289: lets import stripe package first here below.
import Stripe from "stripe";
// to use environment variables also import dotenv and call the config method on it here below.
import dotenv from "dotenv"
dotenv.config()

// step290: lets now create an instance of stripe with the secret key inot it here below.

// step291: see the next steps in payment.route.js file now there.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)