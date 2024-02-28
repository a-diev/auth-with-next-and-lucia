import { signOut } from "@/app/actions/auth.action";
import { redirect } from "next/navigation";

export default async function Page() {
    const res = await signOut();
    if (res?.error) {
        return redirect("/setting");
    }

    return redirect("/");
}
