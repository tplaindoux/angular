# config/auth.js

# expose our config directly to our application using module.exports
module.exports =
  app_config:
    email_confirm: false
  twitterPushNews: true
  cyf :
    domain: "http://challenge-friends.herokuapp.com"
    # domain: "http://localhost:8080"
  mandrill_key: "w_F27RXK5GmLNtZoePLczA"
  support :
    email: "cyf.app@gmail.com"
    name: "CyF validator"
  express_sid_key: "chachompcha.sid"
  cookie_secret: "oneDoesNotSimplychompi"

  steam:
    key: "02130312F2CCF046E4710C189E8481BA"
    domain: "challenge-friends.herokuapp.com"
  leagueoflegend:
    key: "fdc734d5-eae1-4570-b800-a1646962d9e9"

  facebookAuth:
    clientID: "624902070914410" # your App ID
    clientSecret: "adeff0ed4fa13ed526ba4c133b1eed92" # your App Secret
    callbackURL: "http://challenge-friends.herokuapp.com/auth/facebook/callback"

  twitterAuth:
    consumerKey: "KqGJkpnwthwuOcrVpLoKA"
    consumerSecret: "DmWpNqUNnctc2hoPj36rsWVRsItsKhwhbqfhSmcXOQ"
    callbackURL: "http://challenge-friends.herokuapp.com/auth/twitter/callback"

  twitterCyf:
    token : "2396246222-NAnfkkJen2abruUEgDM9dZHRD1NpPZxblWeLPSy"
    tokenSecret : "adZoD4YiIpQOvDEFzodKjBIx83zYAPkCxSLt0HbuPB7Cn"
    id: "2396246222"

  googleAuth:
    clientID: "90650508831.apps.googleusercontent.com"
    clientSecret: "PvPJ5cCT_AgKNU0dDEP98HTb"
    callbackURL: "http://192.168.1.2:8080/auth/google/callback"