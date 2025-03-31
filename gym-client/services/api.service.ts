// import axios, { AxiosResponse } from "axios";



// const apiInstance = axios.create({
//     baseURL: "http://localhost:8080",
//     headers: {
//         "Content-Type": "application/json",
//     },
//     timeout: 10000
// })

// export const callApi = async <T>(endpoint: string, method: "get" | "post" | "put" | "delete", data?: any) : Promise<T> => {
//     try {
//         const response: AxiosResponse<T> = await apiInstance({
//             url: endpoint,
//             method,
//             data
//         })
        
//     } catch (error) {
//         console.error("error Api", error);
//         throw error;
        
//     }
// }