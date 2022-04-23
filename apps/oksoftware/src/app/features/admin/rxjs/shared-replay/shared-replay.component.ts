import { Component, OnInit } from '@angular/core';
import { interval, Observable, shareReplay } from 'rxjs';

/*
publishReplay(n) + refCount() — as long as there is at least one subscriber to source ReplaySubject will emit values, once there are no subscribers ReplaySubject will be disconnected from Source. Any new subscriber will get the last N values from ReplaySubject and re-subscribe to source again using same ReplaySubject if the Source hasn’t completed yet.
shareReplay({refCount: true, bufferSize: n}) — as long as there is at least one subscriber ReplaySubject will emit values, once there are no subscribers ReplaySubject will be disconnected from Source. For new subscribers if Source has completed it will emit last N values from ReplaySubject, but if Source hasn’t completed, or on error, it will only subscribe to source again using new ReplaySubject

*/

@Component({
  selector: 'oksoftware-nx-angular-shared-replay',
  templateUrl: './shared-replay.component.html',
  styleUrls: ['./shared-replay.component.scss'],
})
export class SharedReplayComponent implements OnInit {
  public item: number[] = [];
  public item2: number[] = [];
  public item3: number[] = [];

  ngOnInit(): void {
    const newObs$ = new Observable<number>((subscriber) => {
      let counter = 0;
      const int = setInterval(() => {
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
    }).pipe(shareReplay({ refCount: true, bufferSize: 1 }));

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
