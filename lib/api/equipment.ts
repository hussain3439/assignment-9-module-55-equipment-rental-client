import { Equipment } from "@/app/types/type"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL


export const getEquipments = async (email: string):Promise<Equipment[]> => {
  const res = await fetch(`${BASE_URL}/equipments/${encodeURIComponent(email)}`)

  if (!res.ok) {
    throw new Error("Failed to get equipments")
  }
  return res.json()
}

export const getAllEquipments = async():Promise<Equipment[]> => {
    const res = await fetch(`${BASE_URL}/equipments`)
    return res.json()

}
