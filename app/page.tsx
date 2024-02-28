import { validateRequest } from "@/app/libs/auth"
import { redirect } from "next/navigation";
import Profile from "@/app/components/molecule/profile.component";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  return (
    <section className="min-h-screen flex justify-center">
      <section className="px-[14px] py-[14px]">
        <h1 className="text-2xl">Page Beranda</h1>
        <Profile user={user}/>
      </section>
    </section>
  )
}
