import axiosInstance from "./axios";

export const AuthService = {
  login: (credentials: { email: string; password: string }) =>
    axiosInstance.post("/api/auth/login", credentials),
  register: (data: any) => axiosInstance.post("/api/auth/register", data),
};

export const UserService = {
  addDetails: (data: any) => axiosInstance.post("/api/kyc", data),
  getDetails: () => axiosInstance.get("/api/kyc"),
};

export const AdminService = {
  updateStatus: (status: any, id: string) => {
    return axiosInstance.patch(`/api/kyc/${id}`, { status: status });
  },
};

export const KYCServices = {
  viewDocument: (path: any) =>
    axiosInstance.get(`api/kyc/generate-presigned-url?path=${path}`),
};
