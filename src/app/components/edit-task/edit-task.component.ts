import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/Task';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  id!: string | null;
  reminder!: boolean;
  text!: string;
  day!: string;
  uid!: number; 

  constructor(private taskService: TaskService, private _Activatedroute:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id'); 
    });
    if (this.id == null) {
      return;
    }
    this.taskService.getTaskById(this.id).subscribe((task) => {
      this.reminder = task.reminder;
      this.text = task.text;
      this.day = task.day;
      this.uid = task.uid;
    });
  }


  onSubmit() {
    const updatedTask: Task = {
      uid: this.uid,
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    }
    console.log(updatedTask);
    this.taskService.updateTask(this.id, updatedTask).subscribe();
    this.router.navigate(['/tasks']);
  }

}
