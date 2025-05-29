import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-infomation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './infomation.component.html',
  styleUrl: './infomation.component.scss'
})
export class InfomationComponent {

}
