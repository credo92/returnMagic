// return Magic
class ProviderAbstract
{
  constructor(){
    // To be implemented
  }
  getRates(addressObject){
    // To be implemented
  }
}
class CanadaPostProvider extends ProviderAbstract{
  // To be implemented
}

const myAddress = {...} // Structure of the object to be
defined
const myCPInstance = new CanadaPostProvider('my-shippotoken')
myCPInstance.getRates(myAddress) // => Should returns an
array of available rates
