import { create } from "zustand"
import { axiosInstance }  from "../lib/axios.js"
import toast from "react-hot-toast"

export const useAuthStore = create((set) => ({
    authUser: null,   // it is working
    isSignUp: false,  // 
    isLoggingIn: false,
    isCheckingAuth: false,


    checkAuth: async() => {
        set({ isCheckingAuth: true })
        try {
            const res = await axiosInstance.get('/auth/check');
            console.log("✅ Full response:", res);
            console.log("✅ Response data:", res.data);
            console.log("✅ User data:", res.data.user);
            
            if (res.data.success && res.data.user) {
                set({ authUser: res.data.user })
                // console.log("✅ Auth user set successfully:", res.data.user)
            } else {
               set({ authUser: null })
            }
        } catch (error) {
          
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async(data) => {
        set({ isSignUp: true })
        try {

            const res = await axiosInstance.post('/auth/register', data);

            console.log("res",res);
            console.log("res.data",res.data);
            console.log("res.data.user",res.data.user);
            console.log("res.data.data", res.data.data);
            
            set({ authUser: res.data.user || res.data.data})
            toast.success(res.data.message);

        } catch (error) {
            console.log("Error checking auth", error);
            toast.error("Error signing up");
        
        } finally {
            set({ isSignUp: false })
        }
    },

    login: async(data) => {
        
        
        set({ isLoggingIn: true })
        try {

            const res = await axiosInstance.post('/auth/login', data);
            
            console.log("res",res);
            console.log("res.data",res.data);
            console.log("res.data.user",res.data.user);
            console.log("res.data.data", res.data.data);
            
            set({ authUser: res.data.user || res.data.data})
            toast.success(res.data.message);

        } catch (error) {
            
            console.log("Error checking auth", error);
            toast.error("Error signing up");

        } finally {
            set({ isLoggingIn: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logout successful")
        } catch (error) {
            console.log("Error loggin out", error);
            toast.error("Error loggin out")
        }
    } 
})) 