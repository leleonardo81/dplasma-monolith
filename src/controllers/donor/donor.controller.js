import { successResponse, errorResponse } from "../../helpers";
import { DonorRequest, User, Hospital } from "../../models";

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
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.size) || 5;
  const { lat, lng, rsid } = req.query;
  try {
    const query = {};
    if (rsid) query.rsid = rsid;
    if (lat) query.lat = lat;
    if (lng) query.lng = lng;
    const donorRequest = await DonorRequest.findAndCountAll({
      where: query,
      offset: (page-1) * limit,
      limit
    });
    successResponse(req, res, donorRequest);
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, "Server Error");
  }
}

export const getDetailDonorRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const donorRequest = (await DonorRequest.findOne({where: { id }})).dataValues;
    const user = (await User.findOne({ where: { uid: donorRequest.uid } })).dataValues;
    delete donorRequest.uid;
    const hospital = (await Hospital.findOne({ 
      include: [{association: Hospital.address}],
      where: {rsid: donorRequest.rsid}
    })).dataValues;
    delete donorRequest.rsid;
    console.log({...donorRequest, hospital, user});
    successResponse(req, res, {...donorRequest, hospital, user});
  } catch (error) {
    console.error(error)
    return errorResponse(req, res, "cannot Find", 404);
  }
}