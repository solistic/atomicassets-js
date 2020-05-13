import { expect } from "chai";
import RpcApi from "../src/API/Rpc";
import RpcAsset from "../src/API/Rpc/Asset";

// tslint:disable-next-line:no-var-requires
const fetch = require("node-fetch");

describe("RPC API", () => {
    const api = new RpcApi("https://testnet.wax.pink.gg", "testingasset",  {
        fetch, rateLimit: 4,
    });

    const exampleAsset = {
        owner: "leonleonleon",
        id: "1099511627783",
    };

    it("fetch asset " + exampleAsset.id, async () => {
        const asset = await api.getAsset(exampleAsset.owner, exampleAsset.id);

        const result = await asset.toObject();

        expect(result).to.deep.equal(result);
    }).timeout(10000);

    it("test caching", async () => {
        const asset = await api.getAsset(exampleAsset.owner, exampleAsset.id);

        const result = await asset.toObject();

        expect(result).to.deep.equal(result);
    }).timeout(10000);

    it("fetch offers ", async () => {
        const offers = await api.getAccountOffers(exampleAsset.owner);

        const result = await Promise.all(offers.map(async (offer) => await offer.toObject()));

        expect(result).to.deep.equal(result);
    }).timeout(20000);

    it("fetch assets ", async () => {
        const assets = await api.getAccountAssets(exampleAsset.owner);

        const result = await Promise.all(assets.map(async (asset) => await asset.toObject()));

        expect(result).to.deep.equal(result);
    }).timeout(20000);
});
