import userModel from "../../../../DB/User.model.js";

export const profile = async(req,res) => {

    // const user = await userModel.findById(req.id);
    return res.json({messages:req.user});
}