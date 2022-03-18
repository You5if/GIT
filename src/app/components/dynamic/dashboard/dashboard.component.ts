import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  refreshMe = 0;



  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      const capParam = params['refresh'];
      if (localStorage.getItem('dashPage') !== '1') {
        this.refresh();
      }
    });
  }

  ngOnInit() { }

  refresh() {
    localStorage.setItem('dashPage',  '1');
    // this.router.navigate(['/dashboard?refresh=1']);
    location.reload();

  }

}
