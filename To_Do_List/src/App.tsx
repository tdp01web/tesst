import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import instance from "./api";
import { Blog, Status } from "./common/Blog";
import Admin from "./component";
import Account from "./component/Account";
import AddBlog from "./component/AddBlog";
import BasicTable from "./component/BasicTable";
import EditBlog from "./component/EditBlog";
import Login from "./component/Login";
import Register from "./component/Register";
import UpdatePassword from "./component/UpdatePassword";
import Layout from "./layout";
function App() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get("/blogs");
        setBlogs(data);
        console.log("🚀 ~ data:", data);
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    })();
  }, []);
  const onHandRemove = async (id: string) => {
    try {
      const confirm = window.confirm("Bạn có chắc muốn xóa không");
      if (confirm) {
        await instance.delete(`/blogs/${id}`);
        alert("Xóa Thành Công");
        setBlogs(blogs.filter((blog) => blog._id !== id));
      }
    } catch (error) {
      alert("Xóa thất bại");
    }
  };
  const onHandAdd = async (blog: Blog) => {
    try {
      const { data } = await instance.post("/blogs", blog);
      alert("Thêm thành công");
      setBlogs([...blogs, data]);
      navigate("/");
    } catch (error) {
      console.log("🚀 ~ onHandAdd ~ error:", error);
    }
  };
  const onHandEdit = async (blog: Blog) => {
    try {
      await instance.put(`/blogs/${blog._id}`, blog);
      alert("sửa thành công");
      setBlogs(blogs.map((item) => (item._id === blog._id ? blog : item)));
      navigate("/");
    } catch (error) {
      alert("Sửa Không Thành Công");
    }
  };
  const onStatusChange = async (id: string, newStatus: Status) => {
    try {
      const { data } = await instance.put(`/blogs/${id}`, {
        status: newStatus,
      });
      console.log(data);
      alert("Thay đổi trạng thái thành công");
      setBlogs(
        blogs.map((blog) =>
          blog._id === id ? { ...blog, status: newStatus } : blog
        )
      );
    } catch (error) {
      alert("Thay đổi trạng thái không thành công");
    }
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/test"
            element={<Admin blogs={blogs} onRemove={onHandRemove} />}
          />
          <Route path="/add" element={<AddBlog onAdd={onHandAdd} />} />
          <Route path="/edit/:id" element={<EditBlog onEdit={onHandEdit} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/:id" element={<Account />} />
          <Route path="/updatePW/:id" element={<UpdatePassword />} />
          <Route
            index
            path="/"
            element={
              <BasicTable
                blogs={blogs}
                onRemo={onHandRemove}
                onStatusChange={onStatusChange}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
