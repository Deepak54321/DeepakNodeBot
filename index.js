const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.set('port', (process.env.PORT || 5000))

const REQUIRE_AUTH = true
const AUTH_TOKEN = 'an-example-token'

app.get('/', function (req, res) {
  res.send('Use the /webhook endpoint.')
})
app.get('/webhook', function (req, res) {
  res.send('You must POST your request')
})

app.post('/webhook', function (req, res) {
  // we expect to receive JSON data from api.ai here.
  // the payload is stored on req.body
  console.log(req.body)

  // we have a simple authentication
 /* if (REQUIRE_AUTH) {
    if (req.headers['auth-token'] !== AUTH_TOKEN) {
      return res.status(401).send('Unauthorized')
    }
  }*/

  // and some validation too
  if (!req.body || !req.body.result || !req.body.result.parameters) {
    return res.status(400).send('Bad Request')
  }

  // the value of Action from api.ai is stored in req.body.result.action
  console.log('* Received action -- %s', req.body.result.action)

  // parameters are stored in req.body.result.parameters
  //var userName = req.body.result.parameters['given-name']
   //var context=req.body.result.contexts[0];
  if(req.body.result.action=='demo')
  {
   var request = require('request');
            request({
                url:'http://www.yamaha-motor-india.com/iym-web-api//51DCDFC2A2BC9/statewiseprice/getprice?product_profile_id=salutorxspcol&state_id=240'
            },function (error,response,body) {
                if (!error && response.statusCode == 200) {
                    var result = JSON.parse(body);
                    var responseCode=result.responseData;
                    var productPrice=responseCode.product_price;
                    var price=productPrice[0].price +'Rs';
           res.status(200).json({
           source: 'webhook',
           speech: price,
           displayText: price
            })
                }
                else {
                    console(log.error());
                }
            });
   
 
  }
if(req.body.result.action=='demo1')
  {
    
   //var pincode=110005;

            var StateId='';
            var CityId='';
            var City='';
            var State='';
            var Country='';
            var lat='';
            var lng='';
            var State_Name='';
            var City_Name='';
            var address='';
            var stateF='';
            var dealerId='';
            var address_components='';
            var message='';

            var request = require('request');
            //1
            request({
                url:'https://maps.googleapis.com/maps/api/geocode/json?address='+dealer_pin+'&key=AIzaSyD_YqB4d_-xKcmNP9jJCiPkJYDS8J3f6pI'
            },function (error,response,body) {
                if (!error && response.statusCode == 200) {
                    var result = JSON.parse(body);
                    var Results = result.results;
                    for (var i = 0; i < Results.length; i++)
                    {
                        address = Results[i].formatted_address;
                        address_components = Results[i].address_components;
                        var len = address_components.length;
                        var gemotry = Results[i].geometry;
                        var location = gemotry.location;
                        lat = location.lat;
                        lng = location.lng;
                        for (var j = 0; j < address_components.length; j++) {
                            if (j == len - 3) {
                                City = address_components[j].long_name;
                            }
                            else if (j == len - 2) {
                                State = address_components[j].long_name;
                            }
                            else if (j == len - 1) {
                                Country = address_components[j].long_name;
                            }
                        }
                    }
                    console.log("State %s",State);
                    console.log("City %s",City);
                    console.log("Country %s",Country);
                    //console.log(city);
                    var view = State + City + Country + 'Hi now you can get your dealers' + lat + lng;
					 res.status(200).json({
           source: 'webhook',
           speech: view,
           displayText: view
            })
                    //2
				}

            });

  }
  
})

app.listen(app.get('port'), function () {
  console.log('* Webhook service is listening on port:' + app.get('port'))
})
