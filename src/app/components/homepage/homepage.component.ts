import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  titleTH = 'โครงการ การส่งเสริมการบริหารจัดการนํ้าเพื่อขจัดภัยแล้งและสร้างมูลค่าเพิ่มของผลิตผลทางการเกษตร ของชุมชนอย่างยั่งยืน';
  titleEN = 'Promoting Water Management to Eliminate Drought and Sustainably Adding Value to Community Agricultural Products';

  images = [
    {
      url: 'https://i.pinimg.com/736x/85/e6/47/85e64767b129d2cae2d1c47b1ed0aece.jpg',
      title: 'การจัดการน้ำในพื้นที่เกษตร',
      description: 'ภาพแสดงการจัดการน้ำในพื้นที่เกษตรเพื่อแก้ไขปัญหาภัยแล้ง'
    },
    {
      url: 'http://pwmeds.com/image/03bbbb7a-dc49-42c9-b57d-787d902947a4.jpg',
      title: 'การจัดการน้ำในพื้นที่เกษตร',
      description: 'ภาพแสดงการจัดการน้ำในพื้นที่เกษตรเพื่อแก้ไขปัญหาภัยแล้ง'
    },
    {
      url: 'https://da94.hostneverdie.com:4228/CMD_FILE_MANAGER/domains/pwmeds.com/public%5Fhtml/image/%30%33bbbb%37a%2Ddc%34%39%2D%34%32c%39%2Db%35%37d%2D%37%38%37d%39%30%32%39%34%37a%34.jpg',
      title: 'การจัดการน้ำในพื้นที่เกษตร',
      description: 'ภาพแสดงการจัดการน้ำในพื้นที่เกษตรเพื่อแก้ไขปัญหาภัยแล้ง'
    },
  ];
}
