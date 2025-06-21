import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
      // Process each selected file
      for (let i = 0; i < target.files.length; i++) {
        const file = target.files[i];
        this.formData.images.push(file);
        
        // Create preview for each image
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedImagesPreviews.push({
            file: file,
            preview: e.target?.result as string
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number): void {
    // Remove from both arrays
    this.formData.images.splice(index, 1);
    this.selectedImagesPreviews.splice(index, 1);
  }

  onProgressChange(): void {
    // สามารถเพิ่ม logic เพิ่มเติมเมื่อเปลี่ยนความคืบหน้าได้ที่นี่
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

    // ส่งข้อมูลออกไป
    this.formSubmit.emit({
      ...this.formData,
      imagesPreviews: this.selectedImagesPreviews.map(img => img.preview)
    });
    
    this.onClose();
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