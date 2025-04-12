import { Address } from "../../models/address.models.js";


const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, addressType } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !addressType) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      addressType,
    });

    await newAddress.save();

    return res.status(200).json({
      success: true,
      message: "Address saved successfully",
      data: newAddress,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error saving address",
    });
  }
};


const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const updateData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Address ID are required",
      });
    }

    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      updateData,
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: updatedAddress,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error updating address",
    });
  }
};


const fetchAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const addresses = await Address.find({ userId });

    return res.status(200).json({
      success: true,
      message: "Addresses fetched successfully",
      data: addresses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching addresses",
    });
  }
};


const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    console.log(userId,addressId);
    
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Address ID are required",
      });
    }

    const deleted = await Address.findOneAndDelete({ _id: addressId, userId });


    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error deleting address",
    });
  }
};

export { addAddress, editAddress, fetchAddress, deleteAddress };