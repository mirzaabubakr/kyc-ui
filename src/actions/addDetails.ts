import { UserService } from "@/api/services";
import { toast } from "@/hooks/use-toast";
import { userDetailSchema } from "@/utils/validations/user_details.schema";

export const addDetailsAction = async (
  prevState: any,
  formData: FormData
): Promise<any> => {
  console.log(prevState);
  const formDataObj = Object.fromEntries(formData.entries());

  const validationFields = userDetailSchema.safeParse(formDataObj);

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      document: formData.get("document") || "",
      gender: formData.get("gender") || "",
    };
  }

  try {
    const { document, gender }: any = validationFields.data;
    const formData = new FormData();
    formData.set("document", document);
    formData.set("gender", gender);

    const response = await UserService.addDetails(formData);
    if (response) {
      return { data: response };
    }
  } catch (error: any) {
    toast({
      title: "Error",
      description: "An error occurred during Submission.",
      duration: 3000,
    });
    return { error: error.message };
  }
};
