'use client'

import { signOut } from '@/app/actions/auth.action';
import * as React from 'react'

import { Button } from '@/app/components/ui/button';

export default function FormLogOut() {
    return (
        <form action={signOut}>
            <Button
                variant={"link"}
                className="hover:text-red-600"
            >
                Log Out
            </Button>
        </form>
    )
}
