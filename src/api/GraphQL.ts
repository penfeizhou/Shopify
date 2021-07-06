import { BridgeContext, network } from "doric";

const url = "https://graphql.myshopify.com/api/2021-07/graphql.json";
const headers = {
  "X-Shopify-Storefront-Access-Token": "dd4d4dc146542ba7763305d71d1b3d38",
};

export function graphql(context: BridgeContext) {
  return {
    query: async (gql: string, variables?: object) => {
      const res = await network(context).request({
        url,
        method: "post",
        headers,
        data: {
          operationName: "",
          query: gql,
          variables,
        },
      });
      return JSON.parse(res.data);
    },
  };
}
