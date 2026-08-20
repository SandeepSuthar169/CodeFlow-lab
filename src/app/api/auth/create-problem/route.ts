import { UserRole } from "@/generated/prisma/enums";
import { prisma } from "@/lib/db";
import { getJudge0LanguageId, pollBatchResults, submitBatch } from "@/lib/judge0";
import { currentUserRole, getCurrentUserData } from "@/module/auth/actions";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const userRole = await currentUserRole();
        const userResult = await getCurrentUserData();

        if (!userResult.success || !userResult.data) {
            return NextResponse.json(
                { error: userResult.error || "User not found!" },
                { status: 401 }
            );
        }

        const user = userResult.data;

        if (userRole.role !== UserRole.ADMIN) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const {
            title,
            description,
            difficulty,
            tags,
            examples,
            constraints,
            testCases,
            codeSnippets,
            referenceSolutions,
        } = await request.json()

        if (!title || !description || !difficulty || !testCases || !codeSnippets || !referenceSolutions) {
            return NextResponse.json(
                { error: "Missing request fields" },
                { status: 400 }
            )
        }

        if (!Array.isArray(testCases) || testCases.length === 0) {
            return NextResponse.json(
                { error: "At least one test is requred" },
                { status: 400 }
            )
        }

        for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
            // 1. get jugge0 languge id for current language.
            const languageId = getJudge0LanguageId(language)

            // 2. prepare judge0 submission  for all test csses.
            const submissions = testCases.map(({ input, output }) => ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output
            }))


            // 3. Submit all testcases in one batch.
            const submissionResults = await submitBatch(submissions);


            // 4. Extract token  from response. 
            const tokens = submissionResults.map((res: any) => res.token)


            // 5. Poll Judge0 untill all submission are done.    
            const results = await pollBatchResults(tokens)


            // 6. Validate that each test cases. 
            for (let i = 0; i < results.length; i++) {
                const result = results[i]

                if (result.status.id !== 3) {
                    return NextResponse.json(
                        {
                            error: `Validation failed for ${language}`,
                            testCase: {
                                input: submissions[i].stdin,
                                expectedOutput: submissions[i].expected_output,
                                actualOutput: result.stdout,
                                error: result.stderr || result.compile_output,
                            },
                            details: result,
                        },
                        { status: 400 }
                    );
                }
            }
        }

        const newProblem = await prisma.problem.create({
            data: {
                title,
                description,
                difficulty,
                tags,
                examples,
                constraints,
                testCases,
                codeSnippets,
                referenceSolution: referenceSolutions,
                userId: user.id
            }
        })

        return NextResponse.json(
            {
                success: true,
                message: "Problem created successfully",
                data: newProblem
            },
            { status: 201 }
        )


    } catch (error) {
        console.error("Error creating problem:", error);

        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
};