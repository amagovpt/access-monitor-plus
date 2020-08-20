import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ErrorStateMatcher } from "@angular/material/core";

import { MessageService } from "../message.service";

export class UrlStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  url: FormControl;
  urlMatcher: any;

  htmlInput: FormControl;

  fileInput: FormControl;
  file: File;
  validFile: boolean;

  tabs: HTMLElement[] = [];
  panels: HTMLElement[] = [];
  tablist: HTMLElement;

  keys;
  direction;

  constructor(private readonly router: Router) {
    this.url = new FormControl("", [urlValidator]);

    this.htmlInput = new FormControl("", [Validators.required]);
    this.fileInput = new FormControl({ value: "", disabled: true }, [
      Validators.required,
    ]);

    this.urlMatcher = new UrlStateMatcher();
    this.validFile = false;
  }

  ngOnInit(): void {
    this.keys = {
      end: 35,
      home: 36,
      left: 37,
      up: 38,
      right: 39,
      down: 40,
    };
    this.direction = {
      37: -1,
      38: -1,
      39: 1,
      40: 1,
    };
    this.tablist = document.querySelectorAll<HTMLElement>(
      '[role="tablist"]'
    )[0];

    this.generateArrays();
    this.bindListeners();
  }

  validateURL(): void {
    this.router.navigateByUrl("/results/" + encodeURIComponent(this.url.value));
  }

  validateHTML(): void {
    const html = this.htmlInput.value;
    sessionStorage.setItem("html-validate", this.getDOM(html));
    this.router.navigateByUrl("/results/html");
  }

  validateFile(): void {
    const reader = new FileReader();
    reader.onload = (event) => {
      sessionStorage.setItem(
        "html-validate",
        this.getDOM(event.target["result"].toString())
      );
      this.router.navigateByUrl("/results/html");
    };
    reader.onerror = (error) => console.log(error);
    reader.readAsText(this.file);
  }

  getDOM(content: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    return doc.documentElement.outerHTML;
  }

  onFileChanged(e): void {
    this.file = e.target.files[0];
    this.fileInput.setValue(this.file.name);

    if (this.file.type !== "text/html") {
      this.validFile = false;
      this.fileInput.setErrors({ invalidType: true });
    } else {
      this.validFile = true;
      this.fileInput.setErrors(null);
    }
  }

  generateArrays() {
    const tabs = document.querySelectorAll<HTMLElement>('[role="tab"]');
    tabs.forEach((tab) => this.tabs.push(tab));
    const panels = document.querySelectorAll<HTMLElement>('[role="tabpanel"]');
    panels.forEach((panel) => this.panels.push(panel));
  }

  bindListeners() {
    for (const tab of this.tabs) {
      tab.addEventListener("click", this.clickEventListener.bind(this));
      tab.addEventListener("keydown", this.keydownEventListener.bind(this));
      tab.addEventListener("keyup", this.keyupEventListener.bind(this));
    }
  }

  clickEventListener(event) {
    const tab = event.target;
    this.activateTab(tab, false);
  }

  keydownEventListener(event) {
    const key = event.keyCode;

    switch (key) {
      case this.keys.end:
        event.preventDefault();
        // Activate last tab
        this.activateTab(this.tabs[this.tabs.length - 1], true);
        break;
      case this.keys.home:
        event.preventDefault();
        // Activate first tab
        this.activateTab(this.tabs[0], true);
        break;

      // Up and down are in keydown
      // because we need to prevent page scroll >:)
      case this.keys.up:
      case this.keys.down:
        this.determineOrientation(event);
        break;
    }
  }

  keyupEventListener(event) {
    const key = event.keyCode;

    switch (key) {
      case this.keys.left:
      case this.keys.right:
        this.determineOrientation(event);
        break;
    }
  }

  determineOrientation(event) {
    const key = event.keyCode;
    const vertical =
      this.tablist.getAttribute("aria-orientation") == "vertical";
    let proceed = false;

    if (vertical) {
      if (key === this.keys.up || key === this.keys.down) {
        event.preventDefault();
        proceed = true;
      }
    } else {
      if (key === this.keys.left || key === this.keys.right) {
        proceed = true;
      }
    }
    if (proceed) {
      this.switchTabOnArrowPress(event);
    }
  }

  switchTabOnArrowPress(event) {
    const pressed = event.keyCode;

    for (const tab of this.tabs) {
      tab.addEventListener("focus", this.focusEventHandler.bind(this));
    }

    if (this.direction[pressed]) {
      const target = event.target;
      const index = this.tabs.indexOf(target);
      if (index !== undefined) {
        if (this.tabs[index + this.direction[pressed]]) {
          this.tabs[index + this.direction[pressed]].focus();
        } else if (pressed === this.keys.left || pressed === this.keys.up) {
          this.focusLastTab();
        } else if (pressed === this.keys.right || pressed === this.keys.down) {
          this.focusFirstTab();
        }
      }
    }
  }

  activateTab(tab: HTMLElement, setFocus: boolean) {
    setFocus = setFocus || true;
    // Deactivate all other tabs
    this.deactivateTabs();

    // Remove tabindex attribute
    tab.removeAttribute("tabindex");

    // Set the tab as selected
    tab.setAttribute("aria-selected", "true");

    // Get the value of aria-controls (which is an ID)
    const controls = tab.getAttribute("aria-controls");

    // Remove is-hidden class from tab panel to make it visible
    document.getElementById(controls).classList.remove("is-hidden");

    // Set focus when required
    if (setFocus) {
      tab.focus();
    }
  }

  deactivateTabs() {
    for (const tab of this.tabs) {
      tab.setAttribute("tabindex", "-1");
      tab.setAttribute("aria-selected", "false");
      tab.removeEventListener("focus", this.focusEventHandler);
    }

    for (const panel of this.panels) {
      panel.classList.add("is-hidden");
    }
  }

  focusFirstTab() {
    this.tabs[0].focus();
  }

  focusLastTab() {
    this.tabs[this.tabs.length - 1].focus();
  }

  checkTabFocus(target) {
    const focused = document.activeElement;

    if (target === focused) {
      this.activateTab(target, false);
    }
  }

  focusEventHandler(event) {
    const target = event.target;
    const delay = 300;

    setTimeout(this.checkTabFocus.bind(this), delay, target);
  }
}

function urlValidator(control: FormControl) {
  let url = control.value.trim();

  if (url === "") {
    return null;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    if (url.includes("www.")) {
      url = url.replace("www.", "");
    }

    if (url.includes(".") && url[url.length - 1] !== ".") {
      return null;
    }
  }

  return { url: { value: control.value } };
}
