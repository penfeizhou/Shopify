import {
  ViewComponent,
  VLayout,
  layoutConfig,
  Color,
  Stack,
  View,
} from "doric";
import { TabLayout, TabModel } from "./TabLayout";

@ViewComponent
class MainContent extends Stack {
  constructor() {
    super();
    this.layoutConfig = layoutConfig().mostWidth().configWeight(1);
    this.backgroundColor = Color.WHITE;
  }
  addChild(v: View) {
    super.addChild(v);
    if (this.children.length > 1) {
      v.hidden = true;
    }
  }
}

@ViewComponent
export class MainLayout extends VLayout {
  contentLayout: MainContent;
  tabLayout: TabLayout;

  constructor(tabData: TabModel[]) {
    super();
    this.tabLayout = new TabLayout(tabData);
    this.contentLayout = new MainContent();
    this.build();
  }

  build() {
    this.layoutConfig = layoutConfig().most();
    this.backgroundColor = Color.parse("#eeeeee");
    this.addChild(this.contentLayout);
    this.addChild(this.tabLayout);
    this.contentLayout.children.forEach((e, i) => {
      e.hidden = 0 !== i;
    });
    this.tabLayout.onTabSelected = (idx) => {
      this.contentLayout.children.forEach((e, i) => {
        e.hidden = idx !== i;
      });
    };
  }
}
