import Fee from "../models/Fee.js";

// ===============================
// Get All Fees
// ===============================
export const getFees = async (req, res) => {
  try {
    const fees = await Fee.find()
      .populate(
        "studentId",
        "admissionNumber rollNumber firstName lastName className section"
      )
      .sort({ paymentDate: -1 });

    res.status(200).json({
      success: true,
      data: fees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Add Fee
// ===============================
export const addFee = async (req, res) => {
  try {
    const fee = await Fee.create(req.body);

    res.status(201).json({
      success: true,
      message: "Fee record added successfully.",
      data: fee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Fee
// ===============================
export const updateFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee record not found.",
      });
    }

    res.json({
      success: true,
      message: "Fee updated successfully.",
      data: fee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Delete Fee
// ===============================
export const deleteFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndDelete(req.params.id);

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee record not found.",
      });
    }

    res.json({
      success: true,
      message: "Fee deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};