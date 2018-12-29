'use strict';
var key = process.env.KEY;

const generatePolicy = function(principalId, effect, resource) {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

module.exports.user = (event, context, callback) => {
console.log(event);
  // Get Token
  const split = event.authorizationToken.split('Bearer');
  if (split.length !== 2) {
    if (process.env.DEBUG === 'true') {
      console.log('AUTH: no token in Bearer');
    }
    callback('Unauthorized');
  }
  const token = split[1].trim();
  /*
   * extra custom authorization logic here: OAUTH, JWT ... etc
   * search token in database and check if valid
   * here for demo purpose we will just compare with hardcoded value
   */
  // const token = event.authorizationToken;
   switch (token) {
    case "troy":
      callback(null, generatePolicy('user123', 'Allow', event.methodArn));
      break;
    case key:
      callback(null, generatePolicy('user123', 'Allow', event.methodArn));
      break;
    default:
      callback('Unauthorized');
      console.log(`Token: ${token}`);
   }
};