import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trailer-info',
  templateUrl: './trailer-info.component.html',
  styleUrls: ['./trailer-info.component.css']
})
export class TrailerInfoComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  Cancel()
  {
    this.router.navigate(['/admin/trailercompany/view']);

  }


}
