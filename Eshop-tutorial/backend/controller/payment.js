const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = process.env.SSLCOMMERZ_STORE_ID;
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD;
const is_live = false;
const shortid = require("shortid");

router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    const transID = `TXN_SSL_${shortid.generate()}`;
    // console.log(transID);
    const id = req.body.object

    const paymentData = {
      total_amount: req.body.amount,
      currency: "BDT",
      tran_id: transID,
      success_url: `http://localhost:3000/order/success/${transID}`,
      fail_url: "http://localhost:3000/fail",
      cancel_url: "http://localhost:3000/cancel",
      ipn_url: "http://localhost:3000/ipn",
      shipping_method: "NO",
      product_name: "Product Name",
      product_category: "Product Category",
      product_profile: "general",
      cus_name: req.body.name,
      cus_email: req.body.email,
      cus_add1: req.body.address1,
      cus_add2: req.body.address2,
      cus_city: req.body.city,
      cus_state: req.body.state,
      cus_postcode: req.body.zipCode,
      cus_country: req.body.country,
      cus_phone: `${req.body.phoneNumber}`,
      cus_fax: req.body.fax,
      multi_card_name: "",
      value_a: "ref001_A",
      value_b: "ref002_B",
      value_c: "ref003_C",
      value_d: "ref004_D",
      shipping_method: "NO",
      num_of_item: 1,
      product_name: "Demo",
      product_profile: "general",
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(paymentData).then((apiResponse) => {
      // process the response from SSLCommerz
      let GatewayPageURL = apiResponse.GatewayPageURL;
      // console.log(apiResponse)
      // res.redirect(GatewayPageURL)
      res.send({ success: true, redirect_url: GatewayPageURL });
      console.log("Redirecting to: ", GatewayPageURL);
    });

    router.post('/order/success/:transID', async (req, res) => {
        console.log(req.params.transID);
      });

      router.get(
        "/stripeapikey",
        catchAsyncErrors(async (req, res, next) => {
          res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
        })
      );
  })

  
);

module.exports = router;
