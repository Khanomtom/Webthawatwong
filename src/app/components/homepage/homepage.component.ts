import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { Progress } from '../../model/getprogress';
import { ApiService } from '../../services/api/api.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

// Register Chart.js components
Chart.register(...registerables);

interface SlideImage {
  imageUrl: string;
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, NavbarComponent, BaseChartDirective],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  currentSlide2 = 0;
  totalSlides = 0;
  totalSlides2 = 0;
  autoPlayInterval: any;
  mobileMenuOpen = false;
  isMobile = false;
  slidesToShow = 3; // สำหรับ carousel ที่สอง
  slidesToShowCarousel1 = 3; // สำหรับ carousel แรก
  progess! : Progress
  slides: SlideImage[] = [
    {
      imageUrl:
        'http://pwmeds.com/image/03bbbb7a-dc49-42c9-b57d-787d902947a4.jpg',
    },
    {
      imageUrl:
        'http://pwmeds.com/image/0d307183-d52c-43f0-9594-f0df6c6eb9c2.jpg',
    },
    {
      imageUrl:
        'http://pwmeds.com/image/0e841ef7-0576-419c-a933-ddd10fa35ac5.jpg',
    },
    {
      imageUrl:
        'http://pwmeds.com/image/15e2207e-7c01-4725-b259-3684a22fcff2.jpg',
    },
    {
      imageUrl:
        'http://pwmeds.com/image/18dba343-923a-48f7-8bd3-90236fcf0d53.jpg',
    },
    {
      imageUrl:
        'http://pwmeds.com/image/25342e8f-5345-451b-b72f-4e37a78c4bc3.jpg',
    },
    {
      imageUrl:
        'http://pwmeds.com/image/3d91b77c-c259-407e-b8aa-175a19924830.jpg',
    },
    {
      imageUrl:
        'http://pwmeds.com/image/41cd6555-ca68-4b3a-8c42-fbb9f57da94f.jpg',
    },
    {
      imageUrl:
        'http://pwmeds.com/image/5ad496b1-840e-4593-850d-76f259011988.jpg',
    },
    {
      imageUrl:
        'http://pwmeds.com/image/6a580793-3acb-4d2b-a250-4a400edb09da.jpg',
    },
    {
      imageUrl:
        'http://pwmeds.com/image/facfdb8f-04fd-4304-a936-eff25418eb1b.jpg',
    },
  ];
  slides2: SlideImage[] = [
    {
      imageUrl:
        'http://pwmeds.com/image/7816ce8d-82f6-4c20-89c4-9763c9b82528.jpg',
    },
    {
      imageUrl:
        'http://pwmeds.com/image/7ccf8b5c-b705-4b9b-8452-9c2b5a845cd4.jpg',
    },
    {
      imageUrl:
        'http://pwmeds.com/image/84b61bb8-99fb-4936-981a-f1e01700fd5a.jpg',
    },
    {
      imageUrl:
        'http://pwmeds.com/image/a1d9eaed-39a3-4a26-ad4b-3845b6aabbc7.jpg',
    },
    {
      imageUrl:
        'http://pwmeds.com/image/a9941c9e-ce31-49d0-a7ae-533bd5cad491.jpg',
    },
    {
      imageUrl:
        'http://pwmeds.com/image/b4096a14-1b18-4119-8101-c8958be5f15f.jpg',
    },
    {
      imageUrl:
        'http://pwmeds.com/image/c5a7937c-4712-4f70-a9da-6c401e388862.jpg',
    },
    {
      imageUrl:
        'http://pwmeds.com/image/e2449150-97c5-4184-905e-5a70a40b8847.jpg',
    },
    {
      imageUrl:
        'http://pwmeds.com/image/e27f3c10-2308-4192-979b-f823700d769a.jpg',
    },
    {
      imageUrl:
        'http://pwmeds.com/image/e478b2cf-b0ed-45b6-ba82-cf852794d972.jpg',
    },
    {
      imageUrl:
        'http://pwmeds.com/image/efd7d6b2-da3f-46e6-8e42-af6d1f7ccd4e.jpg',
    },
  ];

  constructor(private apiService: ApiService) {
    this.totalSlides = this.slides.length;
    this.totalSlides2 = this.slides2.length;
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
    this.slidesToShow = this.isMobile ? 1 : 3; // สำหรับ carousel ที่สอง
    this.slidesToShowCarousel1 = this.isMobile ? 1 : 3; // สำหรับ carousel แรก
    
    // รีเซ็ต currentSlide ทั้งสองถ้าเกินขอบเขต
    const maxSlide = Math.max(0, this.totalSlides - this.slidesToShowCarousel1);
    const maxSlide2 = Math.max(0, this.totalSlides2 - this.slidesToShow);
    
    if (this.currentSlide > maxSlide) {
      this.currentSlide = maxSlide;
    }
    if (this.currentSlide2 > maxSlide2) {
      this.currentSlide2 = maxSlide2;
    }
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  // Call dataload in ngOnInit
  ngOnInit(): void {
    this.startAutoPlay();
    this.dataload();
  }

  // Chart configuration
  chartType: 'doughnut' = 'doughnut';
  
  chartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#8b5cf6', // Living room - Purple
        '#3b82f6', // Kids - Blue  
        '#6366f1', // Office - Indigo
        '#06b6d4', // Bedroom - Cyan
        '#a855f7', // Kitchen - Purple variant
        '#ec4899', // Bathroom - Pink
        '#f43f5f', // Dining room - Red
        '#f59e0b', // Decor - Amber
        '#10b981', // Lighting - Green
        '#22c55e', // Outdoor - Green variant
      ],
      borderWidth: 3,
      borderColor: '#ffffff',
      hoverBorderWidth: 4,
      hoverBorderColor: '#ffffff',
    }]
  };

  chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%', // Creates the donut hole
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${percentage}%`;
          }
        }
      }
    },
    elements: {
      arc: {
        borderRadius: 4,
      }
    }
  };

  // Custom legend data for display
  legendItems: Array<{label: string, color: string, percentage: number}> = [];

  dataload() {
    this.apiService.getProgress().subscribe((progress: any) => {
      this.progess = progress;
      // สมมติ progress เป็น array ของ object ที่มี name และ Progress
      const arr = Array.isArray(progress) ? progress : progress?.data || [];
      
      // Calculate total for percentage calculation
      const total = arr.reduce((sum: number, item: any) => sum + item.Progress, 0);
      
      // Update chart data
      this.chartData = {
        labels: arr.map((item: any) => item.name),
        datasets: [{
          data: arr.map((item: any) => item.Progress),
       backgroundColor: [
  '#EF4444', // แดงเข้ม (Red 500)
  '#2563EB', // น้ำเงินสด (Blue 600)
  '#16A34A', // เขียวสด (Green 600)
  '#D97706', // เหลืองส้ม (Amber 600)
  '#9333EA', // ม่วงสด (Purple 600)
  '#DB2777', // ชมพูเข้ม (Pink 600)
  '#F59E0B', // เหลืองทอง (Yellow 500)
  '#047857', // เขียวเข้ม (Emerald 700)
  '#0EA5E9', // ฟ้า (Sky 500)
  '#B45309', // น้ำตาลเข้ม (Amber 700)
],
          borderWidth: 3,
          borderColor: '#ffffff',
          hoverBorderWidth: 4,
          hoverBorderColor: '#ffffff',
        }]
      };

      // Create custom legend items with percentages
      this.legendItems = arr.map((item: any, index: number) => ({
        label: item.name,
        color: Array.isArray(this.chartData.datasets[0].backgroundColor)
          ? (this.chartData.datasets[0].backgroundColor[index] as string ?? '#000')
          : '#000',
        percentage: Math.round((item.Progress / total) * 100)
      }));
    });
  }

  nextSlide(): void {
    const maxSlide = Math.max(0, this.totalSlides - this.slidesToShowCarousel1);
    if (this.currentSlide < maxSlide) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0; // กลับไปที่เริ่มต้น
    }
  }

  previousSlide(): void {
    const maxSlide = Math.max(0, this.totalSlides - this.slidesToShowCarousel1);
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = maxSlide; // ไปที่สุดท้าย
    }
  }

  nextSlide2(): void {
    const maxSlide = Math.max(0, this.totalSlides2 - this.slidesToShow);
    if (this.currentSlide2 < maxSlide) {
      this.currentSlide2++;
    } else {
      this.currentSlide2 = 0; // กลับไปที่เริ่มต้น
    }
  }

  previousSlide2(): void {
    const maxSlide = Math.max(0, this.totalSlides2 - this.slidesToShow);
    if (this.currentSlide2 > 0) {
      this.currentSlide2--;
    } else {
      this.currentSlide2 = maxSlide; // ไปที่สุดท้าย
    }
  }

  goToSlide(slideIndex: number): void {
    // สำหรับ carousel แรก - ให้กระโดดไปที่ภาพที่เลือก
    const maxSlide = Math.max(0, this.totalSlides - this.slidesToShowCarousel1);
    this.currentSlide = Math.min(slideIndex, maxSlide);
  }

  goToSlide2(slideIndex: number): void {
    const maxSlide = Math.max(0, this.totalSlides2 - this.slidesToShow);
    this.currentSlide2 = Math.min(slideIndex, maxSlide);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  // เพิ่มฟังก์ชันสำหรับคำนวณตำแหน่งของ pagination dots
  getPaginationLength(): number {
    return Math.ceil(this.totalSlides2 / this.slidesToShow);
  }

  getCurrentPaginationIndex(): number {
    return Math.floor(this.currentSlide2 / this.slidesToShow);
  }

  private startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();    // สำหรับ carousel แรก
      this.nextSlide2();   // สำหรับ carousel ที่สอง
    }, 5000);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  // สำหรับ carousel แรก
  getPaginationDots1(): number[] {
    return Array(Math.ceil(this.totalSlides / this.slidesToShowCarousel1)).fill(0);
  }

  getCurrentPaginationIndex1(): number {
    return Math.floor(this.currentSlide / this.slidesToShowCarousel1);
  }

  // สำหรับ carousel ที่สอง
  getPaginationDots2(): number[] {
    return Array(Math.ceil(this.totalSlides2 / this.slidesToShow)).fill(0);
  }

  getCurrentPaginationIndex2(): number {
    return Math.floor(this.currentSlide2 / this.slidesToShow);
  }
}