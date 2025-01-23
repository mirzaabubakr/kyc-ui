import { KYCServices } from "@/api/services";
import { useMutation } from "@tanstack/react-query";

export default function ViewDocument({ cell }: any) {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (path: string) => {
      const response = await KYCServices.viewDocument(path);
      return response;
    },
    onSuccess: (data: any) => {
      window.open(data.uploadURL, "_blank");
    },
  });
  if (isError) return <div>Request Failed</div>;
  if (isPending) return <div>Loading...</div>;
  const handleClick = () => {
    mutate(cell.row.original.documentPath);
  };

  return (
    <div
      className="text-blue-400  cursor-pointer hover:underline "
      onClick={handleClick}
    >{`${cell.row.original.documentPath}`}</div>
  );
}
