/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Circle } from "lucide-react";
interface AppTableProps {
  taskColumns: { label: string; key: string }[];
  data: any[];
  renderActions?: (row: any) => React.ReactNode;
}

const getValue = (row: any, key: string): any => {
  return key.split(".").reduce((obj, k) => obj?.[k], row);
};

const AppTable: React.FC<AppTableProps> = ({
  taskColumns,
  data,
  renderActions,
}) => {
  if (!data || data.length === 0)
    return <p className="text-center">No data found.</p>;

  return (
    <Table className="border w-full">
      <TableHeader>
        <TableRow>
          {taskColumns.map((col) => (
            <TableHead key={col.key} className="px-4 py-2 border-r text-base">
              {col.label}
            </TableHead>
          ))}
          {renderActions && (
            <TableHead className="px-4 py-2">Actions</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {taskColumns.map((col) => (
              <TableCell
                key={col.key}
                className={`px-4 py-2 border-r ${
                  col.key === "status" && "flex gap-1 items-center"
                }`}
              >
                {col.key === "status" && getValue(row, col.key) === "in" ? (
                  <Circle fill="green" size={10} />
                ) : col.key === "status" && getValue(row, col.key) === "out" ? (
                  <Circle fill="red" />
                ) : (
                  ""
                )}
                {getValue(row, col.key)}
              </TableCell>
            ))}
            {renderActions && (
              <TableCell className="px-4 py-2">{renderActions(row)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AppTable;
