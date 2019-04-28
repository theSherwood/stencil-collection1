/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface AdmlsNavbar {
    'background': string;
    'color': string;
    'display': string;
    'fontFamily': string;
    'height': string;
    'position': string;
    'styles': any;
  }
  interface AdmlsNavbarAttributes extends StencilHTMLAttributes {
    'background'?: string;
    'color'?: string;
    'display'?: string;
    'fontFamily'?: string;
    'height'?: string;
    'position'?: string;
    'styles'?: any;
  }
}

declare global {
  interface StencilElementInterfaces {
    'AdmlsNavbar': Components.AdmlsNavbar;
  }

  interface StencilIntrinsicElements {
    'admls-navbar': Components.AdmlsNavbarAttributes;
  }


  interface HTMLAdmlsNavbarElement extends Components.AdmlsNavbar, HTMLStencilElement {}
  var HTMLAdmlsNavbarElement: {
    prototype: HTMLAdmlsNavbarElement;
    new (): HTMLAdmlsNavbarElement;
  };

  interface HTMLElementTagNameMap {
    'admls-navbar': HTMLAdmlsNavbarElement
  }

  interface ElementTagNameMap {
    'admls-navbar': HTMLAdmlsNavbarElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
