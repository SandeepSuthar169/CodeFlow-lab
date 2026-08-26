"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Plus,
    Trash2,
    Code2,
    FileText,
    Lightbulb,
    BookOpen,
    CheckCircle2,
    Download,
} from "lucide-react";
import { FormHeader } from "./form-header";

export const CreateProblemForm = () => {
    return (
        <div className="container mx-auto py-8 px-4 max-w-7xl">
            <Card className=" shadow-xl">
                <FormHeader />
                <CardContent className="p-6">

                </CardContent>
            </Card>
        </div>
    )
}