import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { UserRole } from '@/generated/prisma/enums'
import { currentUserRole, getCurrentUserData } from '@/module/auth/actions'
import { CreateProblemForm } from '@/module/problems/components/create-problem-form'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

const CreateProblemPage = async () => {
    const user = await getCurrentUserData()
    const userRole = await currentUserRole();


    if (userRole.role !== UserRole.ADMIN) {
        redirect("/")
    }
    return (
        <section className='flex flex-col items-center justify-center   mx-4  my-4'>
            <div className='flex flex-row justify-between items-center w-full'>
                <link href="/" />
                <Button variant={"outline"} size={"icon"}>
                    <ArrowLeft className='size-4' />
                </Button>
                <h1 className='text-3xl font-bold text-orange-400 '>Welcome {user?.data?.firstName} !Create a Problem</h1>
                <ModeToggle />
            </div>
            <CreateProblemForm />

        </section>
    )
}

export default CreateProblemPage