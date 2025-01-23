import { useActionState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { addDetailsAction } from "@/actions/addDetails";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { setUserDetails } from "@/states/reducers/authSlice";

export default function KYCForm({ setOpen }: any) {
  const [state, formAction, pending] = useActionState(
    addDetailsAction,
    undefined
  );
  console.log(state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state?.data) {
      dispatch(setUserDetails(state.data));
      setOpen(false);
    }
  }, [state?.data]);

  return (
    <form action={formAction} method="POST" encType="multipart/form-data">
      <div className="flex items-center justify-center">
        <div className="flex flex-col rounded-lg h-auto space-y-4 bg-white">
          <div>
            <label
              htmlFor="file-upload"
              className="block text-sm font-medium text-gray-700"
            >
              Upload File
            </label>
            <Input
              type="file"
              id="file-upload"
              name="document"
              defaultValue={state?.document}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {state?.error?.document && (
            <ul className="text-red-500">
              {state.error.document.map((error: string) => (
                <li key={error} className="text-sm">
                  {error}
                </li>
              ))}
            </ul>
          )}

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <Select name="gender" defaultValue={state?.gender}>
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {state?.error?.gender && (
            <ul className="text-red-500">
              {state.error.gender.map((error: string) => (
                <li key={error} className="text-sm">
                  {error}
                </li>
              ))}
            </ul>
          )}

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Submiting" : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
}
