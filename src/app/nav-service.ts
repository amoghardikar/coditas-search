import { EventEmitter } from '@angular/core';
export class NavService {
  navchange: EventEmitter<number> = new EventEmitter();
  constructor() {}
  emitNavChangeEvent(number) {
    this.navchange.emit(number);
  }
  getNavChangeEmitter() {
    return this.navchange;
  }
}
