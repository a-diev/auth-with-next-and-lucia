'use server'

import { generateId } from "lucia"
import { Argon2id } from "oslo/password"
import { users } from "@/app/configs/schema"
import { db } from "@/app/configs/database"
import { lucia, validateRequest } from "@/app/libs/auth"
import { cookies } from "next/headers"
import { FormSubmitSchemaType } from "@/app/libs/types"
import { eq } from "drizzle-orm"

export const signUp = async (values: FormSubmitSchemaType) => {
    const hashedPassword = await new Argon2id().hash(values.password);
    const userId = generateId(15);

    try {
        const [user]: {id: string, username: string}[] = await db.insert(users)
            .values({
                id: userId,
                username: values.username,
                password: hashedPassword,
            })
            .returning({
                id: users.id,
                username: users.username,
            });

        const session = await lucia.createSession(user.id, {
            expiresIn: 60 * 60 * 24 * 30,
        })

        const sessionCookie = lucia.createSessionCookie(session.id);

        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

        return {
            success: true,
            data: { userId },
        }
    } catch (error: any) {
        return {
            error: error?.message,
        }
    }
}

export const signIn = async (values: FormSubmitSchemaType) => {
    const existUser = await db.query.users.findFirst({
        where: (table) => eq(table.username, values.username),
    })
    if (!existUser) {
        return {
            error: "Incorrect username or password.",
        }
    }
    if (!existUser.password) {
        return {
            error: "Incorrect username or password.",
        }
    }

    const isValidPassword = await new Argon2id().verify(
        existUser.password,
        values.password,
    );
    if (!isValidPassword) {
        return {
            error: "Incorrect username or password.",
        }
    }

    const session = await lucia.createSession(existUser.id, {
        expiresIn: 60 * 60 * 24 * 30,
    })

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );

    return {
        success: "Logged is successfully.",
    }
}

export const signOut = async () => {
    try {
        const { session } = await validateRequest();

        if (!session) {
            return {
                error: "Unauthorized",
            }
        }

        await lucia.invalidateSession(session.id);

        const sessionCookie = lucia.createBlankSessionCookie();

        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );
    } catch (error: any) {
        return {
            error: error?.message,
        }
    }
}
