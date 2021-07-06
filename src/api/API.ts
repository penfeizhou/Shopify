import {
  BridgeContext,
  Color,
  Group,
  layoutConfig,
  modal,
  Panel,
  text,
} from "doric";
import { graphql } from "./GraphQL";

export namespace API {
  export async function getTopSales(context: BridgeContext) {
    const res = (await graphql(context).query(`
    {
        products(first: 5) {
          edges {
            node {
              id
              images(first: 1) {
                edges {
                  node {
                    width
                    height
                    transformedSrc
                  }
                }
              }
            }
          }
        }
    }
      `)) as {
      data: {
        products: {
          edges: {
            node: {
              id: string;
              images: {
                edges: {
                  node: {
                    width: number;
                    height: number;
                    transformedSrc: string;
                  };
                }[];
              };
            };
          }[];
        };
      };
    };
    return res.data.products.edges;
  }
}

export class APIPanel extends Panel {
  build(root: Group) {
    text({
      text: "Request",
      layoutConfig: layoutConfig().mostWidth().justHeight(),
      height: 50,
      backgroundColor: Color.BLUE,
      textColor: Color.WHITE,
      textSize: 20,
      onClick: () => {
        API.getTopSales(context).then((res) => {
          modal(context).alert(JSON.stringify(res));
        });
      },
    }).in(root);
  }
}
