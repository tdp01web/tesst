import { format } from "date-fns";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import instance from "../api";
import { Blog } from "../common/Blog";
type Props = {
  onEdit: (blog: Blog) => void;
};
const EditBlog = ({ onEdit }: Props) => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm<Blog>({
    // resolver : joiResolver(BlogSchema)
  });
  useEffect(() => {
    (async () => {
      const { data } = await instance.get(`/blogs/${id}`);
      const { startDay, endDay, ...restData } = data;
      reset({
        ...restData,
        startDay: format(new Date(startDay), "yyyy-MM-dd"),
        endDay: format(new Date(endDay), "yyyy-MM-dd"),
      });
      console.log(data);
    })();
  }, [id, reset]);
  const onSubmit: SubmitHandler<Blog> = (data: Blog) => {
    const startDay = new Date(data.startDay);
    const endDay = new Date(data.endDay);
    if (endDay >= startDay) {
      onEdit(data);
    } else {
      alert("Ngày kết thúc phải lớn hơn ngày bắt đầu");
    }
  };
  return (
    <div className=" w-[40%] mx-auto mt-[100px]">
      <h2 className="text-center text-xl font-bold">Sửa Công Việc</h2>
      <form className="max-w-md mx-auto mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tên Công Việc
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            {...register("title")}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Chi Tiết Công Việc
          </label>
          <input
            type="text"
            id="text"
            {...register("text")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        {/* ngay bat dau */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Ngày Bắt Đầu
          </label>
          <input
            type="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            {...register("startDay")}
          />
        </div>

        {/* ngày kết thúc */}

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Ngày Kết Thúc
          </label>
          <input
            type="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            {...register("endDay")}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditBlog;
