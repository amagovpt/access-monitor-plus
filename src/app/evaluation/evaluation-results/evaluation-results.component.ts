import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { EvaluationService } from "../evaluation.service";

@Component({
  selector: "app-evaluation-results",
  templateUrl: "./evaluation-results.component.html",
  styleUrls: ["./evaluation-results.component.scss"],
})
export class EvaluationResultsPageComponent implements OnInit, OnDestroy {
  paramsSub: Subscription;
  evaluationSub: Subscription;

  loading: boolean;
  error: boolean;

  eval: any;
  url: string;

  thresholdConfig: any;

  constructor(
    private evaluation: EvaluationService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    this.thresholdConfig = {
      "0": { color: "red" },
      "2.5": { color: "orange" },
      "5": { color: "yellow" },
      "7.5": { color: "#16b455" },
    };

    this.loading = true;
    this.error = false;
  }

  ngOnInit(): void {
    const button = document.getElementById("exp_button2");
    const exListbox = new Listbox(document.getElementById("exp_elem_list2"));
    const listboxButton = new ListboxButton(button, exListbox);
    listboxButton.setHandleFocusChange(this.listboxFocusChange.bind(this));

    this.paramsSub = this.route.params.subscribe((params) => {
      if (params.url) {
        this.url = params.url;
        this.evaluate(false);
      } else {
        this.evaluationSub = this.evaluation
          .evaluateHtml(sessionStorage.getItem("html-validate"))
          .subscribe(async (data) => {
            if (!data) {
              this.error = true;
            } else {
              this.eval = data;
            }

            window.onclick = function (event) {
              if (!event.target.matches("#see_page_dropdown")) {
                var dropdown = document.getElementById("see_page");
                if (dropdown.classList.contains("show_see_page")) {
                  dropdown.classList.remove("show_see_page");
                }
              }
            };

            this.loading = false;
            this.cd.detectChanges();
          });
      }
    });
  }

  listboxFocusChange(focusItem: HTMLElement) {
    focusItem.click();
  }

  evaluate(force: boolean): void {
    this.loading = true;

    if (this.evaluationSub && !this.evaluationSub.closed) {
      this.evaluationSub.unsubscribe();
    }

    this.evaluationSub = this.evaluation
      .evaluateUrl(this.url, force)
      .subscribe((data) => {
        if (!data) {
          this.error = true;
        } else {
          this.eval = data;
        }

        window.onclick = function (event) {
          const dropdowns = document.getElementsByClassName("dropdown-content");
          for (let i = 0; i < dropdowns.length; i++) {
            if (dropdowns[i].classList.contains("show_dropdown")) {
              dropdowns[i].classList.remove("show_dropdown");
            }
          }

          if (
            event.target.matches(
              ".download_data_button, .download_data_button *"
            )
          ) {
            openDownloadData();
          }

          if (event.target.matches(".see_page_button, .see_page_button *")) {
            openSeePage();
          }

          if (event.target.matches(".see_all_button, .see_all_button *")) {
            openAllMenu();
          }
        };

        this.loading = false;
        this.cd.detectChanges();

        const totalPractices =
          this.eval.infoak.A.ok +
          this.eval.infoak.AA.ok +
          this.eval.infoak.AAA.ok +
          this.eval.infoak.A.err +
          this.eval.infoak.AA.err +
          this.eval.infoak.AAA.err +
          this.eval.infoak.A.war +
          this.eval.infoak.AA.war +
          this.eval.infoak.AAA.war;

        const totalOk =
          this.eval.infoak.A.ok +
          this.eval.infoak.AA.ok +
          this.eval.infoak.AAA.ok;
        const totalWar =
          this.eval.infoak.A.war +
          this.eval.infoak.AA.war +
          this.eval.infoak.AAA.war;
        const totalErr =
          this.eval.infoak.A.err +
          this.eval.infoak.AA.err +
          this.eval.infoak.AAA.err;

        const practicesProgress = <HTMLCollectionOf<HTMLElement>>(
          document.getElementsByClassName("practices_progress")
        );

        practicesProgress[0].style.background = `-webkit-linear-gradient(left, #bce1bc, #bce1bc ${
          (totalOk / totalPractices) * 100
        }%, var(--results-summary-table-background) ${
          (totalOk / totalPractices) * 100
        }%, var(--results-summary-table-background) ${
          100 - (totalOk / totalPractices) * 100
        }%)`;
        practicesProgress[0].style.background = `-moz-linear-gradient(left, #bce1bc, #bce1bc ${
          (totalOk / totalPractices) * 100
        }%, lightgrey ${(totalOk / totalPractices) * 100}%, lightgrey ${
          100 - (totalOk / totalPractices) * 100
        }%)`;
        practicesProgress[0].style.background = `-ms-linear-gradient(left, #bce1bc, #bce1bc ${
          (totalOk / totalPractices) * 100
        }%, lightgrey ${(totalOk / totalPractices) * 100}%, lightgrey ${
          100 - (totalOk / totalPractices) * 100
        }%)`;
        practicesProgress[0].style.background = `linear-gradient(left, #bce1bc, #bce1bc ${
          (totalOk / totalPractices) * 100
        }%, lightgrey ${(totalOk / totalPractices) * 100}%, lightgrey ${
          100 - (totalOk / totalPractices) * 100
        }%)`;

        practicesProgress[1].style.background = `-webkit-linear-gradient(left, #ff9, #ff9 ${
          (totalWar / totalPractices) * 100
        }%, var(--results-summary-table-background) ${
          (totalWar / totalPractices) * 100
        }%, var(--results-summary-table-background) ${
          100 - (totalWar / totalPractices) * 100
        }%)`;
        practicesProgress[1].style.background = `-moz-linear-gradient(left, #ff9, #ff9 ${
          (totalWar / totalPractices) * 100
        }%, lightgrey ${(totalWar / totalPractices) * 100}%, lightgrey ${
          100 - (totalWar / totalPractices) * 100
        }%)`;
        practicesProgress[1].style.background = `-ms-linear-gradient(left, #ff9, #ff9 ${
          (totalWar / totalPractices) * 100
        }%, lightgrey ${(totalWar / totalPractices) * 100}%, lightgrey ${
          100 - (totalWar / totalPractices) * 100
        }%)`;
        practicesProgress[1].style.background = `linear-gradient(left, #ff9, #ff9 ${
          (totalWar / totalPractices) * 100
        }%, lightgrey ${(totalWar / totalPractices) * 100}%, lightgrey ${
          100 - (totalWar / totalPractices) * 100
        }%)`;

        practicesProgress[2].style.background = `-webkit-linear-gradient(left, #f99, #f99 ${
          (totalErr / totalPractices) * 100
        }%, var(--results-summary-table-background) ${
          (totalErr / totalPractices) * 100
        }%, var(--results-summary-table-background) ${
          100 - (totalErr / totalPractices) * 100
        }%)`;
        practicesProgress[2].style.background = `-moz-linear-gradient(left, #f99, #f99 ${
          (totalErr / totalPractices) * 100
        }%, lightgrey ${(totalErr / totalPractices) * 100}%, lightgrey ${
          100 - (totalErr / totalPractices) * 100
        }%)`;
        practicesProgress[2].style.background = `-ms-linear-gradient(left, #f99, #f99 ${
          (totalErr / totalPractices) * 100
        }%, lightgrey ${(totalErr / totalPractices) * 100}%, lightgrey ${
          100 - (totalErr / totalPractices) * 100
        }%)`;
        practicesProgress[2].style.background = `linear-gradient(left, #f99, #f99 ${
          (totalErr / totalPractices) * 100
        }%, lightgrey ${(totalErr / totalPractices) * 100}%, lightgrey ${
          100 - (totalErr / totalPractices) * 100
        }%)`;

        practicesProgress[3].style.background = `-webkit-linear-gradient(left, #bce1bc, #bce1bc ${
          (totalOk / totalPractices) * 100
        }%, var(--results-summary-table-background) ${
          (totalOk / totalPractices) * 100
        }%, var(--results-summary-table-background) ${
          100 - (totalOk / totalPractices) * 100
        }%)`;
        practicesProgress[3].style.background = `-moz-linear-gradient(left, #bce1bc, #bce1bc ${
          (totalOk / totalPractices) * 100
        }%, lightgrey ${(totalOk / totalPractices) * 100}%, lightgrey ${
          100 - (totalOk / totalPractices) * 100
        }%)`;
        practicesProgress[3].style.background = `-ms-linear-gradient(left, #bce1bc, #bce1bc ${
          (totalOk / totalPractices) * 100
        }%, lightgrey ${(totalOk / totalPractices) * 100}%, lightgrey ${
          100 - (totalOk / totalPractices) * 100
        }%)`;
        practicesProgress[3].style.background = `linear-gradient(left, #bce1bc, #bce1bc ${
          (totalOk / totalPractices) * 100
        }%, lightgrey ${(totalOk / totalPractices) * 100}%, lightgrey ${
          100 - (totalOk / totalPractices) * 100
        }%)`;

        practicesProgress[4].style.background = `-webkit-linear-gradient(left, #ff9, #ff9 ${
          (totalWar / totalPractices) * 100
        }%, var(--results-summary-table-background) ${
          (totalWar / totalPractices) * 100
        }%, var(--results-summary-table-background) ${
          100 - (totalWar / totalPractices) * 100
        }%)`;
        practicesProgress[4].style.background = `-moz-linear-gradient(left, #ff9, #ff9 ${
          (totalWar / totalPractices) * 100
        }%, lightgrey ${(totalWar / totalPractices) * 100}%, lightgrey ${
          100 - (totalWar / totalPractices) * 100
        }%)`;
        practicesProgress[4].style.background = `-ms-linear-gradient(left, #ff9, #ff9 ${
          (totalWar / totalPractices) * 100
        }%, lightgrey ${(totalWar / totalPractices) * 100}%, lightgrey ${
          100 - (totalWar / totalPractices) * 100
        }%)`;
        practicesProgress[4].style.background = `linear-gradient(left, #ff9, #ff9 ${
          (totalWar / totalPractices) * 100
        }%, lightgrey ${(totalWar / totalPractices) * 100}%, lightgrey ${
          100 - (totalWar / totalPractices) * 100
        }%)`;

        practicesProgress[5].style.background = `-webkit-linear-gradient(left, #f99, #f99 ${
          (totalErr / totalPractices) * 100
        }%, var(--results-summary-table-background) ${
          (totalErr / totalPractices) * 100
        }%, var(--results-summary-table-background) ${
          100 - (totalErr / totalPractices) * 100
        }%)`;
        practicesProgress[5].style.background = `-moz-linear-gradient(left, #f99, #f99 ${
          (totalErr / totalPractices) * 100
        }%, lightgrey ${(totalErr / totalPractices) * 100}%, lightgrey ${
          100 - (totalErr / totalPractices) * 100
        }%)`;
        practicesProgress[5].style.background = `-ms-linear-gradient(left, #f99, #f99 ${
          (totalErr / totalPractices) * 100
        }%, lightgrey ${(totalErr / totalPractices) * 100}%, lightgrey ${
          100 - (totalErr / totalPractices) * 100
        }%)`;
        practicesProgress[5].style.background = `linear-gradient(left, #f99, #f99 ${
          (totalErr / totalPractices) * 100
        }%, lightgrey ${(totalErr / totalPractices) * 100}%, lightgrey ${
          100 - (totalErr / totalPractices) * 100
        }%)`;

        this.cd.detectChanges();
      });
  }

  openCollapsible(index: number): void {
    const table = document.getElementsByClassName("evaluation-table")[0];
    const collapsible = table.getElementsByClassName("collapsible")[index];
    const row = collapsible.parentElement.parentElement;

    if (collapsible.classList.contains("collapsible-active")) {
      collapsible.classList.remove("collapsible-active");
      row.classList.remove("highlight");
    } else {
      collapsible.classList.add("collapsible-active");
      row.classList.add("highlight");
    }

    if (collapsible.classList.contains("colapsLeft-active")) {
      collapsible.classList.remove("colapsLeft-active");
    } else if (collapsible.classList.contains("colapsRight-active")) {
      collapsible.classList.remove("colapsRight-active");
    } else if (collapsible.classList.contains("colapsLeft")) {
      collapsible.classList.add("colapsLeft-active");
    } else if (collapsible.classList.contains("colapsRight")) {
      collapsible.classList.add("colapsRight-active");
    }

    const collapsibleContent = table.getElementsByClassName(
      "collapsible-content"
    )[index];
    if (collapsibleContent.classList.contains("collapsible-content-active")) {
      collapsibleContent.classList.remove("collapsible-content-active");
    } else {
      collapsibleContent.classList.add("collapsible-content-active");
    }
  }

  openSeePage(): void {
    document
      .querySelector(".see_page_button + .dropdown-content")
      .classList.toggle("show_dropdown");
  }

  openDownloadData(): void {
    document
      .querySelector(".download_data_button + .dropdown-content")
      .classList.toggle("show_dropdown");
  }

  openAllMenu(): void {
    document
      .querySelector(".see_all_button + .dropdown-content")
      .classList.toggle("show_dropdown");
  }

  downloadCSV(): void {
    this.evaluation.downloadCSV();
  }

  downloadEARL(): void {
    this.evaluation.downloadEARL();
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
    this.evaluationSub.unsubscribe();
  }
}

function openSeePage(): void {
  document
    .querySelector(".see_page_button + .dropdown-content")
    .classList.toggle("show_dropdown");
}

function openDownloadData(): void {
  document
    .querySelector(".download_data_button + .dropdown-content")
    .classList.toggle("show_dropdown");
}

function openAllMenu(): void {
  document
    .querySelector(".see_all_button + .dropdown-content")
    .classList.toggle("show_dropdown");
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
      case this.keys.space:
      case this.keys.return:
        evt.preventDefault();
        this.followLink(nextItem);
      default:
        break;
    }

    if (this.activeDescendant !== lastActiveId) {
      this.updateScroll();
    }
  }

  followLink(target) {
    this.handleFocusChange(target.firstChild as HTMLElement);
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
    //this.handleFocusChange(element);
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
    this.handleFocusChange(focusedItem);
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
