import {
  ViewComponent,
  VLayout,
  layoutConfig,
  stack,
  hlayout,
  Color,
  Stack,
  HLayout,
  modal,
} from "doric";
import { TabLayout } from "./TabLayout";

@ViewComponent
export class MainLayout extends VLayout {
  contentLayout = stack([], {
    layoutConfig: layoutConfig().mostWidth().configWeight(1),
  });

  tabLayout = new TabLayout([
    {
      title: "Home",
      iconNormal: "image/home.png",
      iconHighlight: "image/home_h.png",
    },
    {
      title: "Category",
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

  constructor() {
    super();
    this.build();
  }

  build() {
    this.layoutConfig = layoutConfig().most();
    this.addChild(this.contentLayout);
    this.addChild(this.tabLayout);
    this.tabLayout.onTabSelected = (idx) => {
      modal(context).alert(`Selected ${idx}`);
    };
  }
}
