import type { SvelteComponent } from "svelte";
import { default as CompClass } from "./index.svelte";

export class SvelteTemplate {
  protected compInstance: SvelteComponent | any = null;
  constructor() {
    this._initComponent();
  }

  private _initComponent() {
    const target: HTMLElement = document.documentElement;

    this.compInstance = new CompClass({
      target,
    });
  }
}
