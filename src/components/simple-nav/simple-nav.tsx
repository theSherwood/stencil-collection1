import { Component, Prop, State, Listen } from "@stencil/core";

@Component({
  tag: "sherwood-simple-nav",
  styleUrl: "./simple-nav.css",
  shadow: true
})
export class SimpleNav {
  @Prop() leftbreak: string = "600";
  @Prop() rightbreak: string = "400";

  @State() breakL = window.matchMedia(`(min-width: ${this.leftbreak}px)`);
  @State() breakR = window.matchMedia(`(min-width: ${this.rightbreak}px)`);

  @State() showLDropdown: boolean = false;
  @State() showRDropdown: boolean = false;

  // @State() lZIndex: number = -1;
  // @State() rZIndex: number = -2;

  componentDidLoad() {
    this.breakL.addListener(() => {
      this.breakL = window.matchMedia(`(min-width: ${this.leftbreak}px)`);
      if (this.breakL.matches) this.showLDropdown = false;
    });
    this.breakR.addListener(() => {
      this.breakR = window.matchMedia(`(min-width: ${this.rightbreak}px)`);
      if (this.breakR.matches) this.showRDropdown = false;
    });
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
    return (
      <nav id="container">
        <section id="left">
          <div class="bar-wrapper">
            {this.breakL.matches ? (
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
            {this.breakR.matches ? (
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
