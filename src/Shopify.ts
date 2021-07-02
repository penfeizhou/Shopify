import { Panel, Group, navbar, notch } from "doric";
import { MainLayout } from "./widgets/MainLayout";

@Entry
class Shopify extends Panel {
  onShow() {
    navbar(context).setHidden(false);
  }
  build(root: Group): void {
    const mainLayout = new MainLayout();
    mainLayout.in(root);
    notch(context)
      .inset()
      .then(
        (e) =>
          (mainLayout.padding = {
            bottom: e.bottom,
          })
      );
  }
}
