import service from "../models/Servicemodel.js";


export default {
    AddService: async (req, res) => {
        try {
          // Extract the company data from the request body
          const serviceData = req.body;
    
          // Create a new Company instance with the extracted data
          const newservice = new service(serviceData);
  
          // Save the new company to the database
          await newservice.save();
  
          // Respond with a success message
          res.status(200).json({
              success: true,
              message: "service added successfully.",
          });
    
           
        } catch (err) {
               // If an error occurs, respond with an error message
               res.status(500).json({
                success: false,
                message: "Failed to add service.",
                error: err.message,
            });
        }
    },
    Editservice: async (req, res) => {
        try {
            const { id } = req.params;
            const { servicename,HSNCode,GST,SGST,CGST,Rate,UOM } = req.body;
    
            // Find the company with the given ID
            const Service = await service.findById(id);
    
            if (!Service) {
                // If the company with the given ID is not found, throw an error
                throw new Error("service not found.");
            }
    
            // Check if the 'id' and 'company._id' match
           
    
            // Update the company with the new data
            await service.findByIdAndUpdate(
                { _id: id },
                {servicename,HSNCode,GST,SGST,CGST,Rate,UOM},
                { new: true }
            );
    
            res.json({
                success: true,
                message: "service edited successfully.",
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },
    Deleteservice: async (req, res) => {
        try {
            const { id } = req.params

            const Service = await service.findById(id);
    
            if (!Service) {
                // If the company with the given ID is not found, throw an error
                throw new Error("service not found.");
            }
    
            await service.findByIdAndDelete({ _id: id });
            res.json({
                success: true,
                message: "company deleted successfully",
            })
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    },
    GetAllservice: async (req, res) => {
        try {
            const response = await service.find().sort({ createdAt: -1 })
            if (response) {
                res.json({
                    success:true,
                    message:"getting all service",
                    Data:response
                })
            }else{
                throw new Error(" service not found !!");
            }
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    }

}