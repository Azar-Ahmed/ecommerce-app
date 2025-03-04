import Order from "../../models/order.model.js";
export const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find()
      if(!orders.length)  return res.status(400).json({status: false, message: "No orders found"})
      res.status(200).json({status: true, data: orders})
    }catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server error", error: error.message });
    }
  }

  export const getOrderDetails = async (req, res) => {
    try {
      const { id } = req.params;
  
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found!",
        });
      }
      res.status(200).json({status: true, data: order})
  
    }catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server error", error: error.message });
    }
  }
  

  export const updateOrderStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { orderStatus } = req.body;

      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found!",
        });
      }

      await Order.findByIdAndUpdate(id, { orderStatus });
      
      res.status(200).json({status: true, message: "Order status is updated successfully!"})
  
    }catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server error", error: error.message });
    }
  }
  
  