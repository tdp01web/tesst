import { FaPencilAlt } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Blog } from "../common/Blog";

type Props = {
  blogs: Blog[];
  onRemove: (id: string) => void;
};

const Admin = (props: Props) => {
  const { blogs, onRemove } = props;

  return (
    <div className="relative w-[100%] mt-5 mx-auto border-2 border-solid border-gray-400 p-3 overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4"></div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Tên Công Việc
            </th>
            <th scope="col" className="px-6 py-3">
              Chi Tiết Công Việc
            </th>
            <th scope="col" className="px-6 py-3">
              Ngày Bắt Đầu
            </th>
            <th scope="col" className="px-6 py-3">
              Ngày Kết Thúc
            </th>
            <th scope="col" className="px-6 py-3">
              Trạng Thái
            </th>
            <th scope="col" className="px-6 py-3">
              Chức Năng
            </th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr
              key={blog._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {blog.title}
              </th>
              <td className="px-6 py-4">{blog.text}</td>
              <td className="px-6 py-4">
                {new Date(blog.startDay).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                {new Date(blog.endDay).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">{blog.status}</td>
              <td className="px-6 py-4 flex gap-5 text-[20px] ">
                <div
                  onClick={() => onRemove(String(blog._id))}
                  className="font-medium text-red-500 dark:text-red-400 hover:underline"
                >
                  <FaTrashCan />
                </div>
                <Link to={`/edit/${blog._id}`} className="text-blue-500">
                  <FaPencilAlt />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default Admin;
