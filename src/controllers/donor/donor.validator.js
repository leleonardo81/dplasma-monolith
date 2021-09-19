import Joi from "joi";

export const assesment = {
  body: Joi.object({
    negative_covid: Joi.boolean().required(),
    is_covid_survivor: Joi.boolean().required(),
    covid_healed_date: Joi.date(),
    age: Joi.number().required(),
    weight: Joi.number().required(),
    gender: Joi.string().required(),
    have_pregnant: Joi.boolean(),
    cronic_disease: Joi.boolean().required(),
    transfused_record: Joi.boolean().required(),
    last_transfused_date: Joi.date()
  }),
};

export const postDonorRequest = {
  body: Joi.object({
    rsid: Joi.string().required(),
    status: Joi.string().required(),
    bloodtype: Joi.string().required(),
    age: Joi.number().required(),
    description: Joi.string()
  })
}