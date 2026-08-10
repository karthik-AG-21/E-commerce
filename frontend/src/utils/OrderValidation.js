import { z } from "zod";

export const OrderSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),

  
    street: z
      .string()
      .min(1, "Street is required"),

    city: z
      .string()
      .min(1, "City is required"),

    state: z
      .string()
      .min(1, "State is required"),

    zipCode: z
      .string()
      .min(1, "Zip code is required"),
});