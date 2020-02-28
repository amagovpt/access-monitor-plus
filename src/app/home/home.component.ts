import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

import { MessageService } from '../message.service';

export class UrlStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  url: FormControl;
  urlMatcher: any;

  htmlInput: FormControl;

  fileInput: FormControl;
  file: File;

  constructor(
    private router: Router,
    private message: MessageService
  ) {

    this.url = new FormControl('', [
      urlValidator
    ]);

    this.htmlInput = new FormControl('', [
      Validators.required
    ]);
    this.fileInput = new FormControl({value: '', disabled: true}, [
      Validators.required
    ]);

    this.urlMatcher = new UrlStateMatcher();
  }

  ngOnInit(): void {}

  validateURL(): void {
    this.router.navigateByUrl('/results/' + encodeURIComponent(this.fixURL(this.url.value)));
  }

  validateHTML(): void {
    const html = this.htmlInput.value;
    sessionStorage.setItem('html-validate', html);
    this.router.navigateByUrl('/results/html');
  }

  validateFile(): void {
    const reader = new FileReader();
    reader.onload = event => {
      sessionStorage.setItem('html-validate', event.target['result'].toString());
      this.router.navigateByUrl('/results/html');
    };
    reader.onerror = error => console.log(error);
    reader.readAsText(this.file);
  }

  onFileChanged(e): void {
    this.file = e.target.files[0];
    this.fileInput.setValue(this.file.name);
  }

  private fixURL(url: string): string {
    url = url.replace('http://', '');
    url = url.replace('https://', '');
    url = url.replace('www.', '');

    if (url[url.length - 1] === '/') {
      url = url.substring(0, url.length - 1);
    }

    return url.trim();
  }
}

function urlValidator(control: FormControl) {
  let url = control.value.trim();

  if (url === '') {
    return null;
  }

  if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('www.')) {
    if (url.includes('.') && url[url.length - 1] !== '.') {
      return null;
    }
  } else if (url.startsWith('http://')) {
    url = url.replace('http://', '');
    if (url.includes('.') && url[url.length - 1] !== '.') {
      return null;
    }
  } else if (url.startsWith('https://')) {
    url = url.replace('https://', '');
    if (url.includes('.') && url[url.length - 1] !== '.') {
      return null;
    }
  } else if (url.startsWith('www.')) {
    url = url.replace('www.', '');
    if (url.includes('.') && url[url.length - 1] !== '.') {
      return null;
    }
  }

  return { 'url': { value: control.value } };
}
