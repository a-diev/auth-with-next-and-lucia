import { db } from "@/app/configs/database";
import { sessions, users } from "@/app/configs/schema";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "production"
		}
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}

export const validateRequest = cache(async () => {
	const sessionId = cookies()
		.get(lucia.sessionCookieName)?.value ?? null;

	if (!sessionId) {
		return {
			user: null,
			session: null,
		};
	}

	const { user, session } = await lucia.validateSession(
		sessionId
	);

	try {
		if (session && session.fresh) {
			const sessionCookie = lucia.createSessionCookie(
				session.id
			);

			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			);
		}
		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie();

			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			);
		}
	} catch {
		// Next.js throws error when attempting to set cookies when rendering page
	}

	return {
		user,
		session,
	};
});
