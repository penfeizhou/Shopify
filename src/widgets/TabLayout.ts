import {
  Color,
  Gravity,
  HLayout,
  Image,
  image,
  layoutConfig,
  Text,
  text,
  ViewComponent,
  VLayout,
} from "doric";

export type TabModel = {
  title: string;
  iconNormal: string;
  iconHighlight: string;
};

@ViewComponent
export class TabItem extends VLayout {
  data: TabModel;
  iconV: Image;
  textV: Text;
  constructor(data: TabModel) {
    super();
    this.data = data;
    this.iconV = image({
      imagePath: data.iconNormal,
      layoutConfig: layoutConfig().just(),
      width: 24,
      height: 24,
    });

    this.textV = text({
      text: data.title,
      textSize: 10,
      textColor: Color.parse("#cdcdcd"),
    });
    this.addChild(this.iconV);
    this.addChild(this.textV);
    this.space = 2;
    this.layoutConfig = layoutConfig().mostHeight().configWeight(1);
    this.gravity = Gravity.Center;
  }
  _selected = false;

  get selected() {
    return this._selected;
  }
  set selected(b: boolean) {
    if (b) {
      this.iconV.imagePath = this.data.iconHighlight;
      this.textV.textColor = Color.BLACK;
    } else {
      this.iconV.imagePath = this.data.iconNormal;
      this.textV.textColor = Color.parse("#cdcdcd");
    }
    this._selected = b;
  }
}

@ViewComponent
export class TabLayout extends HLayout {
  items: TabItem[];
  _selectedIndex = 0;

  onTabSelected?: (idx: number, data: TabModel) => void;

  constructor(data: TabModel[]) {
    super();
    this.layoutConfig = layoutConfig().mostWidth().justHeight();
    this.height = 60;
    this.items = data.map((e) => new TabItem(e));
    this.items.forEach((e, idx) => {
      e.onClick = () => {
        this.selectedIndex = idx;
      };
      this.addChild(e);
    });
    this.selectedIndex = 0;
  }

  get selectedIndex() {
    return this._selectedIndex;
  }

  set selectedIndex(idx: number) {
    this.items.forEach((e, i) => {
      e.selected = i === idx;
      if (i === idx && this._selectedIndex !== idx) {
        this.onTabSelected?.(i, e.data);
      }
    });
    this._selectedIndex = idx;
  }
}
