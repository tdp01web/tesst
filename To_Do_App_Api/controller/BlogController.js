import Blog from "../model/Blog.js";

class BlogController {
  async index(req, res) {
    try {
      const data = await Blog.find(req.query);
      res.json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async show(req, res) {
    try {
      const data = await Blog.findById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async store(req, res) {
    try {
      const data = await Blog.create(req.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async update(req, res) {
    try {
      await Blog.findByIdAndUpdate(req.params.id, req.body);
      const data = await Blog.findById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async delete(req, res) {
    try {
      const data = await Blog.findByIdAndDelete(req.params.id);
      res.status(204).json([]);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default BlogController;
