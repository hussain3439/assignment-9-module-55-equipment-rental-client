export type RentalType = "daily" | "weekly" | "monthly"
export type EquipmentStatus = "pending" | "approved" | "rejected"

export interface Equipment {
  _id?: string
  name: string
  description: string
  category: string
  location: string
  price: number
  rentalType: RentalType
  quantity: number
  condition: string
  brand: string
  model: string
  image: string
  terms: string
  status: EquipmentStatus
  ownerId: string
  ownerName: string
  ownerEmail: string
}