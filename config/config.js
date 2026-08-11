
module.exports  = {
  config : {
    // baseUrl : 'http://13.235.91.193:3000/',
    baseUrl : 'https://www.clarisco.com/',
    siteName : "clarblock"
  },
  mongodb:{
    dbstring :'mongodb+srv://deepavignesh:TnFUy8t6yLNIeaXU@cluster0.y0hvr.mongodb.net/clarisco?authSource=admin&replicaSet=atlas-diuzwa-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',
  },
  // mailsettings : {
  //   email      : "gsdeepavignesh@gmail.com",
  //   password   : "gsdeepavignesh99",
  //   host       :  "smtp.gmail.com",
  //   port       :  "465",
  //   fromName   :  "clarblock",
  //   serverName :  "Gmail"
  // },
  session : {
      cookieKey : 'clarblock'
    }
}
