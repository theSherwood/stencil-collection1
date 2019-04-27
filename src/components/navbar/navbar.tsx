import { Component, Prop, Element, Listen, State } from "@stencil/core";

@Component({
  tag: "admls-navbar",
  styleUrl: "./navbar.css",
  shadow: true
})
export class Navbar {
  @Element() el: HTMLElement;

  @State() showLeft = false;

  @Prop() styles;
  @Prop({ reflectToAttr: true }) background: string = "black";
  @Prop({ reflectToAttr: true }) color: string = "white";
  @Prop({ reflectToAttr: true }) height: string = "50px";
  @Prop({ reflectToAttr: true }) position: string = "fixed";
  @Prop({ reflectToAttr: true }) display: string = "block";

  @Listen("click")
  onclick(e) {
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
    return (
      <nav style={navStyle}>
        <div id="left-wrapper">
          <slot name="left-icon" />
          <div id="left-list">
            <slot name="left" />
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
