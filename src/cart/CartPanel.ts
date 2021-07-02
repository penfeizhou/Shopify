import {
  text,
  vlayout,
  ViewHolder,
  VMPanel,
  ViewModel,
  Gravity,
  NativeCall,
  Text,
  Color,
  log,
  logw,
  loge,
  Group,
  LayoutSpec,
  layoutConfig,
  modal,
  Panel,
} from "doric";

interface CountModel {
  count: number;
}
class CounterView extends ViewHolder {
  number!: Text;
  counter!: Text;
  build(root: Group) {
    vlayout(
      [
        (this.number = text({
          textSize: 40,
          tag: "tvNumber",
        })),
        (this.counter = text({
          text: "CartPanel",
          textSize: 20,
          tag: "tvCounter",
        })),
      ],
      {
        layoutConfig: layoutConfig().most(),
        gravity: Gravity.Center,
        space: 20,
      }
    ).in(root);
  }
}

class CounterVM extends ViewModel<CountModel, CounterView> {
  onAttached(s: CountModel, vh: CounterView) {
    vh.counter.onClick = () => {
      Promise.resolve(this.getState().count).then((count) => {
        this.updateState((state) => {
          state.count = count + 1;
        });
      });
    };
  }
  onBind(s: CountModel, vh: CounterView) {
    vh.number.text = `${s.count}`;
  }
}

export class CartPanel extends VMPanel<CountModel, CounterView> {
  constructor() {
    super();
  }
  getViewHolderClass() {
    return CounterView;
  }

  getViewModelClass() {
    return CounterVM;
  }

  getState(): CountModel {
    return {
      count: 1,
    };
  }
}
