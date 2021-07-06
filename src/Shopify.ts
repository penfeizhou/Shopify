import { Panel, Group, navbar, notch, ModularPanel, ClassType } from "doric";
import { CartPanel } from "./cart/CartPanel";
import { CategoryPanel } from "./category/CategoryPanel";
import { HomePanel } from "./home/HomePanel";
import { MyPanel } from "./my/MyPanel";
import { MainLayout } from "./widgets/MainLayout";

@Entry
class Shopify extends ModularPanel {
  setupModules(): ClassType<Panel>[] {
    return [HomePanel, CategoryPanel, CartPanel, MyPanel];
  }
  setupShelf(root: Group) {
    const mainLayout = new MainLayout([
      {
        title: "Home",
        iconNormal: "image/home.png",
        iconHighlight: "image/home_h.png",
      },
      {
        title: "Collection",
        iconNormal: "image/category.png",
        iconHighlight: "image/category_h.png",
      },
      {
        title: "Cart",
        iconNormal: "image/cart.png",
        iconHighlight: "image/cart_h.png",
      },
      {
        title: "My",
        iconNormal: "image/my.png",
        iconHighlight: "image/my_h.png",
      },
    ]);
    mainLayout.in(root);
    this.addOnRenderFinishedCallback(async () => {
      const e = await notch(context).inset();
      mainLayout.padding = {
        bottom: e.bottom,
      };
    });
    return mainLayout.contentLayout;
  }
  onShow() {
    navbar(context).setHidden(false);
  }
}
