import { Component, Prop, State, Listen, Element } from "@stencil/core";

@Component({
  tag: "sherwood-simple-nav",
  styleUrl: "./simple-nav.css",
  shadow: true
})
export class SimpleNav {
  @Element() el: HTMLElement;

  @State() breakL: boolean = false;
  @State() breakR: boolean = false;

  @State() showLDropdown: boolean = false;
  @State() showRDropdown: boolean = false;

  @Prop({ reflectToAttr: true }) leftbreak: string = "600";
  @Prop({ reflectToAttr: true }) rightbreak: string = "600";

  @Prop({ reflectToAttr: true }) background: string = "#292d37";
  @Prop({ reflectToAttr: true }) color: string = "#fff";

  @Prop({ reflectToAttr: true }) shadowstyles: string = "";
  @Prop() jsStyles = {};

  @State() stylePayload: HTMLStyleElement;

  updateViewportWidth = () => {
    const vw = document.documentElement.clientWidth;
    this.breakL = vw > Number(this.leftbreak);
    this.breakR = vw > Number(this.rightbreak);
  };

  componentDidLoad() {
    window.addEventListener("resize", this.updateViewportWidth);

    const styleWrapper = this.el.shadowRoot.querySelector(
      "[name=style-payload-wrapper]"
    );
    this.stylePayload = ((styleWrapper as HTMLSlotElement).assignedNodes()[0] as HTMLElement).querySelector(
      ".payload"
    );
    console.log(
      this.stylePayload
      // "style-wrapper",
      // (styleWrapper as HTMLSlotElement).assignedNodes()[0]
    );
  }

  componentDidUnload() {
    window.removeEventListener("resize", this.updateViewportWidth);
  }

  @Listen("click")
  onclick(e) {
    let elmnt = e.target;
    while (elmnt && !elmnt.matches("sherwood-simple-nav")) {
      if (elmnt.matches('[slot="left-label"]')) {
        this.showLDropdown = !this.showLDropdown;
        this.showRDropdown = false;
        break;
      } else if (elmnt.matches('[slot="right-label"]')) {
        this.showRDropdown = !this.showRDropdown;
        this.showLDropdown = false;
        break;
      }
      elmnt = elmnt.parentElement;
    }
  }

  render() {
    const { background, color, breakL, breakR, jsStyles, shadowstyles } = this;

    console.log(this.stylePayload);

    return (
      <nav id="container" style={{ background, color, ...jsStyles }}>
        <style>{shadowstyles}</style>
        <style>{this.stylePayload && this.stylePayload.textContent}</style>
        <slot name="style-payload-wrapper" />
        <section id="left">
          <div class="bar-wrapper">
            {breakL ? (
              <slot name="left-list-item" />
            ) : (
              [
                <slot name="left-label" />,
                <div
                  class={"list-wrapper show-" + this.showLDropdown}
                  style={{ background }}
                >
                  <slot name="left-list-item" />
                </div>
              ]
            )}
          </div>
        </section>
        <section id="right">
          <div class="bar-wrapper">
            {breakR ? (
              <slot name="right-list-item" />
            ) : (
              [
                <slot name="right-label" />,
                <div
                  class={"list-wrapper show-" + this.showRDropdown}
                  style={{ background }}
                >
                  <slot name="right-list-item" />
                </div>
              ]
            )}
          </div>
        </section>
      </nav>
    );
  }
}
