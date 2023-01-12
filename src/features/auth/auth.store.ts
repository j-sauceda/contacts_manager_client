import create from "zustand";
import { persist, devtools } from "zustand/middleware";

interface Auth {
  accessToken: string | undefined;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  setUser: (authToken: string) => void;
  resetUser: () => void;
  setError: (errorState: boolean) => void;
  setSuccess: (successState: boolean) => void;
  setLoading: (loadingState: boolean) => void;
  setMessage: (msg: string) => void;
}

export const authStore = create<Auth>()(
  devtools(
    persist(
      (set) => ({
        // initial state
        accessToken: undefined,
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: "",
        // methods for manipulating state
        setUser: async (authToken: string) =>
          set((state) => ({ ...state, accessToken: authToken })),
        resetUser: async () =>
          set((state) => ({ ...state, accessToken: undefined })),
        setError: async (errorState: boolean) =>
          set((state) => ({ ...state, isError: errorState })),
        setSuccess: async (successState: boolean) =>
          set((state) => ({ ...state, isSuccess: successState })),
        setLoading: async (loadingState: boolean) =>
          set((state) => ({ ...state, isLoading: loadingState })),
        setMessage: async (msg: string) =>
          set((state) => ({ ...state, message: msg })),
      }),
      {
        name: "authentication-storage",
      }
    )
  )
);
