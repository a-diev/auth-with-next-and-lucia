'use client'

import { FormSubmitSchema, FormSubmitSchemaType } from '@/app/libs/types'
import { signIn, signUp } from '@/app/actions/auth.action'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as React from 'react'

import { Button } from '@/app/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/form'
import { Input } from '@/app/components/ui/input'
import { useToast } from '@/app/components/ui/use-toast'
import { useRouter } from 'next/navigation'

interface IProps {
    type: "login" | "register"
}

export default function FormSubmit({ type }: IProps) {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<FormSubmitSchemaType>({
        resolver: zodResolver(FormSubmitSchema),
        defaultValues: {
          username: "",
          password: "",
        },
    })
     
    async function onSubmit(values: FormSubmitSchemaType) {
        const res = type === "register" ? await signUp(values) : await signIn(values)

        if (res.error) {
            toast({
                variant: "destructive",
                description: res.error,
            });
        } else if (res.success) {
            toast({
                variant: "default",
                description: type === "register"
                    ?
                    "Account created successfully."
                    :
                    res.success,
            });

            router.push("/");
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="lucia"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='h-[14px]'/>
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type='password'
                                    placeholder='********'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='h-[28px]'/>
                <Button type="submit" className='w-full'>
                    Selanjutnya
                </Button>
            </form>
        </Form>
    )
}
