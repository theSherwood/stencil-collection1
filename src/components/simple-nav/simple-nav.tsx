import { Component, Prop, State, Listen } from "@stencil/core";

@Component({
  tag: "sherwood-simple-nav",
  styleUrl: "./simple-nav.css",
  shadow: true
})
export class SimpleNav {
  @State() vw: number = document.documentElement.clientWidth;

  @State() showLDropdown: boolean = false;
  @State() showRDropdown: boolean = false;

  @Prop({ reflectToAttr: true }) leftbreak: string = "600";
  @Prop({ reflectToAttr: true }) rightbreak: string = "600";

  updateViewportWidth = () => {
    this.vw = document.documentElement.clientWidth;
  };

  componentDidLoad() {
    window.addEventListener("resize", this.updateViewportWidth);
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
    const { vw, leftbreak, rightbreak } = this;

    console.log("render");

    return (
      <nav id="container">
        <section id="left">
          <div class="bar-wrapper">
            {vw > Number(leftbreak) ? (
              <slot name="left-list-item" />
            ) : (
              [
                <slot name="left-label" />,
                <div class={"list-wrapper show-" + this.showLDropdown}>
                  <slot name="left-list-item" />
                </div>
              ]
            )}
          </div>
        </section>
        <section id="right">
          <div class="bar-wrapper">
            {vw > Number(rightbreak) ? (
              <slot name="right-list-item" />
            ) : (
              [
                <slot name="right-label" />,
                <div class={"list-wrapper show-" + this.showRDropdown}>
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
