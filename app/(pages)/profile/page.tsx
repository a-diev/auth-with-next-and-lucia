import AppBar from "@/app/components/molecule/appbar.component";
import { validateRequest } from "@/app/libs/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  return (
    <section className="min-h-screen flex justify-center">
      <section className="w-full md:w-auto">
        <AppBar title="Profile"/>
        <section className="px-[14px] py-[14px]">  
          <div>Page Profile</div>
        </section>
      </section>
    </section>
  )
}
