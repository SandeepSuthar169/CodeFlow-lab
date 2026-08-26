"use clinet";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver }from "@hookform/resolvers/zod"
import { useRouter } from "next/router";
import { toster } from "sonner"
import { useState } from "react";
import { problemSchema } from "@/module/problems/schema";

export const useCreateProblem = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const [sampleType, setSampleType] = useState("DP")

    const form = useForm({
        resolver: zodResolver(problemSchema),
        defaultValues: defaultFormValue,
    })
}

