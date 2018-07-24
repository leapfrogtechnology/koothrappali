import CONFIG from '../constants';
const { VAULT, VAULT_TOKEN } = CONFIG;
var options = {
    endpoint: VAULT.BASE_URL,
    token: '4fe09a91-077f-86d1-19d8-3f646f683876'
};
var vault = require("node-vault")(options);

export function getEC2Price(platform) {
    // console.log("process.env.TOKEN", process.env.VAULT_TOKEN);

    let priceDetails = vault.read(`${VAULT.API_URL}` + `${platform}` + `${VAULT.EC2}`);

    return priceDetails;
}
