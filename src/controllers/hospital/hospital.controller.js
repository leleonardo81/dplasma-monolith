import { successResponse, errorResponse } from "../../helpers";
import { Hospital, Address } from "../../models";

export const listRS = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.size) || 5;
    const hospitals = await Hospital.findAndCountAll({
      include: [{association: Hospital.address}],
      offset: (page-1) * limit,
      limit
    });
    return successResponse(req, res, {...hospitals, page });
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, "Server Error");
  }
}

export const createRS = async (req, res) => {
  try {
    const { body } = req;
    const data = {...body, address: JSON.parse(body.address)}
    const hospital = await Hospital.create(data, {
      include: [{
        association: Hospital.address,
      }]
    })
    return successResponse(req, res, hospital);
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, "Server Error");
  }
}