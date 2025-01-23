import { UserService } from "@/api/services";
import { AddKYCDialog } from "@/components/dialogs/AddKYCDialog";
import LogoutButton from "@/components/shared/LogoutButton";
import UserDetails from "@/components/tables/UserDetails";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { setUserDetails } from "@/states/reducers/authSlice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const columns = [
  {
    accessorKey: "userId",
    header: "User Id",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "documentPath",
    header: "Document Path",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector((state) => state.auth.userDetails);

  const { data, error, isLoading }: any = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const response = await UserService.getDetails();
      return response;
    },
  });

  useEffect(() => {
    if (data) {
      dispatch(setUserDetails(data.kycs[0]));
    }
  }, [data, dispatch]);

  if (error) return <div>Request Failed</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex justify-between w-full h-10 p-4">
        <div></div>
        <LogoutButton />
      </div>
      <div className="flex flex-col gap-5 items-center justify-center min-h-screen">
        <div className="w-1/2 bg-white gap-4 p-4 rounded-lg shadow-xl">
          <div className="flex justify-between">
            <div className="w-1/2"></div>
            <div>
              <AddKYCDialog />
            </div>
          </div>
          <UserDetails
            columns={columns}
            data={userDetails ? [userDetails] : []}
          />
        </div>
      </div>
    </>
  );
}
