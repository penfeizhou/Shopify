import {
  Group,
  layoutConfig,
  ModularPanel,
  scroller,
  VLayout,
  vlayout,
} from "doric";
import { APIPanel } from "../api/API";
import { BannerPanel } from "./BannerPanel";

export class HomePanel extends ModularPanel {
  setupModules() {
    return [BannerPanel, APIPanel];
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
