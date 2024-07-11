// // src/controllers/cartController.js
// import Cart from "../models/Cart"; // Assuming you have a Cart model

// export const getCart = async (
//   req: { user: { id: any } },
//   res: {
//     json: (arg0: any) => void;
//     status: (arg0: number) => {
//       (): any;
//       new (): any;
//       json: { (arg0: { message: string }): void; new (): any };
//     };
//   }
// ) => {
//   try {
//     const cart = await Cart.findOne({ userId: req.user.id });
//     res.json(cart);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// export const addToCart = async (
//   req: { body: { productId: any; quantity: any }; user: { id: any } },
//   res: {
//     status: (arg0: number) => {
//       (): any;
//       new (): any;
//       json: { (arg0: { message: string; errors?: any }): void; new (): any };
//     };
//     json: (arg0: any) => void;
//   }
// ) => {
//   try {
//     const { productId, quantity } = req.body;
//     const cart = await Cart.findOneAndUpdate(
//       { userId: req.user.id, "items.productId": productId },
//       { $inc: { "items.$.quantity": quantity } },
//       { new: true, upsert: true }
//     );
//     if (!cart)
//       return res.status(400).json({ message: "Failed to add to cart" });
//     res.json(cart);
//   } catch (error) {
//     res.status(400).json({ message: "Validation Error", errors: error.errors });
//   }
// };

// export const updateCart = async (
//   req: { body: { quantity: any }; user: { id: any }; params: { id: any } },
//   res: {
//     status: (arg0: number) => {
//       (): any;
//       new (): any;
//       json: { (arg0: { message: string; errors?: any }): void; new (): any };
//     };
//     json: (arg0: any) => void;
//   }
// ) => {
//   try {
//     const { quantity } = req.body;
//     const cart = await Cart.findOneAndUpdate(
//       { userId: req.user.id, "items._id": req.params.id },
//       { $set: { "items.$.quantity": quantity } },
//       { new: true }
//     );
//     if (!cart) return res.status(404).json({ message: "Cart item not found" });
//     res.json(cart);
//   } catch (error) {
//     res.status(400).json({ message: "Validation Error", errors: error.errors });
//   }
// };

// export const removeFromCart = async (
//   req: { user: { id: any }; params: { id: any } },
//   res: {
//     status: (arg0: number) => {
//       (): any;
//       new (): any;
//       json: { (arg0: { message: string }): void; new (): any };
//     };
//     json: (arg0: any) => void;
//   }
// ) => {
//   try {
//     const cart = await Cart.findOneAndUpdate(
//       { userId: req.user.id },
//       { $pull: { items: { _id: req.params.id } } },
//       { new: true }
//     );
//     if (!cart) return res.status(404).json({ message: "Cart item not found" });
//     res.json(cart);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
