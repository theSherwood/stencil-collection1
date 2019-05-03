import { Component, Prop, Element, Listen, State } from "@stencil/core";

@Component({
  tag: "sherwood-tri-navbar",
  styleUrl: "./tri-navbar.css",
  shadow: true
})
export class TriNavbar {
  @Element() el: HTMLElement;

  @State() showLeftClass = "hidden-list";
  @State() showMiddleClass = "hidden-list";
  @State() showRightClass = "hidden-list";

  @Prop() styles;
  @Prop({ reflectToAttr: true }) background: string = "black";
  @Prop({ reflectToAttr: true }) color: string = "white";
  @Prop({ reflectToAttr: true }) height: string = "";
  @Prop({ reflectToAttr: true }) position: string = "fixed";
  @Prop({ reflectToAttr: true }) display: string = "block";
  @Prop({ reflectToAttr: true }) fontfamily: string = "sans-serif";
  @Prop({ reflectToAttr: true }) fontsize: string = "1em";

  @Prop({ reflectToAttr: true }) breakpoint: number = 600;

  componentDidLoad() {
    let slot = this.el.shadowRoot.querySelector("[name=left-icon]");
    if ((slot as HTMLSlotElement).assignedNodes().length === 0) {
      this.showLeftClass = "list-inline";
    }
    slot = this.el.shadowRoot.querySelector("[name=middle-icon]");
    if ((slot as HTMLSlotElement).assignedNodes().length === 0) {
      this.showMiddleClass = "list-inline";
    }
    slot = this.el.shadowRoot.querySelector("[name=right-icon]");
    if ((slot as HTMLSlotElement).assignedNodes().length === 0) {
      this.showRightClass = "list-inline";
    }
  }

  @Listen("click")
  onclick(e) {
    let elmnt = e.target;
    while (elmnt && !elmnt.matches("sherwood-tri-navbar")) {
      if (elmnt.matches('[slot="left-icon"]')) {
        this.showLeftClass =
          this.showLeftClass === "hidden-list" ? "list-block" : "hidden-list";
        break;
      }
      if (elmnt.matches('[slot="middle-icon"]')) {
        this.showMiddleClass =
          this.showMiddleClass === "hidden-list" ? "list-block" : "hidden-list";
        break;
      }
      if (elmnt.matches('[slot="right-icon"]')) {
        this.showRightClass =
          this.showRightClass === "hidden-list" ? "list-block" : "hidden-list";
        break;
      }
      elmnt = elmnt.parentElement;
    }
  }

  render() {
    const navStyle = this.styles || {
      background: this.background,
      color: this.color,
      height: this.height,
      position: this.position,
      fontFamily: this.fontfamily,
      fontSize: this.fontsize,
      width: "100%",
      top: "0",
      left: "0"
    };

    const w = document.documentElement.clientWidth;
    console.log(w, this.breakpoint);

    return (
      <nav id="nav" style={navStyle}>
        <div id="left-wrapper" class="wrapper">
          <slot name="left-icon" />
          <div id="left-list" class={this.showLeftClass}>
            <slot name="left" />
          </div>
        </div>
        <div id="middle-wrapper" class="wrapper">
          <slot name="middle-icon" />
          <div id="middle-list" class={this.showMiddleClass}>
            <slot name="middle" />
          </div>
        </div>
        <div id="right-wrapper" class="wrapper">
          <slot name="right-icon" />
          <div id="right-list" class={this.showRightClass}>
            <slot name="right" />
          </div>
        </div>
      </nav>
    );
  }
}
