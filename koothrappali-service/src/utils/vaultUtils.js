import CONFIG from '../constants';
const { VAULT } = CONFIG;
let options = {
    endpoint: VAULT.BASE_URL,
    token: process.env.VAULT_TOKEN
};
let vault = require("node-vault")(options);

export async function getEC2Price(platform) {
    try {
        let priceDetails = await vault.read(`${VAULT.API_URL}` + `${VAULT.BILLING_URL}` + `${platform}` + `${VAULT.EC2}`);

        return priceDetails;
    } catch (err) { throw (err) }
}

export async function getRDSPrice(Engine) {
    try {
        let priceDetails = await vault.read(`${VAULT.API_URL}` + `${VAULT.BILLING_URL}`  + `${Engine}` + `${VAULT.RDS}`);

        return priceDetails;
    } catch (err) { throw (err) }
}

export async function getAWSKeys() {
    try {
        let awsKeys = await vault.read(`${VAULT.API_URL}` + `${VAULT.AWS_KEYS_URL}`);

        return awsKeys;
    } catch (err) { throw (err) }
}