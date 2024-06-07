const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = process.env.SSLCOMMERZ_STORE_ID;
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD;
const is_live = false;


router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    const paymentData = {
      total_amount: req.body.amount,
      currency: 'BDT',
      tran_id: 'TRANSACTION_ID', 
      success_url: 'http://localhost:3000/success', 
      fail_url: 'http://localhost:3000/fail', 
      cancel_url: 'http://localhost:3000/cancel', 
      ipn_url: 'http://localhost:3000/ipn', 
      shipping_method: 'NO',
      product_name: 'Product Name',
      product_category: 'Product Category',
      product_profile: 'general',
      cus_name: req.body.name,
      cus_email: req.body.email,
      cus_add1: req.body.address1,
      cus_add2: req.body.address2,
      cus_city: req.body.city,
      cus_state: req.body.state,
      cus_postcode: req.body.zipCode,
      cus_country: req.body.country,
      cus_phone: req.body.phone,
      cus_fax: req.body.fax,
      multi_card_name: '',
      value_a: 'ref001_A',
      value_b: 'ref002_B',
      value_c: 'ref003_C',
      value_d: 'ref004_D',
      shipping_method: 'NO',
      num_of_item: 1,
      product_name: 'Demo',
      product_profile: 'general'
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(paymentData).then(data => {
      // process the response from SSLCommerz

      sslcz.init(paymentData).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.send(GatewayPageURL)
        console.log('Redirecting to: ', GatewayPageURL)
    });
      // if (data.GatewayPageURL) {
      //   res.status(200).json({
      //     success: true,
      //     redirect_url: data.GatewayPageURL,
      //   });
      // } else {
      //   res.status(400).json({
      //     success: false,
      //     message: 'SSLCommerz payment initiation failed',
      //   });
      // }
    });
  })
);

router.get(
  "/sslcommerzapikey",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ sslcommerzApikey: store_id });
  })
);


// Ei code stripe er jonne 

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// router.post(
//   "/process",
//   catchAsyncErrors(async (req, res, next) => {
//     const myPayment = await stripe.paymentIntents.create({
//       amount: req.body.amount,
//       currency: "BDT",
//       metadata: {
//         company: "Becodemy",
//       },
//     });
//     res.status(200).json({
//       success: true,
//       client_secret: myPayment.client_secret,
//     });
//   })
// );

// router.get(
//   "/stripeapikey",
//   catchAsyncErrors(async (req, res, next) => {
//     res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
//   })
// );


module.exports = router;