import { getEquipments } from "@/lib/api/equipment"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const MyEquipmentPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const email = session?.user?.email
  console.log(email)
  if (!email) redirect("/sign-in")

  const result = await getEquipments(email)
  console.log(result)

  return <div>all equipments: {result.length}</div>
}

export default MyEquipmentPage
