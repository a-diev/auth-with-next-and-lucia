import FormSubmit from "@/app/components/molecule/formsubmit.component";
import { validateRequest } from "@/app/libs/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
	const { user } = await validateRequest();
	if (user) return redirect("/");

	return (
		<section className="min-h-screen flex justify-center">
			<section className="px-[14px] py-[14px] w-full md:w-auto">
				<section>
					<h1 className="text-2xl font-bold">
						Daftar Lucia Auth
					</h1>
				</section>
				<div className='h-[28px]'/>
				<FormSubmit type="register"/>
                <div className='h-[28px]'/>
				<section className="px-[14px] text-sm flex gap-[4px] items-center justify-center">
					<h1>Sudah punya akun?</h1>
					<Link href={'login'}>Login</Link>
				</section>
			</section>
		</section>
	);
}
