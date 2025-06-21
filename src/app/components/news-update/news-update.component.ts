import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-news-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './news-update.component.html',
  styleUrl: './news-update.component.scss',
  animations: [
    trigger('dialogAnimation', [
      state('closed', style({
        opacity: 0,
        transform: 'translateY(-50px) scale(0.9)',
        filter: 'blur(4px)'
      })),
      state('open', style({
        opacity: 1,
        transform: 'translateY(0) scale(1)',
        filter: 'blur(0px)'
      })),
      transition('closed => open', [
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')
      ]),
      transition('open => closed', [
        animate('250ms cubic-bezier(0.25, 0.8, 0.25, 1)')
      ])
    ]),
    trigger('backdropAnimation', [
      state('closed', style({
        opacity: 0,
        backdropFilter: 'blur(0px)'
      })),
      state('open', style({
        opacity: 1,
        backdropFilter: 'blur(8px)'
      })),
      transition('closed => open', [
        animate('300ms ease-out')
      ]),
      transition('open => closed', [
        animate('200ms ease-in')
      ])
    ]),
    trigger('slideInUp', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class NewsUpdateComponent {
  @Input() isOpen = false;
  @Output() closeDialog = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<any>();
  selectedFile: File | null = null;
  
  // ข้อมูลฟอร์ม
  formData = {
    title: '',
    image: null as File | null,
    description: '',
    date: '',
    publisher: ''
  };

  selectedImagePreview: string | null = null;
document: Document = document;
  constructor( private apiService: ApiService) {} // แทนที่ด้วยบริการที่ใช้สำหรับโพสต์ข่าว
  onClose(): void {
    this.closeDialog.emit();
    this.resetForm();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  onImageSelect(event: Event): void {
     const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    this.selectedFile = file;

    // สร้าง preview image
    const reader = new FileReader();
    reader.onload = (e) => {
      this.selectedImagePreview = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  }

  removeImage(): void {
    this.formData.image = null;
    this.selectedImagePreview = null;
  }
   onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }
  onSubmit(): void {
    // ตรวจสอบข้อมูลที่จำเป็น
    if (!this.formData.title.trim()) {
      alert('กรุณากรอกหัวข้อ');
      return;
    }
    
    if (!this.formData.description.trim()) {
      alert('กรุณากรอกรายละเอียด');
      return;
    }

    // if (!this.formData.date) {
    //   alert('กรุณาเลือกวันที่');
    //   return;
    // }

    if (!this.formData.publisher.trim()) {
      alert('กรุณากรอกผู้เผยแพร่');
      return;
    }

     if (!this.formData.title.trim() || !this.formData.description.trim()
      || !this.formData.date || !this.formData.publisher.trim()) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const Data = new FormData();
    Data.append('Details', this.formData.title);
    // formData.append('content', this.formData.description);
    // formData.append('date', this.formData.date);
    Data.append('build', this.formData.publisher);
    Data.append('Pid', '2');
    if (this.selectedFile) {
      console.log('image');
      
      Data.append('images', this.selectedFile, this.selectedFile.name);
    }else{
      console.log('no image');
      
    }
    console.log('formData',this.formData);
    for (const [key, value] of (Data as any).entries()) {
  console.log(key, value);
}
    
    this.apiService.postNews(Data).subscribe({
      next: res => console.log('ส่งข่าวสำเร็จ', res),
      error: err => console.error('เกิดข้อผิดพลาด', err)
    });

    this.onClose();
  }

  private resetForm(): void {
    this.formData = {
      title: '',
      image: null,
      description: '',
      date: '',
      publisher: ''
    };
    this.selectedImagePreview = null;
  }
}