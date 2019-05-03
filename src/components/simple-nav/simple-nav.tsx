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
        console.log(e);
        this.showLDropdown = !this.showLDropdown;
        break;
      } else if (elmnt.matches('[slot="right-label"]')) {
        console.log(e);
        this.showRDropdown = !this.showRDropdown;
        break;
      }
      elmnt = elmnt.parentElement;
    }
  }

  render() {
    // console.log(this.leftbreak, this.rightbreak);
    // console.log(this.breakL.matches, this.breakR.matches);
    return (
      <nav id="container">
        <section id="left">
          {this.breakL.matches ? (
            <slot name="left-list-item" />
          ) : (
            <slot name="left-label" />
          )}
        </section>
        <section id="right">
          {this.breakR.matches ? (
            <slot name="right-list-item" />
          ) : (
            <slot name="right-label" />
          )}
        </section>
      </nav>
    );
  }
}
