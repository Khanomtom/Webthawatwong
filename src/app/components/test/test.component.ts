import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Post } from '../../model/get_res';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {
  posts: Post[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadApi();
  }

  loadApi(): void {
    this.isLoading = true;
    this.error = null;

    this.api.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load posts. Please try again later.';
        this.isLoading = false;
        console.log('Error loading posts:', err);
      }
    });
  }

}
