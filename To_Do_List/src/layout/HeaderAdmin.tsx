import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}
const HeaderAdmin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      setUser(user.user);
    }
  }, []);
  const handLogOut = () => {
    const confirm = window.confirm("Bạn có chắc muốn đăng xuất");
    if (confirm) {
      localStorage.removeItem("userData");
      setUser(null);
      navigate("/login");
    }
  };
  return (
    <div className="">
      <nav className="bg-gray-300 ">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-end">
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {user ? (
                <div>
                  <Dropdown>
                    <MenuButton>Xin Chào: {user.email}</MenuButton>
                    <Menu>
                      <MenuItem>
                        <Link to={`/account/${user._id}`}>
                          Thay đổi thông tin tài khoản
                        </Link>{" "}
                      </MenuItem>
                      <MenuItem>
                        <Link to={`/updatePW/${user._id}`}>Đổi mật khẩu</Link>{" "}
                      </MenuItem>
                      <MenuItem onClick={handLogOut}>Đăng xuất</MenuItem>
                    </Menu>
                  </Dropdown>
                </div>
              ) : (
                <Link to={"/login"}>
                  <Button variant="contained">Đăng Nhập</Button>
                </Link>
              )}
              {/* Profile dropdown */}
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HeaderAdmin;
