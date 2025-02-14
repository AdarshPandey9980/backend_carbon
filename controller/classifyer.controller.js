import Classifyer from "../models/classifyer.models.js";

const createClassifyer = async (req, res) => {
    try {
        const { source_type, ownership, activity_type, energy_consumption, fuel_type, transport_distance,emission_factor,emission_scope } =
            req.body;
        if (!source_type || !ownership || !activity_type || !energy_consumption || !fuel_type || !transport_distance || !emission_factor || !emission_scope) {
            return res.status(404).json({ message: "all the field are required", isSuccess: false });
        }

        const userId = req.userId
        const classifyer = new Classifyer({
            source_type,
            ownership,
            activity_type,
            energy_consumption,
            fuel_type,
            transport_distance,
            emission_factor,
            emission_scope,
            company_id:userId
        });
        const result = await classifyer.save();
        return res.status(200).json({ message: "classifyer created successfully", isSuccess: true });
    } catch (error) {
        return res.status(500).json({ message: "something went wrong" });
    }
};

export { createClassifyer };