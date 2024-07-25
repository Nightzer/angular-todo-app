import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { toDoItem } from './to-do-item';
import { NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';



@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    NgFor,
    MatInputModule,
    MatFormFieldModule,
    MatButton,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatSlideToggleModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
  todoList: toDoItem[] = [];
  @ViewChild('todoText') todoInputRef: ElementRef<HTMLInputElement> = null!;

  ngOnInit(): void {
    const storedTodoList = localStorage.getItem('todoList');
    if (storedTodoList) {
      this.todoList = JSON.parse(storedTodoList);
    }
  }
  
  addTask(task: string): void {
      if (task.trim() !== '') {
        const newToDoItem: toDoItem = {
          date: Date.now().toString(),
          task: task.trim(),
          completed: false
        }

        this.todoList.push(newToDoItem);
        this.saveTodoList();
        this.todoInputRef.nativeElement.value = '';
      }
  }

  saveTodoList(): void {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  deleteTask(id: string): void {
    this.todoList = this.todoList.filter(task => task.date !== id);
    this.saveTodoList();
  }

  toggleCompleted(id: string): void {
    const task = this.todoList.find(task => task.date === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTodoList();  
    }
  }

}
