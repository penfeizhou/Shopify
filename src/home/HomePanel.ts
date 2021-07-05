import {
  Group,
  layoutConfig,
  ModularPanel,
  scroller,
  VLayout,
  vlayout,
} from "doric";
import { BannerPanel } from "./BannerPanel";

export class HomePanel extends ModularPanel {
  setupModules() {
    return [BannerPanel];
  }
  setupShelf(root: Group): Group {
    let container: VLayout;
    scroller(
      (container = vlayout([], {
        layoutConfig: layoutConfig().mostWidth().fitHeight(),
      })),
      {
        layoutConfig: layoutConfig().most(),
      }
    ).in(root);
    return container;
  }
}
