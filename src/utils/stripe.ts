import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "@/utils/config";

export const stripe = new Stripe(
    STRIPE_SECRET_KEY,
    {
        apiVersion: "2024-12-18.acacia",
        appInfo:{
            name: 'FitLog',
            version: '1.0'
        }
    }
)