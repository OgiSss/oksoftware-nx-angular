import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[oksoftwareNxAngularIpadResponsive]',
})
export class IpadResponsiveDirective {
  @HostBinding('style.display') display = 'none';

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth > 1200) {
      this.display = 'none';
    } else {
      this.display = 'block';
    }
  }
}
