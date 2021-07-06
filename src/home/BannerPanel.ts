import {
  Color,
  gravity,
  Gravity,
  Group,
  hlayout,
  HLayout,
  image,
  layoutConfig,
  modal,
  ScaleType,
  slideItem,
  Slider,
  slider,
  Stack,
  stack,
  ViewHolder,
  ViewModel,
  VMPanel,
} from "doric";
import { API } from "../api/API";

interface BannerModel {
  banners: { imageUrl: string }[];
  index: number;
}
class BannerVH extends ViewHolder {
  sliderView!: Slider;
  indicator!: HLayout;
  build(root: Group) {
    stack(
      [
        (this.sliderView = slider({
          layoutConfig: layoutConfig().just(),
          width: Environment.screenWidth,
          height: 200,
        })),
        (this.indicator = hlayout([], {
          space: 5,
          layoutConfig: layoutConfig()
            .fit()
            .configAlignment(gravity().centerX().bottom())
            .configMargin({
              bottom: 10,
            }),
        })),
      ],
      {
        layoutConfig: layoutConfig().just(),
        width: Environment.screenWidth,
        height: 200,
      }
    ).in(root);
  }
}

class BannerVM extends ViewModel<BannerModel, BannerVH> {
  onAttached(state: BannerModel, vh: BannerVH) {
    API.getTopSales(context).then((res) => {
      this.updateState((state) => {
        state.banners = res.map((e) => {
          return { imageUrl: e.node.images.edges[0].node.transformedSrc };
        });
      });
    });
    vh.sliderView.apply({
      renderPage: (idx: number) => {
        return slideItem(
          image({
            imageUrl: state.banners[idx]?.imageUrl,
            layoutConfig: layoutConfig().most(),
            scaleType: ScaleType.ScaleAspectFit,
          }),
          {
            layoutConfig: layoutConfig().most(),
          }
        );
      },
    });
  }
  onBind(state: BannerModel, vh: BannerVH) {
    vh.sliderView.apply({
      itemCount: state.banners.length,
    });
    vh.indicator.children.length = 0;
    state.banners.forEach((_, idx) => {
      const v = new Stack();
      v.width = v.height = 8;
      v.corners = 4;
      v.border = {
        width: 1,
        color: Color.WHITE,
      };
      vh.indicator.addChild(v);
      if (idx === state.index) {
        v.backgroundColor = Color.WHITE;
      }
    });
  }
}

export class BannerPanel extends VMPanel<BannerModel, BannerVH> {
  getViewModelClass() {
    return BannerVM;
  }
  getState() {
    return {
      banners: [],
      index: 0,
    };
  }
  getViewHolderClass() {
    return BannerVH;
  }
}
