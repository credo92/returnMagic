var shippo = require('shippo')('<token>');
var token = '<token>';

class ProviderAbstract
 {

      constructor(token)
      {
      // To be implemented ,
      // took reference from
      //https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes

      this.token = token;
      }

      getRates(addressObject)
      {
      // To be implemented
          shippo.shipment.create(addressObject, function(err, shipment)
              {
                // asynchronously called
                for (var i = 0; i < shipment.rates.length; i++)
                 {
                  console.log(shipment.rates[i]);
                 }

              }
            )

      }

}
class CanadaPostProvider extends ProviderAbstract
  {

    getRates(addressObject)
        {
        // To be implemented
            shippo.shipment.create(addressObject, function(err, shipment)
                {
                  // asynchronously called
                  for (var i = 0; i < shipment.rates.length; i++)
                   {
                    console.log(shipment.rates[i]);
                   }

                }
              )

        }


  }
// Address Object Details
// addressFrom - CANADA
  var addressFrom = {
    "name": "Vipul Srivastav",
    "company": "",
    "street_no": "",
    "street1": "Chemin de la Cote-des-neiges",
    "street2": "Chemin de la Côte-des-Neiges, Montréal, QC",
    "city": "Montreal",
    "state": "QC",
    "zip": "H3H 1V9",
    "country": "CA",
    "phone": "0987654321",
    "email": "vipulsrivastav92@gmail.com"
  };
// addressTo - USA
  var addressTo  = {
      "name": "Shawn Ippotle",
      "street1": "215 Clayton St.",
      "city": "San Francisco",
      "state": "CA",
      "zip": "94117",
      "country": "US",
      "phone": "+1 555 341 9393",
      "email": "shippotle@goshippo.com"
  };
  // International Shipment - Customs Declaration
  var customs_declaration= {
      "contents_type": "MERCHANDISE",
      "contents_explanation": "Shipping ain't easy!",
      "non_delivery_option": "RETURN",
      "certify": true,
      "certify_signer": "Shippo",
      "items": [
        {
          "description": "My Parcel",
          "quantity": 1,
          "net_weight": "2",
          "mass_unit": "lb",
          "value_amount": 13.37,
          "value_currency": "CAD",
          "metadata": "Your first Customs Item",
          "origin_country": "CA"
        }
      ],
      "metadata": "Your first Customs Declaration!"
    }
// Parcel to be sent
  var parcel = {
      "length": "5",
      "width": "5",
      "height": "5",
      "distance_unit": "in",
      "weight": "2",
      "mass_unit": "lb"
  };
// myAddress Object created

/*
  To get Canada Post Object Id for carrier_accounts we can
  use endpoint https://api.goshippo.com/carrier_accounts/

or shippo.carrieraccount.list();
 then traverse
    for i to shippo.carrieraccount.list().results.length
  check if (shippo.carrieraccount.list().results[i].carrier ===canada_post)
             then objId = shippo.carrieraccount.list().results[i].object_id
            break

*/
const myAddress = {

    "address_from": addressFrom,
    "address_to": addressTo,
    "parcels": [parcel],
    "customs_declaration": customs_declaration,
    // carrier_accounts : ['CANADA POST OBJECT ID']
    "carrier_accounts": ['8f17d003322b42dd90fd8437927b0511'],
    "async": false
}
 // Structure of the object to be
// defined
const myCPInstance = new CanadaPostProvider('<token>')
myCPInstance.getRates(myAddress)
// => Should returns an
// array of available rates
