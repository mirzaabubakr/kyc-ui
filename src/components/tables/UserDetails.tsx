import { useReactTable } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender, getCoreRowModel } from "@tanstack/react-table";
import ChangeStatus from "@/components/select/ChangeStatus";
import { useAppSelector } from "@/hooks/redux-hooks";
import ViewDocument from "../view-documents/ViewDocument";

export default function UserDetails({ columns, data, role }: any) {
  const usersData: any = useAppSelector((state) => state.users.users);
  const userData = role == "admin" ? usersData?.kycs || [] : data;
  const table = useReactTable({
    data: userData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  if (cell.column.id === "status" && role === "admin") {
                    return (
                      <TableCell key={cell.id}>
                        <ChangeStatus cell={cell} />
                      </TableCell>
                    );
                  } else if (cell.column.id === "documentPath") {
                    return (
                      <TableCell key={cell.id}>
                        <ViewDocument cell={cell} />
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
