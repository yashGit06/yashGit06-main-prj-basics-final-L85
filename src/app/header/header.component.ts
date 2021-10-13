import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() rsEmit = new EventEmitter<{ r: boolean, s: boolean }>();
  // @Output() sEmit = new EventEmitter<boolean>();

  value: {
    r: boolean;
    s: boolean;
  } = { r: null, s: null };

  checkVisible(type: string) {
    if (type === 'recipes') {
      this.value.r = true;
      this.value.s = false;
    } else {
      this.value.r = false;
      this.value.s = true;
    }
    this.rsEmit.emit(this.value);
  }

}