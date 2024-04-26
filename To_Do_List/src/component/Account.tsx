import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import instance from "../api";
interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}
const Account = () => {
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams();
  const { register, handleSubmit } = useForm<User>();
  const navigae = useNavigate();
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parserdData = JSON.parse(userData);
        setUser(parserdData.user);
      } catch (error) {
        console.log("🚀 ~ useEffect ~ error:", error);
      }
    }
  }, []);
  const onSubmit: SubmitHandler<User> = async (formData: User) => {
    if (!user) {
      console.log("User is not defined");
      return;
    }

    try {
      const response = await instance.put(`/auth/updateUser/${id}`, formData);
      alert("sửa tài khoản thành công vui lòng đăng nhập lại");
      localStorage.removeItem("user");
      navigae("/login");
      console.log(response.data);
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
  };

  return (
    <div>
      <div className="border-2 border-solid border-gray-300 p-5 rounded-xl  w-[35%] mx-auto flex flex-col mt-40">
        <div className="flex justify-between items-end">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Thông tin tài khoản
          </h1>
          <Link to={"/"}> Quay lại trang chủ</Link>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full  mx-auto mt-5 flex flex-col gap-5"
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={user?.email || ""}
              {...register("email")}
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your phone
            </label>
            <input
              type="number"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={user?.phone || ""}
              {...register("phone")}
              required
            />
          </div>

          <div className="flex gap-5">
            <div className="w-[50%]">
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your firstName
              </label>
              <input
                type="text"
                id="firstName"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={user?.firstName || ""}
                {...register("firstName")}
                required
              />
            </div>
            <div className="w-[50%]">
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your lastName
              </label>
              <input
                type="text"
                id="lastName"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={user?.lastName || ""}
                {...register("lastName")}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="text-white mx-auto  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Account;
