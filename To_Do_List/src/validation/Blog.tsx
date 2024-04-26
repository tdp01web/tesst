import Joi from "joi";
const BlogSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
  startDay: Joi.date().required(),
  endDay: Joi.date().required(),
});
export default BlogSchema;
