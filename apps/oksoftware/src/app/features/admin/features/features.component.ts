import { Component } from '@angular/core';

@Component({
  selector: 'oksoftware-nx-angular-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent {
  public hide = true;
  code = `
export class HideElementsDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set oksoftwareNxAngularHideElements(condition: boolean) {
    if (!condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}`;

  code2 = `
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
`;

  code3 = `
@ViewChild("tpl") tpl: TemplateRef<any>;

  ngAfterViewInit() {
    let elementRef = this.tpl.elementRef;
    console.log(elementRef.nativeElement);
}`;

  code4 = `
@ViewChildren("tpl") templateList: QueryList<SomeComponent>;

  ngAfterViewInit() {
     this.templateList.changes.subscribe((t) => {
      console.log(t);
    });
}`;

  code5 = `
constructor(private injector: Injector,
            private r: ComponentFactoryResolver) {
  let factory = this.r.resolveComponentFactory(ColorComponent);
  let componentRef = factory.create(injector);
  let view = componentRef.hostView;
}`;

  code6 = `
ngAfterViewInit() {
  let view = this.tpl.createEmbeddedView(null);
}`;

  code7 = `
ngAfterViewInit() {
  let view = this.tpl.createEmbeddedView(null);
}`;

  code8 = `
@Pipe({
  name: 'trim',
//  pure: true,
})
export class TrimPipe implements PipeTransform {
  transform(value: string): string {
    return value.trim();
  }
}`;
}
