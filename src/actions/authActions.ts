import { AuthService } from "@/api/services";
import { toast } from "@/hooks/use-toast";
import { registerSchema, signInSchema } from "@/utils/validations/auth.schema";

export const loginAction = async (
  prevState: any,
  formData: FormData
): Promise<any> => {
  console.log(prevState);
  const formDataObj = Object.fromEntries(formData.entries());
  const validationFields = signInSchema.safeParse(formDataObj);

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      email: formData.get("email") || "",
      password: formData.get("password") || "",
    };
  }
  try {
    const response = await AuthService.login(validationFields.data);
    if (response) {
      localStorage.setItem("authToken", (response as any).token);
      return { data: response };
    }
  } catch (error: any) {
    toast({
      title: "Login failed",
      description: "An error occurred during login.",
      duration: 3000,
    });
    return { error: error.message };
  }
};

export const registerAction = async (
  prevState: any,
  formData: FormData
): Promise<any> => {
  console.log(prevState);
  const formDataObj = Object.fromEntries(formData.entries());
  const validationFields = registerSchema.safeParse(formDataObj);

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      name: formData.get("name") || "",
      email: formData.get("email") || "",
      password: formData.get("password") || "",
    };
  }
  try {
    const response = await AuthService.register(validationFields.data);
    if (response) {
      localStorage.setItem("authToken", (response as any).token);
      return { data: response };
    }
  } catch (error: any) {
    toast({
      title: "Login failed",
      description: "An error occurred during login.",
      duration: 3000,
    });
    return { error: error.message };
  }
};
