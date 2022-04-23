import { Component, OnInit } from '@angular/core';
import { Observable, publishReplay, refCount } from 'rxjs';

@Component({
  selector: 'oksoftware-nx-angular-publish-replay',
  templateUrl: './publish-replay.component.html',
  styleUrls: ['./publish-replay.component.scss'],
})
export class PublishReplayComponent implements OnInit {
  public item: number[] = [];
  public item2: number[] = [];
  public item3: number[] = [];

  ngOnInit(): void {
    const newObs$ = new Observable<number>((subscriber) => {
      let counter = 0;
      const int = setInterval((value: number) => {
        subscriber.next(counter++);
      }, 1000);

      setTimeout(() => {
        subscriber.complete();
        clearInterval(int);
        console.log('COMPLETE');
      }, 2500);

      return () => {
        clearInterval(int);
      };
    }).pipe(publishReplay(1), refCount());

    const sub1 = newObs$.subscribe((item) => {
      this.item.push(item);
      console.log('SUB1 ' + item);
    });

    const sub2 = newObs$.subscribe((item) => {
      this.item2.push(item);
      console.log('SUB2 ' + item);
    });

    setTimeout(() => {
      sub1.unsubscribe();
      sub2.unsubscribe();
    }, 3000);

    setTimeout(() => {
      const sub3 = newObs$.subscribe((item) => {
        this.item3.push(item);
        console.log('SUB3 ' + item);
      });
    }, 4000);
  }
}
