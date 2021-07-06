const axios = require('axios')
const app = require('express')()
// const bodyParser = require('body-parser')
const qs = require('qs')
const PrivateTokens = require('../constants');
module.exports = {
    facebookConversionApi: (req, res) => {
        const data = {
            key: PrivateTokens.product_key,
            secret: PrivateTokens.product_secret
          }
          const config = {
            method: 'POST',
            url: PrivateTokens.sessionUrl,
            headers: {
              'Content-Type': 'application/json'
            },
            data
          }
          let token = ''
          res.json({message: 'success', data: [{id: 1}]})
        
          // axios(config)
          //   .then((response) => {
          //     token = response.data.data.client_session
          //     res.json({ msg: 'Get ClientSession Token Success', data: token })
          //   })
          //   .catch((error) => {
          //     res.json({ msg: 'Error', data: error })
          //   })
    }
}