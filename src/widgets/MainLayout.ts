import {
  ViewComponent,
  VLayout,
  layoutConfig,
  stack,
  Color,
  text,
} from "doric";
import { TabLayout } from "./TabLayout";

@ViewComponent
export class MainLayout extends VLayout {
  contentLayout = stack([], {
    layoutConfig: layoutConfig().mostWidth().configWeight(1),
    backgroundColor: Color.WHITE,
  });
  fragments = [
    stack(
      [
        text({
          text: "This is home",
        }),
      ],
      {
        layoutConfig: layoutConfig().most(),
      }
    ),
    stack(
      [
        text({
          text: "This is category",
        }),
      ],
      {
        layoutConfig: layoutConfig().most(),
      }
    ),
    stack(
      [
        text({
          text: "This is cart",
        }),
      ],
      {
        layoutConfig: layoutConfig().most(),
      }
    ),
    stack(
      [
        text({
          text: "This is my",
        }),
      ],
      {
        layoutConfig: layoutConfig().most(),
      }
    ),
  ];
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
    this.fragments.forEach((e) => this.contentLayout.addChild(e));
    this.layoutConfig = layoutConfig().most();
    this.backgroundColor = Color.parse("#eeeeee");
    this.addChild(this.contentLayout);
    this.addChild(this.tabLayout);
    this.fragments.forEach((e, i) => {
      e.hidden = 0 !== i;
    });
    this.tabLayout.onTabSelected = (idx) => {
      this.fragments.forEach((e, i) => {
        e.hidden = idx !== i;
      });
    };
  }
}
