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
import { useCreateProblem } from "@/hooks/use-create-problem";
import { BasicInfoSection } from "./basic-info-section";
import { TagsSection } from "./tag-section";
import { TestCasesSection } from "./test-cases-section";
import { LanguageSections } from "./language-section";
import { AdditionalInfoSection } from "./additionl-Information-section";
import SubmitButton from "./submit-button";

export const CreateProblemForm = () => {
    const {
        form,
        isLoading,
        loadSampleData,
        onSubmit,
        sampleType,
        setSampleType,
        tagsArray,
        testCasesArray,
    } = useCreateProblem()

    return (
        <div className="container mx-auto py-8 px-4 max-w-7xl">
            <Card className=" shadow-xl">
                <FormHeader                               // form header. 
                    sampleType={sampleType}
                    onLoadSample={loadSampleData}
                
                />
                <CardContent className="p-6">
                    <form onSubmit={onSubmit} className="space-y-8">
                        <BasicInfoSection form={form} />
                        <TagsSection form={form} tagsArray={tagsArray} />
                        <TestCasesSection form={form} testCasesArray={testCasesArray} />
                        <LanguageSections form={form}/>
                        <AdditionalInfoSection form={form}/>
                        <SubmitButton isLoading={isLoading} />
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}