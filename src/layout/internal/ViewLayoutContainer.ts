import {ILayoutContainer, ILayoutParentContainer, ISize, IView} from '../interfaces';
import {ALayoutContainer} from './ALayoutContainer';

export default class ViewLayoutContainer extends ALayoutContainer implements ILayoutContainer {
  parent: ILayoutParentContainer | null;

  constructor(name: string, public readonly view: IView) {
    super(view.node.ownerDocument, name);
    const min = this.minSize;
    if (min[0] > 0) {
      view.node.style.minWidth = `${min[0]}px`;
    }
    if (min[1] > 0) {
      view.node.style.minHeight = `${min[1]}px`;
    }
  }

  get visible() {
    return this.view.visible;
  }

  set visible(visible: boolean) {
    this.view.visible = visible;
  }

  get minSize() {
    return this.view.minSize;
  }

  get node() {
    return this.view.node;
  }

  resized() {
    this.view.resized();
  }

  destroy() {
    if (this.parent) {
      this.parent.remove(this);
    }
    this.view.destroy();
  }
}

export class HTMLView implements IView {
  readonly minSize: ISize = [0, 0];
  visible: boolean = true;

  constructor(public readonly node: HTMLElement) {

  }

  destroy() {
    //nothing to do
  }

  resized() {
    //nothing to do
  }
}