import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { Blog } from "../common/Blog";
import BlogSchema from "../validation/Blog";
import { joiResolver } from "@hookform/resolvers/joi";

type Props = {
  onAdd: (blog: Blog) => void;
};

const AddBlog = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Blog>({
    resolver: joiResolver(BlogSchema),
  });
  const onSubmit: SubmitHandler<Blog> = (data: Blog) => {
    const today = new Date();
    const todayClean = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const startDay = new Date(data.startDay);
    const endDay = new Date(data.endDay);

    if (startDay >= todayClean) {
      if (endDay >= startDay) {
        props.onAdd(data);
      } else {
        alert("Ngày kết thúc phải lớn hơn ngày bắt đầu");
      }
    } else {
      alert("Ngày bắt đầu phải lớn hơn hoặc bằng ngày hiện tại");
    }
  };
  return (
    <div className=" w-[40%] mx-auto mt-[2%]">
      <h2 className="text-center text-xl font-bold">Thêm Công Việc</h2>
      <form className="max-w-md mx-auto mt-5" onSubmit={handleSubmit(onSubmit)}>
        {/* ten cong viec */}

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
            {...register("title", { required: true, minLength: 1 })}
          />
          {errors.title && (
            <div className="text-red-500">{errors.title.message}</div>
          )}
        </div>

        {/* chi tiet cong viec  */}

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
            {...register("text", { required: true, minLength: 1 })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.text && (
            <div className="text-red-500">{errors.text.message}</div>
          )}
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
            {...register("startDay", { required: true })}
          />
          {errors.startDay && (
            <div className="text-red-500">{errors.startDay.message}</div>
          )}
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
            {...register("endDay", { required: true })}
          />
          {errors.endDay && (
            <div className="text-red-500">{errors.endDay.message}</div>
          )}
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

export default AddBlog;
