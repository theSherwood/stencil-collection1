import { Component, Prop, Element, Listen, State } from "@stencil/core";

@Component({
  tag: "admls-navbar",
  styleUrl: "./navbar.css",
  shadow: true
})
export class Navbar {
  @Element() el: HTMLElement;

  @State() showLeft = false;
  @State() showMiddle = false;
  @State() showRight = false;

  @Prop() styles;
  @Prop({ reflectToAttr: true }) background: string = "black";
  @Prop({ reflectToAttr: true }) color: string = "white";
  @Prop({ reflectToAttr: true }) height: string = "";
  @Prop({ reflectToAttr: true }) position: string = "fixed";
  @Prop({ reflectToAttr: true }) display: string = "block";

  componentDidLoad() {
    let slot = this.el.shadowRoot.querySelector("[name=left-icon]");
    if ((slot as HTMLSlotElement).assignedNodes().length === 0) {
      this.showLeft = true;
    }
    slot = this.el.shadowRoot.querySelector("[name=middle-icon]");
    if ((slot as HTMLSlotElement).assignedNodes().length === 0) {
      this.showMiddle = true;
    }
    slot = this.el.shadowRoot.querySelector("[name=right-icon]");
    if ((slot as HTMLSlotElement).assignedNodes().length === 0) {
      this.showRight = true;
    }
  }

  @Listen("click")
  onclick(e) {
    let elmnt = e.target;
    while (elmnt && !elmnt.matches("admls-navbar")) {
      if (elmnt.matches('[slot="left-icon"]')) {
        this.showLeft = !this.showLeft;
        break;
      }
      if (elmnt.matches('[slot="middle-icon"]')) {
        this.showMiddle = !this.showMiddle;
        break;
      }
      if (elmnt.matches('[slot="right-icon"]')) {
        this.showRight = !this.showRight;
        break;
      }
      elmnt = elmnt.parentElement;
    }
    console.log(e.target);
  }

  render() {
    const navStyle = this.styles || {
      background: this.background,
      color: this.color,
      height: this.height,
      position: this.position,
      width: "100%",
      top: "0",
      left: "0"
    };
    console.log(this.showLeft);
    return (
      <nav id="nav" style={navStyle}>
        <div id="left-wrapper" class="wrapper">
          <slot name="left-icon" />
          <div
            id="left-list"
            class={this.showLeft ? "shown-list" : "hidden-list"}
          >
            <slot name="left" />
          </div>
        </div>
        <div id="middle-wrapper" class="wrapper">
          <slot name="middle-icon" />
          <div
            id="middle-list"
            class={this.showMiddle ? "shown-list" : "hidden-list"}
          >
            <slot name="middle" />
          </div>
        </div>
        <div id="right-wrapper" class="wrapper">
          <slot name="right-icon" />
          <div
            id="right-list"
            class={this.showRight ? "shown-list" : "hidden-list"}
          >
            <slot name="right" />
          </div>
        </div>

        {/* <slot name="middle" />
        <slot name="middle-icon" />
        <slot name="right" />
        <slot name="right-icon" /> */}
      </nav>
    );
  }
}
