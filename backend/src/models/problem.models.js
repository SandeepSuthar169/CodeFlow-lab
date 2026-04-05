import mongoose, { Schema } from "mongoose";
import {
     AvailableDifficulty, 
     DifficultyEnum 
}from "../utils/constants.js";


const problemSchema = new Schema(
    {
        _id:{
            type: String,
            default: () => new mongoose.Types.ObjectId().toString()
        },
        title: {
            type: String,
            required: true,
            lowercase: true
        },
        description: {
            type: String,
            required: true
        },
        difficulty: {
            type: String,
            enum: AvailableDifficulty,
            default: DifficultyEnum.EASY
        },
        tags: {
            type: [String],
            default: []
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        examples: [{
            type: Object,
            required: true
        }],
        constraints: {
            type: [String],
            default: [],
            required: true
        },
        hints: {
            type: String,

        },
        editorial: {
            type: String,
        },
        testcases: {
            type: Schema.Types.Mixed,
            required: true,
            default: null
        },
        codeSnippets: {
            type: Schema.Types.Mixed,
            required: true,
            default: null
        },
        referenceSolution: {
            type: Schema.Types.Mixed,
            required: true,
            default: null
        },
        submission: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Submission" 
        },
        solvedBy: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "ProblemSolved" 
        },

        problemsPlaylists: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "ProblemInPlaylist" 
        },
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
)
export const Problem = mongoose.model("Problem", problemSchema)