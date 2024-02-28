'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'

import { Button } from '@/app/components/ui/button';

interface IProps {
    title: string
}

export default function AppBar({ title }: IProps) {
    const router = useRouter();

    return (
        <section className='flex gap-[14px] items-center'>
            <Button
                variant={"outline"}
                onClick={() => router.back()}
                className='border-none hover:bg-transparent'
            >
                <ArrowLeft size={14}/>
            </Button>
            <h1 className='text-base font-bold'>
                { title }
            </h1>
        </section>
    )
}
