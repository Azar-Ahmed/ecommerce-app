import paypal from '../../helpers/paypal.js'
import Order from "../../models/order.model.js";
import Cart from "../../models/cart.model.js";
import Product from "../../models/product.model.js";
import pkg from 'paypal-rest-sdk';
const { order } = pkg;


export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId
    } = req.body;

    console.log(addressInfo)

    const create_payment_json= {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
            {
            item_list: {
                items: cartItems.map((item) => ({
                    name: item.title,
                    sku: item.productId,
                    price: Number(item.price).toFixed(2),
                    currency: 'USD',
                    quantity: item.quantity,
                }))
            },
            amount: {
                currency: 'USD',
                total: totalAmount.toFixed(2),
            },
            description: 'description'
        }
        ]
    }

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
        if(error) {
          console.log(error)
            return  res.status(500).json({ success: false, message: "Error while creating paypal payment"});
        } else{
            const newlyCreatedOrder = new Order({
              userId,
              cartId,
                cartItems,
                addressInfo,
                orderStatus,
                paymentMethod,
                paymentStatus,
                totalAmount,
                orderDate,
                orderUpdateDate,
                paymentId,
                payerId,  
            })
            await newlyCreatedOrder.save();

            const approvalUrl = paymentInfo.links.find((link) => link.rel === 'approval_url').href;
            res.status(201).json({success: true, approvalUrl, orderId: newlyCreatedOrder._id})
        }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const capturePayment = async (req, res) => {
  try {

    const {paymentId, payerId, orderId}= req.body;

    let order = await Order.findByID(orderId)
    
    if(!order) return res.status(400).json({success: false, message: "Order is not present!"})

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for(let item of order.cartItems){
      let product = await Product.findById(item.productId);
      if(!product) return res.status(400).json({success: false, message: `Not enough stock for this product! ${product.title}`})
      
      product.totalStock -= item.quantity
      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId)

    await order.save();

    res.status(200).json({success: true, message: "Order Confirmed", data: order})

  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};



export const getAllOrdersByUser = async (req, res) => {
  try {
    const {userId}= req.params;
    const orders = await Order.find({userId})
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

