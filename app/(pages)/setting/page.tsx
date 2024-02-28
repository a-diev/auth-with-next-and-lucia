import AppBar from "@/app/components/molecule/appbar.component";
import FormLogOut from "@/app/components/molecule/formlogout.component";
import { validateRequest } from "@/app/libs/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  return (
    <section className="min-h-screen flex justify-center">
      <section className="w-full md:w-auto">
          <AppBar title="Setting"/>
          <section className="px-[14px] py-[14px]">
            <div className="flex items-center">
              Page Setting
              <FormLogOut />
            </div>
          </section>
      </section>
    </section>
  )
}
