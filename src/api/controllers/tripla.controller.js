const axios = require("axios");
const qs = require("qs");

const PrivateTokens = require("../constants");

module.exports = {
  getClientSession: async (_req, res) => {
    const data = {
      key: PrivateTokens.product_key,
      secret: PrivateTokens.product_secret
    };
    const config = {
      method: "POST",
      url: PrivateTokens.sessionUrl,
      headers: {
        "Content-Type": "application/json"
      },
      data
    };

    try {
      const response = await axios(config);
      const token = await response.data.data.client_session;

      res
        .status(200)
        .json({ msg: "Get ClientSession Token Success", data: token });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  getAccesstoken: async (_req, res) => {
    const data = qs.stringify(PrivateTokens.data);
    const config = {
      method: "POST",
      url: PrivateTokens.accessTokenUrl,
      headers: PrivateTokens.headers,
      data
    };

    try {
      const response = await axios(config);
      const token = await response.data.access_token;

      res.send({ msg: "Get Access Token Success", data: token });
    } catch (error) {
      res.status(400).send(error);
    }
    // res.cookie('access_token', token, { maxAge: 6000, httpOnly: true })
  }
};
