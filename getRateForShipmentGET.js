// A sample GET Call to retrieve Rate for a particular shipment


var request = require("request");
var SHIPMENT_OBJECT_ID = '35101d1a6f50432082eb0db6a7085cb0';

request({
  uri: 'https://api.goshippo.com/shipments/'+SHIPMENT_OBJECT_ID+'/rates',
  method: "GET",
  timeout: 10000,
  followRedirect: true,
  maxRedirects: 10,
  headers: {
		'Authorization': `ShippoToken shippo_test_f2a949829c09df2740bf198b87dd5548aa02943b`,
		'Content-Type': 'application/json'
	}
}, function(error, response, body) {
  console.log(JSON.parse(body));
});
