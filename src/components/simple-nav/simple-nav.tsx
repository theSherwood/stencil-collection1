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

  componentDidLoad() {
    this.breakL.addListener(() => {
      this.breakL = window.matchMedia(`(min-width: ${this.leftbreak}px)`);
    });
    this.breakR.addListener(() => {
      this.breakR = window.matchMedia(`(min-width: ${this.rightbreak}px)`);
    });
  }

  @Listen("click")
  onclick(e) {
    let elmnt = e.target;
    while (elmnt && !elmnt.matches("sherwood-simple-nav")) {
      if (elmnt.matches('[slot="left-label"]')) {
        this.showLDropdown = !this.showLDropdown;
        // this.showRDropdown = false;
        break;
      } else if (elmnt.matches('[slot="right-label"]')) {
        this.showRDropdown = !this.showRDropdown;
        // this.showLDropdown = false;
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
              <slot name="left-label" />
            )}
          </div>
          <div class={"list-wrapper show-" + this.showLDropdown}>
            <slot name="left-list-item" />
          </div>
        </section>
        <section id="right">
          <div class="bar-wrapper">
            {this.breakR.matches ? (
              <slot name="right-list-item" />
            ) : (
              <slot name="right-label" />
            )}
          </div>
          <div class={"list-wrapper show-" + this.showRDropdown}>
            <slot name="right-list-item" />
          </div>
        </section>
      </nav>
    );
  }
}
