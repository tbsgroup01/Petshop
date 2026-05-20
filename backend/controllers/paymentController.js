const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});

// 1. Create Razorpay Order
// This controller is responsible for creating a new order with Razorpay.
// We've added a crucial check here to prevent duplicate active subscriptions
// before the payment order is even created.
const getPaymentController = async (req, res) => {
    try {
        const { amount, premiumType } = req.body;
        const userId = req.user.id; // Assuming user is authenticated and their ID is available from the session or token.

        // Validate if amount and premiumType are provided
        if (!amount || !premiumType) {
            return res.status(400).json({
                success: false,
                error: "Amount and premiumType are required.",
            });
        }
        
        // Find the user to check for an existing active subscription
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found." });
        }

        // --- START: NEW CRUCIAL CHECK TO PREVENT MULTIPLE ACTIVE SUBSCRIPTIONS ---
        // We now check the 'subscriptions' array, which can hold multiple subscriptions.
        // We're looking for a subscription with the same planName that is still active.
        const hasActiveSubscription = user.subscriptions.some(sub =>
            sub.planName === premiumType &&
            sub.status === 'active' &&
            sub.expiresAt > new Date()
        );

        if (hasActiveSubscription) {
            // Using 409 Conflict for "resource already exists" scenario
            return res.status(409).json({
                success: false,
                message: "You already have an active subscription for this plan. Please wait for it to expire.",
            });
        }
        // --- END: NEW CRUCIAL CHECK ---

        // Create an order with Razorpay
        const order = await razorpay.orders.create({
            amount: amount * 100, // Convert amount to paise
            currency: "INR",
            receipt: "Receipt_" + Date.now(), // Unique receipt ID
            notes: { // This is a good place to store the plan type for later
                premiumType: premiumType,
                userId: userId,
            }
        });

        // Respond with the created order details
        return res.json({
            success: true,
            amount: order.amount,
            orderId: order.id,
            premiumType: premiumType,
        });
    } catch (err) {
        console.error("Error in getPaymentController:", err);
        return res.status(500).json({ error: "Payment order creation failed." });
    }
};