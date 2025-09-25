import * as z from "zod"

export const FormVehicleSchema = z.object({
  customerType: z.enum(["existed", "create"]),

  title: z.string().min(1, "Title is required"),
  gender: z.enum(["male", "female"]),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  idNumber: z.string().min(1, "ID number is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),

  houseNumber: z.string().min(1, "House number is required"),
  village: z.string().optional(),
  building: z.string().optional(),
  soi: z.string().optional(),
  road: z.string().optional(),
  subDistrict: z.string().min(1, "Sub-district is required"),
  district: z.string().min(1, "District is required"),
  province: z.string().min(1, "Province is required"),
  postalCode: z.string().min(1, "Postal code is required"),
})

export type FormVehicleValues = z.infer<typeof FormVehicleSchema>
