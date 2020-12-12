global.fetch = require("node-fetch");

global.navigator = () => null;

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const { decode } = require("jsonwebtoken");
const { request } = require("../app");

const poolData = {
  UserPoolId: "us-east-2_uiFYXm150",
  ClientId: "gcrbh0cl3botmo7sc9jf0qh7m"
};

const pool_region = "us-east-2";

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

exports.Register = function(body, callback) {
  var currDate = new Date();
  var updated_at = currDate.getTime() / 1000|0;
    // currDate.getDate() +
    // "." +
    // (currDate.getMonth() + 1) +
    // "." +
    // currDate.getFullYear() +
    // " " +
    // currDate.getHours() +
    // ":" +
    // currDate.getMinutes() +
    // ":" +
    // currDate.getSeconds() + 
    // "." + currDate.getMilliseconds();
    
    // console.log((new Date()).getTime() / 1000|0);
  var name = body.name;
  var email = body.email;
  var password = body.password;
  var address = body.address;
  var birth = body.birth;
  var gender = body.gender;
  var phone = body.phone;
  var aadhar = body.aadhar;

  var attributeList = [];

  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "email",
      Value: email
    })
  );

  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "address",
      Value: address
    })
  );

  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "birthdate",
      Value: birth
    })
  );

  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "gender",
      Value: gender
    })
  );

  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "name",
      Value: name
    })
  );

  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "phone_number",
      Value: phone
    })
  );

  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "custom:aadhar",
      Value: aadhar
    })
  );

  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "updated_at",
      Value: updated_at.toString()
    })
  );

  console.log(typeof updated_at.toString());
  userPool.signUp(email, password, attributeList, null, function(err, result) {
    if (err) {
      callback(err);
      return;
    }

    var cognitoUser = result.user;
    callback(null, cognitoUser);
  });
};

exports.Login = function(body, callback) {
  var email = body.email;
  var password = body.password;

  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: email,
    Password: password
  });

  var userData = {
    Username: email,
    Pool: userPool
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function(result) {
      var accessToken = result.getAccessToken.getJwtToken();
      callback(null, accessToken);
    },
    onFailure: function(err) {
      callback(err);
    }
  });
};

exports.Validate = function(token, callback) {
  request(
    {
      url: `https://cognitoidp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
      json: true
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        pems = {};
        var keys = body["keys"];
        for (var i = 0; i < keys.length; i++) {
          var key_id = keys[i].kid;
          var modulus = keys[i].n;
          var exponent = keys[i].e;
          var key_type = keys[i].kty;
          var jwk = { kty: key_type, n: modulus, e: exponent };
          var pem = jwkToPem(jwk);
          pems[key_id] = pem;
        }

        var decodedJwt = jwt.decode(token, { complete: true });

        if (!decodedJwt) {
          console.log("Not a valid JWT Token");
          callback(new Error("Not a Valid JWT Token"));
        }

        var kid = decodedJwt.header.kid;
        var pem = pems[kid];

        if (!pem) {
          console.log("Invalid Token");
          callback(new Error("Invalid Token"));
        }

        jwt.verify(token, pem, function(err, payload) {
          if (err) {
            console.log("Invalid Token");
            callback(new Error("Invalid Token"));
          } else {
            console.log("Valid Token.");
            callback(null, "Valid Token");
          }
        });
      } else {
        console.log("Error! Unable to Download JWKs.");
        callback(error);
      }
    }
  );
};
