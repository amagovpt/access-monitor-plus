import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ErrorStateMatcher } from "@angular/material/core";

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

    const button = document.getElementById("exp_button");
    const exListbox = new Listbox(document.getElementById("exp_elem_list"));
    const listboxButton = new ListboxButton(button, exListbox);
    listboxButton.setHandleFocusChange(this.listboxFocusChange.bind(this));

    if (location.pathname.includes("/insert-url")) {
      this.activateTab(this.tabs[0], true);
    } else if (location.pathname.includes("/insert-html")) {
      this.activateTab(this.tabs[1], true);
    } else if (location.pathname.includes("/upload-html")) {
      this.activateTab(this.tabs[2], true);
    }
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

  listboxFocusChange(tabId: number) {
    const tab = this.tabs[tabId - 1];
    this.activateTab(tab, false);
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

class Listbox {
  listboxNode: HTMLElement;
  activeDescendant: string;
  upButton;
  downButton;
  moveButton;

  keys;

  constructor(listboxNode: HTMLElement) {
    this.keys = {
      backspace: 8,
      return: 13,
      space: 32,
      page_up: 33,
      page_down: 34,
      end: 35,
      home: 36,
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      delete: 46,
    };
    this.listboxNode = listboxNode;
    this.activeDescendant = this.listboxNode.getAttribute(
      "aria-activedescendant"
    );
    this.upButton = null;
    this.downButton = null;
    this.moveButton = null;
    this.registerEvents();
  }

  handleFocusChange(element) {}

  handleItemChange(event, items) {}

  registerEvents() {
    this.listboxNode.addEventListener("focus", this.setupFocus.bind(this));
    this.listboxNode.addEventListener("keydown", this.checkKeyPress.bind(this));
    this.listboxNode.addEventListener("click", this.checkClickItem.bind(this));
  }

  setupFocus() {
    if (this.activeDescendant) {
      return;
    }
  }

  focusFirstItem() {
    const firstItem = this.listboxNode.querySelector('[role="option"]');

    if (firstItem) {
      this.focusItem(firstItem);
    }
  }

  focusLastItem() {
    const itemList = this.listboxNode.querySelectorAll('[role="option"]');

    if (itemList.length) {
      this.focusItem(itemList[itemList.length - 1]);
    }
  }

  checkKeyPress(evt) {
    const key = evt.which || evt.keyCode;
    const lastActiveId = this.activeDescendant;
    const firstItem = this.listboxNode.querySelector('[role="option"]');
    let nextItem = document.getElementById(this.activeDescendant) || firstItem;

    if (!nextItem) {
      return;
    }

    switch (key) {
      case this.keys.up:
      case this.keys.down:
        evt.preventDefault();

        if (!this.activeDescendant) {
          // focus first option if no option was previously focused, and perform no other actions
          this.focusItem(nextItem);
          break;
        }

        if (key === this.keys.up) {
          nextItem = this.findPreviousOption(nextItem);
        } else {
          nextItem = this.findNextOption(nextItem);
        }

        if (nextItem) {
          this.focusItem(nextItem);
        }

        break;
      case this.keys.home:
        evt.preventDefault();
        this.focusFirstItem();
        break;
      case this.keys.end:
        evt.preventDefault();
        this.focusLastItem();
        break;
      default:
        break;
    }

    if (this.activeDescendant !== lastActiveId) {
      this.updateScroll();
    }
  }

  findNextOption(currentOption) {
    const allOptions = Array.prototype.slice.call(
      this.listboxNode.querySelectorAll('[role="option"]')
    ); // get options array
    const currentOptionIndex = allOptions.indexOf(currentOption);
    let nextOption = null;

    if (currentOptionIndex > -1 && currentOptionIndex < allOptions.length - 1) {
      nextOption = allOptions[currentOptionIndex + 1];
    }

    return nextOption;
  }

  findPreviousOption(currentOption) {
    const allOptions = Array.prototype.slice.call(
      this.listboxNode.querySelectorAll('[role="option"]')
    ); // get options array
    const currentOptionIndex = allOptions.indexOf(currentOption);
    let previousOption = null;

    if (currentOptionIndex > -1 && currentOptionIndex > 0) {
      previousOption = allOptions[currentOptionIndex - 1];
    }

    return previousOption;
  }

  checkClickItem(evt) {
    if (evt.target.getAttribute("role") === "option") {
      this.focusItem(evt.target);
      evt.target.parentNode.blur();
    }
  }

  defocusItem(element) {
    if (!element) {
      return;
    }
    element.removeAttribute("aria-selected");
    element.classList.remove("focused");
  }

  focusItem(element) {
    this.defocusItem(document.getElementById(this.activeDescendant));
    element.setAttribute("aria-selected", "true");
    element.classList.add("focused");
    this.listboxNode.setAttribute("aria-activedescendant", element.id);
    this.activeDescendant = element.id;

    this.checkUpDownButtons();
    this.handleFocusChange(element);
  }

  updateScroll() {
    const selectedOption = document.getElementById(this.activeDescendant);
    if (
      selectedOption &&
      this.listboxNode.scrollHeight > this.listboxNode.clientHeight
    ) {
      const scrollBottom =
        this.listboxNode.clientHeight + this.listboxNode.scrollTop;
      const elementBottom =
        selectedOption.offsetTop + selectedOption.offsetHeight;
      if (elementBottom > scrollBottom) {
        this.listboxNode.scrollTop =
          elementBottom - this.listboxNode.clientHeight;
      } else if (selectedOption.offsetTop < this.listboxNode.scrollTop) {
        this.listboxNode.scrollTop = selectedOption.offsetTop;
      }
    }
  }

  checkUpDownButtons() {
    const activeElement = document.getElementById(this.activeDescendant);

    if (!activeElement) {
      this.upButton.setAttribute("aria-disabled", "true");
      this.downButton.setAttribute("aria-disabled", "true");
      return;
    }

    if (this.upButton) {
      if (activeElement.previousElementSibling) {
        this.upButton.setAttribute("aria-disabled", false);
      } else {
        this.upButton.setAttribute("aria-disabled", "true");
      }
    }

    if (this.downButton) {
      if (activeElement.nextElementSibling) {
        this.downButton.setAttribute("aria-disabled", false);
      } else {
        this.downButton.setAttribute("aria-disabled", "true");
      }
    }
  }

  clearActiveDescendant() {
    this.activeDescendant = null;
    this.listboxNode.setAttribute("aria-activedescendant", null);

    if (this.moveButton) {
      this.moveButton.setAttribute("aria-disabled", "true");
    }

    this.checkUpDownButtons();
  }

  setHandleItemChange(handlerFn) {
    this.handleItemChange = handlerFn;
  }

  setHandleFocusChange(focusChangeHandler) {
    this.handleFocusChange = focusChangeHandler;
  }
}

class ListboxButton {
  button: HTMLElement;
  listbox: Listbox;
  keys;

  constructor(button: HTMLElement, listbox: Listbox) {
    this.keys = {
      backspace: 8,
      return: 13,
      space: 32,
      page_up: 33,
      page_down: 34,
      end: 35,
      home: 36,
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      delete: 46,
    };
    this.button = button;
    this.listbox = listbox;
    this.registerEvents();
  }

  registerEvents() {
    this.button.addEventListener("click", this.showListbox.bind(this));
    this.button.addEventListener("keyup", this.checkShow.bind(this));
    this.listbox.listboxNode.addEventListener(
      "blur",
      this.hideListbox.bind(this)
    );
    this.listbox.listboxNode.addEventListener(
      "keydown",
      this.checkHide.bind(this)
    );
    this.listbox.setHandleFocusChange(this.onFocusChange.bind(this));
  }

  handleFocusChange(tabId) {}

  setHandleFocusChange(focusChangeHandler) {
    this.handleFocusChange = focusChangeHandler;
  }

  checkShow(evt) {
    const key = evt.which || evt.keyCode;

    switch (key) {
      case this.keys.up:
      case this.keys.down:
        evt.preventDefault();
        this.showListbox();
        this.listbox.checkKeyPress(evt);
        break;
    }
  }

  checkHide(evt) {
    const key = evt.which || evt.keyCode;

    switch (key) {
      case this.keys.return:
      case this.keys.esc:
        evt.preventDefault();
        this.hideListbox();
        this.button.focus();
        break;
    }
  }

  showListbox() {
    this.removeClass(this.listbox.listboxNode, "hidden");
    this.button.setAttribute("aria-expanded", "true");
    this.listbox.listboxNode.focus();
  }

  hideListbox() {
    this.addClass(this.listbox.listboxNode, "hidden");
    this.button.removeAttribute("aria-expanded");
  }

  addClass(element, className) {
    if (!this.hasClass(element, className)) {
      element.className += " " + className;
    }
  }

  onFocusChange(focusedItem) {
    this.button.innerText = focusedItem.innerText;
    const idString = focusedItem.getAttribute("id");
    const tabId = idString.charAt(idString.length - 1);
    this.handleFocusChange(tabId);
  }

  removeClass(element, className) {
    const classRegex = new RegExp("(\\s|^)" + className + "(\\s|$)");
    element.className = element.className.replace(classRegex, " ").trim();
  }

  hasClass(element, className) {
    return new RegExp("(\\s|^)" + className + "(\\s|$)").test(
      element.className
    );
  }
}
