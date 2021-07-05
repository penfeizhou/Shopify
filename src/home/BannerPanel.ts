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
          loop: true,
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
      onClick: async () => {
        const idx = await vh.sliderView.getSlidedPage(context);
        modal(context).alert("Current is " + idx);
      },
      onPageSlided: (idx) => {
        //this.updateState((state) => (state.index = idx - 1));
      },
    });
    // setInterval(() => {
    //   this.updateState((state) => {
    //     state.index++;
    //     if (state.index >= state.banners.length) {
    //       state.index = 0;
    //     }
    //   });
    //   vh.sliderView.slidePage(context, state.index, true);
    // }, 2000);
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
      banners: [
        {
          imageUrl: "https://eimg.smzdm.com/202107/01/60ddc5a2bb8bc2906.jpg",
        },
        {
          imageUrl: "https://eimg.smzdm.com/202107/01/60ddc819ac3ac646.jpg",
        },
        {
          imageUrl: "https://eimg.smzdm.com/202107/01/60ddc6b53ca777696.jpg",
        },
        {
          imageUrl: "https://eimg.smzdm.com/202107/01/60dd9ffe30b446621.jpg",
        },
        {
          imageUrl: "https://eimg.smzdm.com/202107/01/60ddb33550bd96693.jpg",
        },
        {
          imageUrl: "https://eimg.smzdm.com/202107/01/60ddb92a8eb6b1661.jpg",
        },
      ],
      index: 0,
    };
  }
  getViewHolderClass() {
    return BannerVH;
  }
}
