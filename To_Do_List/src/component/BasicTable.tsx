import { Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CellProps, Column, useTable } from "react-table";
import { Blog, Status } from "../common/Blog";

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}
type Props = {
  blogs: Blog[];
  onRemo: (id: string) => void;
  onStatusChange: (id: string, newStatus: Status) => void; // Thêm hàm xử lý thay đổi trạng thái
};

const BasicTable: React.FC<Props> = ({ blogs, onRemo, onStatusChange }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const dataUser = localStorage.getItem("userData");
    if (dataUser) {
      const parsedUserData = JSON.parse(dataUser);
      setUser(parsedUserData);
    }
  }, []);
  const columns: Column<Blog>[] = useMemo(
    () => [
      {
        Header: "Tên công việc",
        accessor: "title",
      },
      {
        Header: "Chi tiết công việc",
        accessor: "text",
      },
      {
        Header: "Ngày bắt đầu",
        accessor: "startDay",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Ngày kết thúc",
        accessor: "endDay",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Trạng thái",
        accessor: "status",
        Cell: ({ row }) => (
          <select
            value={row.original.status}
            onChange={(e) =>
              onStatusChange(row.original._id, e.target.value as Status)
            }
          >
            {Object.values(Status).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        ),
      },
      {
        Header: "Actions",
        Cell: ({ row }: CellProps<Blog>) => (
          <div className="flex gap-2">
            <Button
              variant="outlined"
              color="error"
              onClick={() => onRemo(row.original._id)}
            >
              Delete
            </Button>
            <Link to={`/edit/${row.original._id}`}>
              <Button variant="outlined">Edit</Button>
            </Link>
          </div>
        ),
      },
    ],
    [blogs]
  );

  useEffect(() => {
    const updateStatus = () => {
      blogs.forEach((blog) => {
        if (new Date(blog.endDay) < new Date() && blog.status !== Status.DONE) {
          onStatusChange(blog._id, Status.DELAYED);
        }
      });
    };

    updateStatus();
  }, []);

  const data = useMemo(() => blogs, [blogs]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      {user ? (
        <table
          {...getTableProps()}
          className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    scope="col"
                    className="px-6 py-3"
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="bg-white border-b text-black dark:bg-gray-800 dark:border-gray-700"
                >
                  {row.cells.map((cell) => (
                    <td className="px-6 py-4" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </>
  );
};

export default BasicTable;
