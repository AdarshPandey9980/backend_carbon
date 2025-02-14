import RandomData from "../models/randomData.models.js";

function generateMockEmissionData() {
    const sourceTypes = ['vehicle', 'electricity', 'supplier'];
    const ownerships = ['owned', 'purchased', 'third-party'];
    const activityTypes = ['fuel-combustion', 'power-usage', 'purchased-goods'];
    const fuelTypes = ['grid', 'n/a', 'diesel', 'petrol'];
    const emissionScopes = ['scope1', 'scope2', 'scope3'];
  
    return {
      source_type: sourceTypes[Math.floor(Math.random() * sourceTypes.length)],
      ownership: ownerships[Math.floor(Math.random() * ownerships.length)],
      activity_type: activityTypes[Math.floor(Math.random() * activityTypes.length)],
      energy_consumption: parseFloat((Math.random() * 100).toFixed(2)),
      fuel_type: fuelTypes[Math.floor(Math.random() * fuelTypes.length)],
      transport_distance: Math.floor(Math.random() * 1000),
      emission_factor: parseFloat((Math.random() * 10).toFixed(2)),
      emission_scope: emissionScopes[Math.floor(Math.random() * emissionScopes.length)],
    };
  }


const  saveEmissionData = async () => {
    try {
      const mockData = generateMockEmissionData();

      const Company_id="67afb3a5f5bab6f514f3bf4f";

      const data = await RandomData.findOne({Company_id})

      if (!data) {
        const newRecord = new RandomData({
          Company_id,
          randomData: [mockData]
        });
        await newRecord.save();
        console.log(`New record created for user`);
      } else {
        const updateResult = await RandomData.findOneAndUpdate({Company_id},
            {
              $push: { randomData: mockData },
              $set: { updatedAt: new Date() }
            },
            { new: true }
          );
          console.log(`Data saved at ${new Date().toISOString()}`);
        
      }

      
      
      // Try to update existing document
    //   const updateResult = await RandomData.findOneAndUpdate({},
    //     {
    //       $push: { randomData: mockData },
    //       $set: { updatedAt: new Date() }
    //     },
    //     { new: true }
    //   );
  
    //   // If no document was found, create a new one
    //   if (!updateResult) {
    //     const newRecord = new RandomData({
    //       randomData: [mockData]
    //     });
    //     await newRecord.save();
    //     console.log(`New record created for user ${userId}`);
      
  
    //   console.log(`Data saved at ${new Date().toISOString()}`);
    } catch (error) {
      console.error('Error saving emission data:', error);
    }
  }

 const getData = async (req,res) => {
    try {
    const userId = req.userId
      const emissions = await RandomData.findOne({Company_id:userId}).populate('randomData');
      if (!emissions) {
        return res.status(404).json({ message: 'Data not found' });
      }
     return res.json({message:"data fetched successfully",data:emissions.randomData,isSuccess:true});
    } catch (error) {
    return  res.status(500).json({ message: 'Error fetching data' });
    }
  }

  export {saveEmissionData,getData}
  