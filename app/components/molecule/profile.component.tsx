'use client'

import * as React from 'react'
import { Button } from '@/app/components/ui/button'
import { User } from 'lucia';
import Link from 'next/link';

interface IProps {
    user: User
}

export default function Profile({ user }: IProps) {
    return (
        <div>
            User ID: {user?.id}
            <Button variant={"link"} asChild>
                <Link href={"profile"}>Go to Profile</Link>
            </Button>
            <Button variant={"link"} asChild>
                <Link href={"setting"}>Go to Setting</Link>
            </Button>
        </div>
    )
}
