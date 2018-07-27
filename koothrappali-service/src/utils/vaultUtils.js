import CONFIG from '../constants';
const { VAULT, VAULT_TOKEN } = CONFIG;
let options = {
    endpoint: VAULT.BASE_URL,
    token: process.env.VAULT_TOKEN
};
let vault = require("node-vault")(options);

export function getEC2Price(platform) {
    let priceDetails = vault.read(`${VAULT.API_URL}` + `${platform}` + `${VAULT.EC2}`);

    return priceDetails;
}

export function getRDSPrice(Engine) {
    let priceDetails = vault.read(`${VAULT.API_URL}` + `${Engine}` + `${VAULT.RDS}`);
   
    return priceDetails;
}
