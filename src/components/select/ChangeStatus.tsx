import { flexRender } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { AdminService } from "@/api/services";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { updateUserStatusById } from "@/states/reducers/usersSlice";

export default function ChangeStatus({ cell }: any) {
  const dispatch = useAppDispatch();
  const [selectedStatus, setSelectedStatus] = useState(
    cell.row.original.status
  );

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ status, id }: { status: string; id: string }) => {
      const response = await AdminService.updateStatus(status, id);
      return response;
    },
    onSuccess: (data) => {
      setSelectedStatus(data.status);
      dispatch(updateUserStatusById(data));
    },
  });

  if (isError) return <div>Request Failed</div>;
  if (isPending) return <div>Loading...</div>;

  const handleValueChange = (value: any) => {
    mutate({ status: value, id: cell.row.original.id });
  };

  return (
    <Select
      // value={selectedStatus}
      onValueChange={handleValueChange}
      disabled={isPending}
    >
      <SelectTrigger>
        <SelectValue placeholder={`${cell.row.original.status}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="approved">Approved</SelectItem>
        <SelectItem value="rejected">Rejected</SelectItem>
      </SelectContent>
    </Select>
  );
}
