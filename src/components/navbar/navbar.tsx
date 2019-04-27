import { Component, Prop } from "@stencil/core";

@Component({
  tag: "admls-navbar",
  styleUrl: "./navbar.css",
  shadow: true
})
export class Navbar {
  @Prop() styles;
  @Prop({ reflectToAttr: true }) background: string = "black";
  @Prop({ reflectToAttr: true }) color: string = "white";
  @Prop({ reflectToAttr: true }) height: string = "50px";
  @Prop({ reflectToAttr: true }) position: string = "fixed";
  @Prop({ reflectToAttr: true }) display: string = "block";

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
      // <div style={{ background: "black", height: "50px" }}>
      <nav style={navStyle}>
        <slot name="left" />
        <slot name="left-icon" />
        <slot name="middle" />
        <slot name="right" />
        <slot name="right-icon" />
      </nav>
      // </div>
    );
  }
}
