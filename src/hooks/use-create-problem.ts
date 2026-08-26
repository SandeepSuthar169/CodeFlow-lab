"use clinet";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
// import { toster } from "sonner"
import { useState } from "react";
import { defaultFormValues, ProblemFormValues, problemSchema } from "@/module/problems/schema";
import { SAMPLE_PROBLEMS } from "@/module/problems/constant/sample-problem";
import { toast } from "sonner";

export const useCreateProblem = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const [sampleType, setSampleType] = useState("DP")

    const form = useForm({
        resolver: zodResolver(problemSchema),
        defaultValues: defaultFormValues,
    })

    const testCasesArray = useFieldArray({
        control: form.control,
        name: "testCases" as const,
    })

    const tagsArray = useFieldArray({
        control: form.control,
        name: "tags" as any
    }) as any

    const onSubmit = async (value: ProblemFormValues) => { 
        try {
            setIsLoading(true)

            const  response = await fetch("/api/create-problem", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(value)
            })
            toast.success("Problem created successfully")
            router.push('/problem')
        } catch (error) {
            console.error("Error Creating problem", error);
            toast.error("Failed to create Problem")
        }
    }

    const loadSampleData = () => {
        const sampleData =
            SAMPLE_PROBLEMS[sampleType as keyof typeof SAMPLE_PROBLEMS];
        tagsArray.replace(sampleData.tags);
        testCasesArray.replace(sampleData.testCases);
        form.reset(sampleData as any);
    }

    return {
        form,
        testCasesArray,
        tagsArray,
        isLoading,
        sampleType,
        setSampleType,
        onSubmit: form.handleSubmit(onSubmit),
        loadSampleData
    }
}



