const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL //http://localhost:5000
import { Equipment } from "@/app/types/type"

export const postEquipment = async (data: Equipment) => {
  const res = await fetch(`${BASE_URL}/equipments`, {
    method: "POST",
    headers: {
      'Content-Type':"application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error("Failed to add equipment")
  }
  return res.json()
}
