import Classifyer from "../models/classifyer.models";

const createClassifyer = async (req, res) => {
    try {
        const { source_type, ownership, activity_type, energy_consumption, fuel_type, transport_distance } =
            req.body;
        if (!source_type || !ownership || !activity_type || !energy_consumption || !fuel_type || !transport_distance) {
            return res.status(404).json({ message: "all the field are required", isSuccess: false });
        }
        const classifyer = new Classifyer({
            source_type,
            ownership,
            activity_type,
            energy_consumption,
            fuel_type,
            transport_distance,
        });
        const result = await classifyer.save();
        return res.status(200).json({ message: "classifyer created successfully", isSuccess: true });
    } catch (error) {
        return res.status(500).json({ message: "something went wrong" });
    }
};

export { createClassifyer };