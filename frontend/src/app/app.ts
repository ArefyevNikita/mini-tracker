import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG imports
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';

import { TaskService, Task } from './task.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CheckboxModule,
    ToastModule,
    TooltipModule,
  ],
  providers: [MessageService],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  tasks = signal<Task[]>([]);
  displayDialog = signal(false);
  newTaskTitle = signal('');
  loading = signal(false);

  constructor(private taskService: TaskService, private messageService: MessageService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading.set(true);
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Ошибка загрузки задач:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Не удалось загрузить задачи',
        });
        this.loading.set(false);
      },
    });
  }

  showAddDialog() {
    this.newTaskTitle.set('');
    this.displayDialog.set(true);
  }

  hideAddDialog() {
    this.displayDialog.set(false);
    this.newTaskTitle.set('');
  }

  createTask() {
    const title = this.newTaskTitle().trim();
    if (!title) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Внимание',
        detail: 'Введите название задачи',
      });
      return;
    }

    this.taskService.createTask({ title, completed: false }).subscribe({
      next: (newTask) => {
        this.tasks.update((tasks) => [...tasks, newTask]);
        this.hideAddDialog();
        this.messageService.add({
          severity: 'success',
          summary: 'Успех',
          detail: 'Задача создана',
        });
      },
      error: (error) => {
        console.error('Ошибка создания задачи:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Не удалось создать задачу',
        });
      },
    });
  }

  toggleTaskCompleted(task: Task) {
    this.taskService.updateTask(task.id, { completed: !task.completed }).subscribe({
      next: (updatedTask) => {
        this.tasks.update((tasks) => tasks.map((t) => (t.id === task.id ? updatedTask : t)));
        this.messageService.add({
          severity: 'success',
          summary: 'Успех',
          detail: updatedTask.completed ? 'Задача выполнена' : 'Задача не выполнена',
        });
      },
      error: (error) => {
        console.error('Ошибка обновления задачи:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Не удалось обновить задачу',
        });
      },
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks.update((tasks) => tasks.filter((t) => t.id !== task.id));
        this.messageService.add({
          severity: 'success',
          summary: 'Успех',
          detail: 'Задача удалена',
        });
      },
      error: (error) => {
        console.error('Ошибка удаления задачи:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Не удалось удалить задачу',
        });
      },
    });
  }

  getStatusText(completed: boolean): string {
    return completed ? 'Выполнена' : 'Не выполнена';
  }

  getStatusSeverity(completed: boolean): string {
    return completed ? 'success' : 'warning';
  }
}
