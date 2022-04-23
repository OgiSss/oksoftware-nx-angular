import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedReplayComponent } from './shared-replay.component';

describe('SharedReplayComponent', () => {
  let component: SharedReplayComponent;
  let fixture: ComponentFixture<SharedReplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedReplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedReplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
