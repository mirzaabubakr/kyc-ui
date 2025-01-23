import { UserService } from "@/api/services";
import { UserDetailsPieChart } from "@/components/charts/UserDetailsPieChart";
import LogoutButton from "@/components/shared/LogoutButton";
import UserDetails from "@/components/tables/UserDetails";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { setUsers } from "@/states/reducers/usersSlice";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

const columns = [
  {
    accessorKey: "userId",
    header: "User Id",
  },
  {
    accessorKey: "user.name",
    header: "User Name",
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

export default function AdminPanel() {
  const token = localStorage.getItem("authToken") || "";
  const decodedUser: any = jwtDecode(token);

  const dispatch = useAppDispatch();
  const { data, error, isLoading }: any = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const response = await UserService.getDetails();
      return response;
    },
  });
  useEffect(() => {
    if (data && data.kycs.length > 0) {
      dispatch(setUsers(data));
    }
  }, [data]);

  if (error) return <div>Request Failed</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex justify-between w-full h-10 p-4">
        <div></div>
        <LogoutButton />
      </div>
      <div className="flex flex-col gap-5 items-center justify-center min-h-screen">
        <div className="w-10/12 bg-white gap-4 p-4 items-center rounded-lg shadow-xl">
          <h1 className="text-center text-blue-500">Know Your Customers</h1>
          <UserDetailsPieChart />
          <UserDetails columns={columns} role={decodedUser.role} />
        </div>
      </div>
    </>
  );
}
