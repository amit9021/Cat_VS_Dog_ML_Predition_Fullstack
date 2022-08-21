//jshint esversion:8

//const { application } = require("express");
const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const axios = require("axios");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

router.use(bodyParser.json({ limit: '50mb' }));



router.post("/score", async (req, res) => {

  // 1. get acses token
  let response = "";
  let access_token = "";
  try {
    response = await axios({
      method: 'post',
      url: process.env.AUTH_URL,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: "grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=" + process.env.API_KEY


    });
    // 2. Make a predition with WML
    const access_token = response.data.access_token;
    console.log(access_token);
    const token = access_token;
    const scoring_url = process.env.SCORING_URL;

    //geting the image DATA from the client
    const payLoad = req.body.data;
    const payLoadArry = JSON.stringify(payLoad);
    const scoringPayload = '{"input_data": [{ "values": ' + payLoadArry + '}]}';

    apiPost(scoring_url, token, scoringPayload, function (resp) {
      let parsedPostResponse;
      try {
        parsedPostResponse = JSON.parse(this.responseText);

      } catch (ex) {

      }
      console.log("Scoring response");
      console.log(parsedPostResponse);
      res.json(parsedPostResponse);

    }, function (error) {
      console.log(error);
    });

  } catch (err) {
    console.log(err);
    res.send(err);
  }
  //This function call the WML API
  function apiPost(scoring_url, token, payload, loadCallback, errorCallback) {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener("load", loadCallback);
    oReq.addEventListener("error", errorCallback);
    oReq.open("POST", scoring_url);
    oReq.setRequestHeader("Accept", "application/json");
    oReq.setRequestHeader("Authorization", "Bearer " + token);
    oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    oReq.send(payload);
  }


});
















// 2. get scores




module.exports = router;
