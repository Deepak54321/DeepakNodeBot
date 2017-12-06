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
  console.log('* Received action -- %s', req.body.result.action)
  
   function printdealer(res,message)
   {
	    res.status(200).json({
           					source: 'webhook',
          					speech: message,
           					displayText: message,
		    				'messages': 
              					[{
                   					'type':0,
                   					'speech':message
               					},
                  				{'title': 'Please provide your feedback',
                				'replies': ['Feedback'],
                				'type': 2}],
            					})
   }

if(req.body.result.action=='ask')
  {
       var result=req.body.result;
            var context=result.contexts[0];
            var PhoneNumber=context.parameters.ProductPhoneNumber;
            var Name=context.parameters.productname;
            var Email=context.parameters.ProductEnquiryEmail;
            var pincode=context.parameters.pincode
            var pattern = /^\d{10}$/;
      console.log("%s",PhoneNumber);
      if(pattern.test(PhoneNumber))
      {
          var message='Thanks for sharing your details now you can proceed further.';
            res.status(200).json({
           source: 'webhook',
           //speech: message,
           //displayText: message,
            'messages': 
              [{
                   'type':0,
                   'speech':message
               },
                                {'title': 'Please Select product type',
                                'replies': ['Motorcycles','Scooter'],
                                'type': 2}
               ]
            })
      }
      else
      {
           res.status(200).json({
                            source: 'webhook',
                            speech: 'Invalid phone Number Please enter again',
                            displayText: 'Invalid phone Number Please enter again',
                            "followupEvent":{
                        "name":"re_ask",
                            "data":
                            {
                                "productname":Name,
                                "ProductEnquiryEmail":Email,
                                "pincode":pincode,
                                 "ProductPhoneNumber":""
                            }
                        }
        
                                })
      }
  
  }
  
    if(req.body.result.action=='email-val')
  {
       var result=req.body.result;
            var context=result.contexts[0];
            var Email=context.parameters.ProductEnquiryEmail;
            var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
             //var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      console.log("%s",Email);
      var EmailCheck= Email.substring(0, Email.indexOf(' com'));
      EmailCheck=EmailCheck+'.com';
      var check=regex.test(EmailCheck);
      console.log(" check status %s",check);
      if(check)
      {
          var message='please share your pincode';
            res.status(200).json({
           source: 'webhook',
           //speech: message,
           //displayText: message,
            'messages': 
              [{
                   'type':0,
                   'speech':message
               }]
            })
      }
      else
      {
           res.status(200).json({
                            source: 'webhook',
                            speech: 'Invalid email Please enter again',
                            displayText: 'Invalid email Please enter again',
                            "followupEvent":{
                        "name":"re_email",
                            "data":
                            {
                                "ProductEnquiryEmail":""
                            }
                        }
        
                                })
      }
  
  }
    
        if(req.body.result.action=='pin-val')
  {
       var result=req.body.result;
            var context=result.contexts[0];
            var Pin=context.parameters.pincode;
            var regex = /^([1-9])([0-9]){5}$/;
             //var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      console.log("%s",Pin);
      if(regex.test(Pin))
      {
          var message='please share your chasis Number';
            res.status(200).json({
           source: 'webhook',
           //speech: message,
           //displayText: message,
            'messages': 
              [{
                   'type':0,
                   'speech':message
               }]
            })
      }
      else
      {
           res.status(200).json({
                            source: 'webhook',
                            speech: 'Invalid email Please enter again',
                            displayText: 'Invalid email Please enter again',
                            "followupEvent":{
                        "name":"re_pin",
                            "data":
                            {
                                "pincode":""
                            }
                        }
        
                                })
      }
  
  }
    
    //Test Drive
     
    if(req.body.result.action=='test-phone')
  {
       var result=req.body.result;
            var context=result.contexts[0];
            var PhoneNumber=context.parameters.phonenumber;
            var pattern = /^\d{10}$/;
      console.log("%s",PhoneNumber);
      if(pattern.test(PhoneNumber))
      {
          var message='please share your email';
            res.status(200).json({
           source: 'webhook',
           //speech: message,
           //displayText: message,
            'messages': 
              [{
                   'type':0,
                   'speech':message
               }]
            })
      }
      else
      {
           res.status(200).json({
                            source: 'webhook',
                            speech: 'Invalid phone Number Please enter again',
                            displayText: 'Invalid phone Number Please enter again',
                            "followupEvent":{
                        "name":"testre_phone",
                            "data":
                            {
                                "phonenumber":""
                            }
                        }
        
                                })
      }
  
  }
  
    if(req.body.result.action=='testemail-val')
  {
       var result=req.body.result;
            var context=result.contexts[0];
            var Email=context.parameters.email;
            var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
             //var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      console.log("%s",Email);
      var EmailCheck= Email.substring(0, Email.indexOf(' com'));
      EmailCheck=EmailCheck+'.com';
      var check=regex.test(EmailCheck);
      console.log(" check status %s",check);
      if(check)
      {
          var message='please share your pincode';
            res.status(200).json({
           source: 'webhook',
           //speech: message,
           //displayText: message,
            'messages': 
              [{
                   'type':0,
                   'speech':message
               }]
            })
      }
      else
      {
           res.status(200).json({
                            source: 'webhook',
                            speech: 'Invalid email Please enter again',
                            displayText: 'Invalid email Please enter again',
                            "followupEvent":{
                        "name":"testre_email",
                            "data":
                            {
                                "email":""
                            }
                        }
        
                                })
      }
  
  }
    
        if(req.body.result.action=='testpin-val')
  {
       var result=req.body.result;
            var context=result.contexts[0];
            var Pin=context.parameters.pincode;
            var regex = /^([1-9])([0-9]){5}$/;
             //var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      console.log("%s",Pin);
      if(regex.test(Pin))
      {
          var message='please share your chasis Number';
            res.status(200).json({
           source: 'webhook',
           //speech: message,
           //displayText: message,
            'messages': 
              [{
                   'type':0,
                   'speech':message
               }]
            })
      }
      else
      {
           res.status(200).json({
                            source: 'webhook',
                            speech: 'Invalid email Please enter again',
                            displayText: 'Invalid email Please enter again',
                            "followupEvent":{
                        "name":"testre_pin",
                            "data":
                            {
                                "pincode":""
                            }
                        }
        
                                })
      }
  
  }
  
  //Complaint
    if(req.body.result.action=='Complaint-phone')
  {
       var result=req.body.result;
            var context=result.contexts[0];
            var PhoneNumber=context.parameters.phonenumber;
            var pattern = /^\d{10}$/;
      console.log("%s",PhoneNumber);
      if(pattern.test(PhoneNumber))
      {
          var message='please share your email';
            res.status(200).json({
           source: 'webhook',
           //speech: message,
           //displayText: message,
            'messages': 
              [{
                   'type':0,
                   'speech':message
               }]
            })
      }
      else
      {
           res.status(200).json({
                            source: 'webhook',
                            speech: 'Invalid phone Number Please enter again',
                            displayText: 'Invalid phone Number Please enter again',
                            "followupEvent":{
                        "name":"Complaintre_phone",
                            "data":
                            {
                                "phonenumber":""
                            }
                        }
        
                                })
      }
  
  }
  
    if(req.body.result.action=='Complaintemail-val')
  {
       var result=req.body.result;
            var context=result.contexts[0];
            var Email=context.parameters.email;
            var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
             //var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      console.log("%s",Email);
      var EmailCheck= Email.substring(0, Email.indexOf(' com'));
      EmailCheck=EmailCheck+'.com';
      var check=regex.test(EmailCheck);
      console.log(" check status %s",check);
      if(check)
      {
          var message='please share your pincode';
            res.status(200).json({
           source: 'webhook',
           //speech: message,
           //displayText: message,
            'messages': 
              [{
                   'type':0,
                   'speech':message
               }]
            })
      }
      else
      {
           res.status(200).json({
                            source: 'webhook',
                            speech: 'Invalid email Please enter again',
                            displayText: 'Invalid email Please enter again',
                            "followupEvent":{
                        "name":"Complaintre_email",
                            "data":
                            {
                                "email":""
                            }
                        }
        
                                })
      }
  
  }
    
        if(req.body.result.action=='pin-val')
  {
       var result=req.body.result;
            var context=result.contexts[0];
            var Pin=context.parameters.pincode;
            var regex = /^([1-9])([0-9]){5}$/;
             //var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      console.log("%s",Pin);
      if(regex.test(Pin))
      {
          var message='please share your chasis Number';
            res.status(200).json({
           source: 'webhook',
           //speech: message,
           //displayText: message,
            'messages': 
              [{
                   'type':0,
                   'speech':message
               }]
            })
      }
      else
      {
           res.status(200).json({
                            source: 'webhook',
                            speech: 'Invalid email Please enter again',
                            displayText: 'Invalid email Please enter again',
                            "followupEvent":{
                        "name":"re_pin",
                            "data":
                            {
                                "pincode":""
                            }
                        }
        
                                })
      }
  
  }



   if(req.body.result.action=='Priceapi')
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
           displayText: price,
		    'messages': 
              [{
                   'type':0,
                   'speech':price
               },
                  {'title': 'Please provide your feedback',
                'replies': ['Feedback'],
                'type': 2}],
            })
                }
                else {
                    console(log.error());
                }
            });
   
 
  }
if(req.body.result.action=='Dealerapi')
  {
	        var result=req.body.result;
			var context=result.contexts[0];
			var dealerpin=context.parameters.pincode;
			console.log("user pincode to find dealer %s",dealerpin);
			var test = 'heelo';
            var pincode=110005;
            var check='';
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
                url:'https://maps.googleapis.com/maps/api/geocode/json?address='+dealerpin+'&key=AIzaSyD_YqB4d_-xKcmNP9jJCiPkJYDS8J3f6pI'
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
                   
                    var view = State + City + Country + 'Hi now you can get your dealers' + lat + lng;
                    //2
                    request({
                        url: 'http://www.yamaha-motor-india.com/iym-web-api//51DCDFC2A2BC9/network/state'
                    }, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            var res = JSON.parse(body);
                            var responseData = res.responseData;
                            var states = responseData.states;

                            for (var i = 0; i < states.length; i++) {
                                if (states[i].state_name === State) {
                                    StateId = states[i].profile_id;
                                    State_Name = states[i].state_name;

                                }

                            }
                            var reply2 = [
                                {
                                    "content_type": "text",
                                    "title": "Restart",
                                    "payload": "Restart"
                                }
                            ];
                            console.log("State Id %s",StateId);
                            if(StateId!='') {
                                //call();
								//sendQuickReply(sender,"No dealers Found in your area Please restart your conversation", reply2);
                            

                            //sendTextMessage(sender,StateId);
                            //3
                            request({
                                url: 'http://www.yamaha-motor-india.com/iym-web-api//51DCDFC2A2BC9/network/city?profile_id=' + StateId
                            }, function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    var result = JSON.parse(body);
                                    var responsData = result.responseData;
                                    var citites = responsData.cities;
                                    for (var i = 0; i < citites.length; i++) {

                                        if (citites[i].city_name == City) {
                                            CityId = citites[i].city_profile_id;
                                        }
                                    }
                                    console.log("City Id %s",CityId);
                                    var reply3 = [
                                        {
                                            "content_type": "text",
                                            "title": "Restart",
                                            "payload": "Restart"
                                        }
                                    ];
                                    if(CityId!='') {
                                        //sendQuickReply(sender,"No dealers Found in your area Please restart your conversation", reply3);
                                    

                                  
                                    request({
                                        url: 'http://www.yamaha-motor-india.com/iym-web-api//51DCDFC2A2BC9/network/search?type=sales&profile_id=' + StateId + '&city_profile_id=' + CityId	
									}, function (error, response, body) {
                                        if (!error && response.statusCode == 200) {
                                            var result = JSON.parse(body);
                                            var resData = result.responseData;
                                            var dealers = resData.dealers;
                                            dealerId=dealers[0].dealer_name;
                                            var dealer_name = dealers[0].dealer_name;
                                            var dealer_add = dealers[0].dealer_address;
                                            var dealer_Mob = dealers[0].sales_manager_mobile;
                                            var text1 = dealer_name + dealer_add + dealer_Mob;
											message=text1;
											test= message;
                                            //text1="Helloa";
                                            console.log("Dealer information %s",message);
											console.log("batman begins");
                                            if(message!='') {
												  var text2=true;
											
											callback();
											//console.log("Dealer information inside %s",check);
											}
											else
											{
												call();
												
											//console.log("Dealer information inside1 %s",check);
											}
                                     
                                    //}
                                           
                                            //sendTextMessage(sender,text1);
                                        }
                                        else {
                                            console(log.error());
                                        }
										
                                    });
									//dealer api call ends here
								}
								else
								{
									call();
								}
                                   

                                }
                                else {
                                    console(log.error());
                                }
                            });
							//city api end here
						}
						else
						{
							call();
						}
							
                        }
                        else {
                            console(log.error());
                        }
                    });
					
					function callback(){
						 res.status(200).json({
           					source: 'webhook',
          					speech: message,
           					displayText: message,
		    				'messages': 
              					[{
                   					'type':0,
                   					'speech':message
               					},
                  				{'title': 'Please provide your feedback',
                				'replies': ['Feedback'],
                				'type': 2}],
            					})
					}
					function call()
					{
						var mes='Dealer not found in your area';
							 res.status(200).json({
           					source: 'webhook',
          					speech: mes,
           					displayText: mes,
		    				'messages': 
              					[{
                   					'type':0,
                   					'speech':mes
               					},
                  				{'title': 'Please provide your feedback',
                				'replies': ['Feedback'],
                				'type': 2}],
            					})
					}
                }
                else {
                    console(log.error());

                }
//now insert here

            });
			
  }
  //testdrive
  if(req.body.result.action=='testDealerapi')
  {
	        var result=req.body.result;
			var context=result.contexts[0];
			var dealerpin=context.parameters.TestPincode;
			console.log("user pincode to find dealer %s",dealerpin);
			var test = 'heelo';
            var pincode=110005;
            var check='';
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
                url:'https://maps.googleapis.com/maps/api/geocode/json?address='+dealerpin+'&key=AIzaSyD_YqB4d_-xKcmNP9jJCiPkJYDS8J3f6pI'
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
                   
                    var view = State + City + Country + 'Hi now you can get your dealers' + lat + lng;
                    //2
                    request({
                        url: 'http://www.yamaha-motor-india.com/iym-web-api//51DCDFC2A2BC9/network/state'
                    }, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            var res = JSON.parse(body);
                            var responseData = res.responseData;
                            var states = responseData.states;

                            for (var i = 0; i < states.length; i++) {
                                if (states[i].state_name === State) {
                                    StateId = states[i].profile_id;
                                    State_Name = states[i].state_name;

                                }

                            }
                            var reply2 = [
                                {
                                    "content_type": "text",
                                    "title": "Restart",
                                    "payload": "Restart"
                                }
                            ];
                            console.log("State Id %s",StateId);
                            if(StateId!='') {
                                //call();
								//sendQuickReply(sender,"No dealers Found in your area Please restart your conversation", reply2);
                            

                            //sendTextMessage(sender,StateId);
                            //3
                            request({
                                url: 'http://www.yamaha-motor-india.com/iym-web-api//51DCDFC2A2BC9/network/city?profile_id=' + StateId
                            }, function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    var result = JSON.parse(body);
                                    var responsData = result.responseData;
                                    var citites = responsData.cities;
                                    for (var i = 0; i < citites.length; i++) {

                                        if (citites[i].city_name == City) {
                                            CityId = citites[i].city_profile_id;
                                        }
                                    }
                                    console.log("City Id %s",CityId);
                                    var reply3 = [
                                        {
                                            "content_type": "text",
                                            "title": "Restart",
                                            "payload": "Restart"
                                        }
                                    ];
                                    if(CityId!='') {
                                        //sendQuickReply(sender,"No dealers Found in your area Please restart your conversation", reply3);
                                    

                                  
                                    request({
                                        url: 'http://www.yamaha-motor-india.com/iym-web-api//51DCDFC2A2BC9/network/search?type=sales&profile_id=' + StateId + '&city_profile_id=' + CityId	
									}, function (error, response, body) {
                                        if (!error && response.statusCode == 200) {
                                            var result = JSON.parse(body);
                                            var resData = result.responseData;
                                            var dealers = resData.dealers;
                                            dealerId=dealers[0].dealer_name;
                                            var dealer_name = dealers[0].dealer_name;
                                            var dealer_add = dealers[0].dealer_address;
                                            var dealer_Mob = dealers[0].sales_manager_mobile;
                                            var text1 = dealer_name + dealer_add + dealer_Mob;
											message=text1;
											test= message;
                                            //text1="Helloa";
                                            console.log("Dealer information %s",message);
											console.log("batman begins");
                                            if(message!='') {
												  var text2=true;
											
											callback();
											//console.log("Dealer information inside %s",check);
											}
											else
											{
												call();
												
											//console.log("Dealer information inside1 %s",check);
											}
                                     
                                    //}
                                           
                                            //sendTextMessage(sender,text1);
                                        }
                                        else {
                                            console(log.error());
                                        }
										
                                    });
									//dealer api call ends here
								}
								else
								{
									call();
								}
                                   

                                }
                                else {
                                    console(log.error());
                                }
                            });
							//city api end here
						}
						else
						{
							call();
						}
							
                        }
                        else {
                            console(log.error());
                        }
                    });
					
					function callback(){
						 res.status(200).json({
           					source: 'webhook',
          					speech: message,
           					displayText: message,
		    				'messages': 
              					[{
                   					'type':0,
                   					'speech':message
               					},
                  				{'title': 'Please provide your feedback',
                				'replies': ['Feedback'],
                				'type': 2}],
            					})
					}
					function call()
					{
						var mes='Dealer not found in your area';
							 res.status(200).json({
           					source: 'webhook',
          					speech: mes,
           					displayText: mes,
		    				'messages': 
              					[{
                   					'type':0,
                   					'speech':mes
               					},
                  				{'title': 'Please provide your feedback',
                				'replies': ['Feedback'],
                				'type': 2}],
            					})
					}
                }
                else {
                    console(log.error());

                }
//now insert here

            });
			//replies insert here
			
			
  }
  if(req.body.result.action=='feedback')
  {
	  res.status(200).json({
           					source: 'webhook',
          					speech: '',
           					displayText: '',
							'messages': 
							[
                  				{'title': 'Please provide your feedback',
                				'replies': ['Excellent',
                            'Good',
                            'Average',
                            'Bad'],
                				'type': 2}
								
								],
            					})
		    			
            					
  }
  
})

app.listen(app.get('port'), function () {
  console.log('* Webhook service is listening on port:' + app.get('port'))
})
