/* Problems faced
  - used postman to test rest calls
  - i am not sure about the ES6 class structure, whether did i
    used the concept well
  - problem using lodash , mocha , joi ( validation of postdata INPUT)
*/
// constructor(token)
// createData(path,postData)
// generic REST APi PUT CALL for address, parcels, customs,SHIPMENT
// getRates creates shipment and prints the rates array

const https = require('https');
var request = require("request");

var SHIPMENT_OBJECT_ID;

class ProviderAbstract
{
  constructor(token)
  {
    // To be implemented
    this.token = token;
  }

  createData(path,postData){
    // this.token = token;
    this.path = path;
    this.postData = postData;
    const shippoToken = this.token // Replace with your token

    let postOptions = {
    	host: 'api.goshippo.com',
    	port: 443,
    	path: path,
    	method: 'POST',
    	headers: {
    		'Authorization': shippoToken,
    		'Content-Type': 'application/json'
    	}
    };

    const postReq = https.request(postOptions, (res)=>{
    	res.setEncoding('utf8');
    	res.on('data', (chunk)=>{
    		//console.log(JSON.parse(chunk,null,2));
    	})
    });
    postReq.write(JSON.stringify(postData));
    postReq.end();
  }

  getRates(path,postData)
    {

    this.path = path;
    this.postData = postData;
    const shippoToken = this.token // Replace with your token

    let postOptions = {
    	host: 'api.goshippo.com',
    	port: 443,
    	path: path,
    	method: 'POST',
    	headers: {
    		'Authorization': shippoToken,
    		'Content-Type': 'application/json'
    	}
    };

    const postReq = https.request(postOptions, (res)=>{
    	res.setEncoding('utf8');
    	res.on('data', (chunk)=>{
    		console.log(JSON.parse(chunk,null,2));
    	})
    });
    postReq.write(JSON.stringify(postData));
    postReq.end();


    }

}
class CanadaPostProvider extends ProviderAbstract
{
  // To be implemented

  getRates(path,myAddress)
    {

    this.path = path;
    this.postData = myAddress;
    const shippoToken = this.token // Replace with your token

    let postOptions = {
     host: 'api.goshippo.com',
     port: 443,
     path: path,
     method: 'POST',
     headers: {
       'Authorization': shippoToken,
       'Content-Type': 'application/json'
     }
    };

    const postReq = https.request(postOptions, (res)=>{
     res.setEncoding('utf8');
     res.on('data', (chunk)=>{
                  var obj = JSON.parse(chunk);
                //console.log(JSON.parse(chunk,null,2));
                console.log('Shipment ID: '+obj.object_id);
                SHIPMENT_OBJECT_ID = obj.object_id;
                if(obj.status==='SUCCESS'&&obj.rates.length)
                {
                  for (var i = 0; i < obj.rates.length; i++)
                   {
                    console.log(obj.rates[i]);
                   }
                }
                else
                {
                  console.log(obj.status+': No Shipment rates has been provided');
                }
      })
      res.on('end',function(){
        // A  Callback function to perform GET Call to retrieve Rate for the created shipment
        // Refer to -- https://goshippo.com/docs/reference/js#rates-get
        request({
          uri: 'https://api.goshippo.com/shipments/'+SHIPMENT_OBJECT_ID+'/rates',
          method: "GET",
          timeout: 10000,
          followRedirect: true,
          maxRedirects: 10,
          headers: {
            'Authorization': `ShippoToken <token>`,
            'Content-Type': 'application/json'
          }
        }, function(error, response, body) {
          console.log(JSON.parse(body));
        });
      })
    });
    postReq.write(JSON.stringify(myAddress));
    postReq.end();


    }

  }

const myCPInstance = new CanadaPostProvider('ShippoToken <TOKEN>')
  var addressFrom={
                      "name": "Mark James",
                      "company": "Apartment 3777",
                      "street_no": "",
                      "street1": "Chemin de la Cote-des-neiges",
                      "street2": "Chemin de la Côte-des-Neiges",
                      "city": "Montreal",
                      "state": "QC",
                      "zip": "H3H 1V5",
                      "country": "CA",
                      "phone": "512-231-1224",
                      "email": "maverick@gmail.com"
                    };
var addressTo=		{
										  "name":"Jamie Sanderyn",
									    "company":"abc",
									    "street1":"400 Clayton St.",
									    "city":"San Francisco",
									    "state":"CA",
									    "zip":"94117",
									    "country":"US", // iso2 country code
									    "phone":"+1 000 345 0091",
									    "email":"shippotle@go.com"
										};
var parcel =       {
                      "length": "4",
                          "width": "3",
                          "height": "5",
                          "distance_unit": "in",
                          "weight": "4",
                          "mass_unit": "lb",
                     };
var customs_declaration =  {
                        "contents_type": "MERCHANDISE",
                        "contents_explanation": "Jeans purchase",
                        "non_delivery_option": "RETURN",
                        "certify": true,
                        "certify_signer": "Markman",
                        "items": [{
                       				     "description":"Jeans",
                       				     "quantity":10,
                       				     "net_weight":"1",
                       				     "mass_unit":"lb",
                       				     "value_amount":"200",
                       				     "value_currency":"CAD",
                       				     "origin_country":"CA",
                        			}]
                          };
const myAddress = {
  "address_from": addressFrom,
	 "address_to": addressTo,
	 "parcels": parcel,
	 "customs_declaration": customs_declaration,

   //To get Canada Post Object Id for carrier_accounts we can
  //used endpoint https://api.goshippo.com/carrier_accounts/

	 "carrier_accounts": ['8f17d003322b42dd90fd8437927b0511'],
	 "async": true
} ;// Structure of the object to be defined

// Following POST calls create address, parcels, customs, then we get Rates by
myCPInstance.createData('/addresses',addressFrom);
myCPInstance.createData('/addresses',addressTo);

myCPInstance.createData('/parcels',parcels);

myCPInstance.createData('/customs/declarations/',customs_declaration);
myCPInstance.createData('/shipments',myAddress);

myCPInstance.getRates('/shipments',myAddress);
