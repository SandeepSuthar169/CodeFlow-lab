import { create } from "zustand"
const useProblemStore = create((set) => ({
    problem : [],
    problem: null,
    solvedProblem: [],
    isProblemsLoading: false,
    isProblemLoading: false,
}))

