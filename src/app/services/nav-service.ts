import { EventEmitter } from '@angular/core';
export class NavService {
  navchange: EventEmitter<any> = new EventEmitter();
  constructor() {}
  emitNavChangeEvent(eventData) {
    this.navchange.emit(eventData);
  }
  getNavChangeEmitter() {
    return this.navchange;
  }
}
