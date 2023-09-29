import Joi  from "joi";

export const signUpSchema =  {
    body:Joi.object({
        userName : Joi.string().alphanum().required(),
        email:Joi.string().email().required(),
        gender : Joi.string().valid('Female','Male'),
        age: Joi.number().integer().min(20).max(80).required(),
        password : Joi.string().required(),
        cPassword : Joi.string().valid(Joi.ref('password')).required(),
    }),
    // query:Joi.object({
    //     test:Joi.boolean().required() 
    //  })
    }

export const signInSchema = Joi.object({
    email:Joi.string().email().required().min(5).messages({
        'string.empty':"Email is required",
        'string.email':"plz enter a valid email address"
    }),
    password : Joi.string().required().min(3).messages({
        'string.empty':"password is required",

    })


})