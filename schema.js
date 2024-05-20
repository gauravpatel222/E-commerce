const Joi=require('joi');
const productSchema = Joi.object({
    name:Joi.string().required(),
    img:Joi.string().required(),
    price:Joi.string().min(0).required(),
    description:Joi.string().required()
});

const reviewschema = Joi.object({
    rating: Joi.string().min(0).max(5).required(),
    comments:Joi.string().required()
})
module.exports={productSchema,reviewschema};