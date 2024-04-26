import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../model/User.js";

class AuthController {
  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });

      if (!user) {
        return res.status(400).json("Email or Password incorrect!");
      }

      const match = await bcrypt.compare(req.body.password, user.password);

      if (match) {
        const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        return res.json(token);
      }

      res.status(400).json("Email or Password incorrect!");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async register(req, res) {
    try {
      const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
      const hash = bcrypt.hashSync(req.body.password, salt);

      const data = {
        email: req.body.email,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
      };

      const user = await User.create(data);

      const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json(token);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async updateUser(req, res) {
    try {
      const userId = req.params.id; // Lấy userId từ tham số của yêu cầu

      // Tìm người dùng theo id
      const user = await User.findById(userId);

      // Nếu không tìm thấy người dùng, trả về lỗi 404
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Cập nhật thông tin người dùng nếu được cung cấp trong yêu cầu
      if (req.body.email) {
        user.email = req.body.email;
      }
      if (req.body.firstName) {
        user.firstName = req.body.firstName;
      }
      if (req.body.lastName) {
        user.lastName = req.body.lastName;
      }
      if (req.body.phone) {
        user.phone = req.body.phone;
      }

      // Lưu thông tin người dùng đã được cập nhật
      await user.save();

      // Trả về thông báo thành công
      res.json({ message: "User information updated successfully" });
    } catch (error) {
      // Xử lý lỗi nếu có
      res.status(500).json({ error: error.message });
    }
  }

  async updatePassword(req, res) {
    try {
      const userId = req.params.id;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json("User not found");
      }

      const match = await bcrypt.compare(
        req.body.passwordOld, // Sử dụng req.body.passwordOld thay vì req.query.currentPassword
        user.password
      );

      if (!match) {
        return res.status(400).json("Current password is incorrect");
      }

      const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
      const hash = bcrypt.hashSync(req.body.passwordNew, salt); // Sử dụng req.body.passwordNew thay vì req.query.newPassword

      user.password = hash;
      await user.save();

      res.json("Password updated successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default AuthController;
