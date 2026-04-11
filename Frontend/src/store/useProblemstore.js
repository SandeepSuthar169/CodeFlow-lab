import { create } from "zustand"
import { axiosInstance } from "../lib/axios.js"
import { toast } from "react-hot-toast"


export const useProblemStore = create((set) => ({
    problems : [],
    problem: null,
    solvedProblem: [],
    isProblemsLoading: false,
    isProblemLoading: false,

    getAllProblem: async () => {
        try {
            set({ isProblemLoading: true })

            const res = await axiosInstance.get("/problem/get-all-problem")

            // console.log("res", res);
            // console.log("res.data", res.data);
            // console.log("res.data.data", res.data.data);
            // console.log("res.data.problems", res.data.problem);
            
            set({ problems: res.data.data })


        } catch (error) {
            console.log("Error getting all problem", error);
            toast.error("Error in getting")
        } finally {
            set({ isProblemLoading: false })
        }   
    
    },

    getProblemById: async () => {
        try {
            set({ isProblemLoading: true })

            const res = await axiosInstance.get(`/problem/get-problem/${id}`)


            console.log("res", res);
            console.log("res.data", res.data);
            console.log("res.data.problems", res.data.problems);

            set({ problem: res.data.problems })
            toast.success(res.data.message)
        } catch (error) {
            console.log("Error getting  problem", error);
            toast.error("Error in getting problem")
        } finally {
            set({ isProblemLoading: false })
        }
    },

    getSolvedProblemByUser: async () => {
        try {
            const res = await axiosInstance.get("/get-solved-problem")

            // console.log("res", res);
            // console.log("res.data", res.data);
            // console.log("res.data.problems", res.data.problems);

            set({ solvedProblem: res.data.problems })
            toast.success(res.data.message)
        } catch (error) {
            console.log("Error solving problem", error);
            toast.error("Error solveing problem")
        } 
    }
}))

