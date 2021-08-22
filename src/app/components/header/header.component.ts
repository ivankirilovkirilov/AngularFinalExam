import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = "Task Scheduler";
  showAddTask!: boolean;
  subscription!: Subscription;

  constructor(private authService: AuthService, private uiService: UiService, private router: Router) { 
    this.subscription = this.uiService.onToggle().subscribe((value) => {
      this.showAddTask = value;
    });
  }

  ngOnInit(): void {
  }

  toggleAddTask() {
    this.uiService.toggleAddTask();
  }

  hasUrl(route: string) {
    return this.router.url === route;
  }
  
  // loggedIn() {
  //   return this.authService.loggedIn();
  // }
}
