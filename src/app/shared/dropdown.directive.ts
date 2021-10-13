import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class') openDropdown : string = '';
  isVisible = false;

  constructor(private elRef: ElementRef) { }

  @HostListener('document:click',['$event']/*this is target element*/) showDropdown(eventData: Event) {
    this.isVisible = !this.isVisible;
    this.openDropdown = this.elRef.nativeElement.contains(eventData.target) ? ((this.openDropdown==='open')? '':'open') : '';
    // console.log(this.elRef.nativeElement.contains(eventData.target));
  }

  // @HostListener('mouseleave') mouseleave(eventData: Event) {
  //   this.openDropdown = '';
  //   if (this.isOpen){
  //     this.isOpen=false;
  //   }
  // }
  /**********From lecture************/
  // @HostBinding('class.open') isOpen = false;
  // @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
  //   this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  //   console.log(this.elRef.nativeElement.contains(event.target));
  // }

}
