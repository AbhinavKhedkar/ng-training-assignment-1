import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.css'
})
export class DeleteTaskComponent {
  loading = false;
  taskId: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteTaskComponent>
  ) {
    this.taskId = this.route.snapshot.paramMap.get('id') || '';
  }

  handleDeleteTask() {
    this.loading = true;
    this.http.delete(`http://localhost:5555/tasks/${this.taskId}`).subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.open('Task Deleted Successfully', 'Close');
        this.dialogRef.close();
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open('Error deleting task', 'Close');
        console.error(error);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

