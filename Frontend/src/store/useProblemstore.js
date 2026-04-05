import { create } from "zustand"
import { axiosInstance } from "../lib/axios.js"
import { toast } from "react-hot-toast"


const useProblemStore = create((set) => ({
    problems : [],
    problem: null,
    solvedProblem: [],
    isProblemsLoading: false,
    isProblemLoading: false,

    getAllProblem: async () => {
        try {
            set({ isProblemsLoading: true })

            const res = await axiosInstance.get("/problem/get-all-problems")

            console.log("res", res);
            console.log("res.data", res.data);
            console.log("res.data.problems", res.data.problems);
            
            set({ problem: res.data.problems })
        } catch (error) {
            
        }
    },

    getProblemById: async () => {},

    getSolvedProblemByUser: async () => {}
}))

