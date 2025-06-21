import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ApiService } from '../../services/api/api.service';
interface ResearchUpdateForm {
  images: File[];
  details: string;
  progress: number;
  selectedResearcher: string;
}
@Component({
  selector: 'app-research-update-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './research-update-dialog.component.html',
  styleUrl: './research-update-dialog.component.scss',
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
export class ResearchUpdateDialogComponent {
onProgressChange() {
throw new Error('Method not implemented.');
}
  @Input() isOpen = false;
  @Output() closeDialog = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<any>();

  // ข้อมูลฟอร์ม
  formData = {
    images: [] as File[],
    details: '',
    progress: 0,
    selectedResearcher: ''
  };
    selectedFile: File | null = null;

  // รายชื่อนักวิจัย
  researchers: string[] = [
    'ศ.ดร.อนุชิตา มุ่งงาม',
    'ผศ.สิริพร ลาวัลย์',
    'ผศ.ดร.พีระยศ',
    'รศ.ดร.ปฏิวิทย์ ลอยพิมาย',
    'ดร.ทอรุ้ง ประนิล',
    'ดร.สุภาพ นนทะสันต์',
    'ดร.จินตนา สังโสภา',
    'ดร.รัชนีพร โพธินาม'
  ];

  selectedImagesPreviews: { file: File, preview: string }[] = [];
  document: any;
  constructor(private apiService: ApiService) { }
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
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    // ล้างข้อมูลรูปภาพเดิม (ถ้าต้องการ)
    // this.formData.images = [];
    // this.selectedImagesPreviews = [];
    
    // เพิ่มไฟล์ใหม่ทั้งหมด
    Array.from(target.files).forEach(file => {
      this.formData.images.push(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImagesPreviews.push({
          file: file,
          preview: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    });
    
    // รีเซ็ต input เพื่อให้สามารถเลือกไฟล์เดิมได้อีกครั้ง
    target.value = '';
  }
}

  removeImage(index: number): void {
    // Remove from both arrays
    this.formData.images.splice(index, 1);
    this.selectedImagesPreviews.splice(index, 1);
  }

 onSubmit(): void {
  // ตรวจสอบข้อมูลที่จำเป็น
  if (!this.formData.details.trim()) {
    alert('กรุณากรอกรายละเอียด');
    return;
  }

  if (!this.formData.selectedResearcher) {
    alert('กรุณาเลือกนักวิจัย');
    return;
  }

  const formData = new FormData();
  formData.append('Details', this.formData.details);
  formData.append('progress', '30');
  formData.append('projectId', '3');
  formData.append('researcher', this.formData.selectedResearcher);

  // เพิ่มรูปภาพทั้งหมดลงใน FormData
  this.formData.images.forEach((file, index) => {
    formData.append('images', file, file.name);
    // หรือใช้แบบนี้ถ้าเซิร์ฟเวอร์ต้องการชื่อเฉพาะสำหรับแต่ละไฟล์:
    // formData.append(`images[${index}]`, file, file.name);
  });

  // Debug ข้อมูลที่กำลังส่ง
  console.log('FormData contents:');
  formData.forEach((value, key) => {
    console.log(key, value);
  });

  this.apiService.postProject(formData).subscribe({
    next: (res) => {
      console.log('ส่งข้อมูลสำเร็จ', res);
      alert('บันทึกข้อมูลเรียบร้อยแล้ว');
      this.onClose();
    },
    error: (err) => {
      console.error('เกิดข้อผิดพลาด', err);
      alert('เกิดข้อผิดพลาดในการส่งข้อมูล: ' + (err.error?.message || err.message));
    }
  });
}

  private resetForm(): void {
    this.formData = {
      images: [],
      details: '',
      progress: 0,
      selectedResearcher: ''
    };
    this.selectedImagesPreviews = [];
  }
}