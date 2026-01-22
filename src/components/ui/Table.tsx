import { type ReactNode } from "react";
import { cn } from "../../utils/cn";

interface Column<T> {
  header: string;
  accessor: (row: T) => ReactNode;
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string | number;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function Table<T>({
  data,
  columns,
  keyExtractor,
  isLoading,
  emptyMessage = "No data available",
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full h-48 flex items-center justify-center bg-white rounded-lg border border-gray-200">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="w-full h-32 flex items-center justify-center bg-white rounded-lg border border-gray-200 text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                scope="col"
                className={cn(
                  "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                  col.className,
                )}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr
              key={keyExtractor(row)}
              className="hover:bg-gray-50 transition-colors">
              {columns.map((col, index) => (
                <td
                  key={index}
                  className={cn(
                    "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                    col.className,
                  )}>
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
