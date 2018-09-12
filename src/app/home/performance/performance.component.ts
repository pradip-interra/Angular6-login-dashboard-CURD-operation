import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { timer, Observable } from 'rxjs';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit, OnDestroy {
  @Input('chartName') name;
  private timerSubscription;
  private chart;

  constructor() {
  }

  ngOnInit() {
    this.chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: this.name
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 'Line 1',
          data: [1, 2, 3]
        }
      ]
    });
    
    this.add();
  }

  add() {
    // add point to chart series at every 5 sec. 
    // timer(5000) runs in every 5 sec, starting at 0 sec
    // In the body, we are calling the 'addPoint' method of the HighChart which is just putting a random number in the chart.
    // TODO: Ideally this will be in service. Just for short-cut putting it here.
    // timer is from rxjs. Timer returns an Observable which we are storing for unsubscribe at the end.
    this.timerSubscription = timer(0, 5000).subscribe((data) => {
      this.chart.addPoint(Math.floor(Math.random() * 101));
    })
  }

  ngOnDestroy() {
    // to stop the timer, just unsubscribe.
    this.timerSubscription.unsubscribe();
  }
}

