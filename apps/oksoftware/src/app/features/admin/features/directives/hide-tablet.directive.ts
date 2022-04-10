import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[oksoftwareNxAngularHideTablet]',
})
export class HideTabletDirective {
  // constructor(private el: ElementRef) {}

  @HostBinding('style.display') display: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 1024) {
      // this.el.nativeElement.style.display = 'none';
      this.display = 'none';
    } else {
      // this.el.nativeElement.style.display = 'block';
      this.display = 'block';
    }
  }
}
