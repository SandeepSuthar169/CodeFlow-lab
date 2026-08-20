"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";


const getAuthenticatedSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return session;
};


export const onBoardUser = async () => {
    try {
        const session = await getAuthenticatedSession();

        if (!session) {
            return {
                success: false,
                error: "No authenticated user found",
            };
        }

        const user = session.user;

        const nameParts = user.name?.trim().split(/\s+/) ?? [];

        const firstName = nameParts[0] || null;
        const lastName =
            nameParts.length > 1
                ? nameParts.slice(1).join(" ")
                : null;

        const updatedUser = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                firstName,
                lastName,
                image: user.image ?? null,
                email: user.email,
            },
        });

        return {
            success: true,
            user: updatedUser,
            message: "User onboarded successfully",
        };
    } catch (error) {
        console.error("❌ Error onboarding user:", error);

        return {
            success: false,
            error: "Failed to onboard user",
        };
    }
};

export const currentUserRole = async () => {
    try {
        const session = await getAuthenticatedSession();

        if (!session) {
            return {
                success: false,
                error: "No authenticated user found",
            };
        }

        const userRole = await prisma.user.findUnique({
            where: {
                id: session.user.id,
            },
            select: {
                id: true,
                role: true,
            },
        });

        if (!userRole) {
            return {
                success: false,
                error: "User not found",
            };
        }

        return {
            success: true,
            role: userRole.role,
        };
    } catch (error) {
        console.error("❌ Error fetching user role:", error);

        return {
            success: false,
            error: "Failed to fetch user role",
        };
    }
};


export const getCurrentUserData = async () => {
    try {
        const session = await getAuthenticatedSession();

        if (!session) {
            return {
                success: false,
                error: "No authenticated user found",
            };
        }

        const data = await prisma.user.findUnique({
            where: {
                id: session.user.id,
            },
        });

        if (!data) {
            return {
                success: false,
                error: "User not found",
            };
        }

        return {
            success: true,
            data,
        };
    } catch (error) {
        console.error("❌ Error fetching user:", error);

        return {
            success: false,
            error: "Failed to fetch user",
        };
    }
};