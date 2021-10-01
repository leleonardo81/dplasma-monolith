import { successResponse, errorResponse } from "../../helpers";
import { DonorRequest } from "../../models";

export const assesment = async (req, res) => {
  const {
    negative_covid,
    is_covid_survivor,
    covid_healed_date,
    age,
    weight,
    gender,
    have_pregnant,
    cronic_disease,
    transfused_record,
    last_transfused_date
  } = req.body; 

  try {
    let isEligible = true;
    if (!negative_covid) isEligible = false;
    const healedDateDiff = new Date(new Date().toDateString()) - new Date(covid_healed_date);
    if (!(is_covid_survivor && healedDateDiff < 86400000 * 90)) isEligible = false;
    if (age<18 || age>60) isEligible = false;
    if (weight<55) isEligible = false;
    if (gender==='female' && have_pregnant) isEligible = false;
    if (cronic_disease) isEligible = false;
    const lastTransfusedDiff = new Date(new Date().toDateString()) - new Date(last_transfused_date);
    if (transfused_record && lastTransfusedDiff < 86400000 * 365) isEligible = false;
    
    successResponse(req, res, { isEligible });
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, "Server Error");
  }
}

export const postDonorRequest = async (req, res) => {
  try {
    const { body, user } = req;
    const { uid } = user;
    const donorRequest = await DonorRequest.create({ ...body, uid });
    
    successResponse(req, res, donorRequest);
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, "Server Error");
  }
}

export const getDonorRequest = async (req, res) => {
  const { lat, lng, rsid } = req.query;
  try {
    const query = {};
    if (rsid) query.rsid = rsid;
    if (lat) query.lat = lat;
    if (lng) query.lng = lng;
    const donorRequest = await DonorRequest.findAll({
      where: query
    });
    successResponse(req, res, donorRequest);
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, "Server Error");
  }
}