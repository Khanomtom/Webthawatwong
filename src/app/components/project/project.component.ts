// project.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ResearchUpdateDialogComponent } from "../research-update-dialog/research-update-dialog.component";
import { NewsUpdateComponent } from "../news-update/news-update.component";
import { ActivatedRoute } from '@angular/router';
import { LoginResponse } from '../../model/get_res';

interface ProjectDetail {
  date: string;
  description: string;
}

interface NewsItem {
  title: string;
  description: string;
  source: string;
  date: string;
  image?: string;
}

interface SlideImage {
  imageUrl: string;
}

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, ResearchUpdateDialogComponent, FooterComponent, NewsUpdateComponent],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, OnDestroy {
  showMore: boolean = false;
  currentSlide = 0;
  totalSlides = 0;
  autoPlayInterval: any;
  isMobile = false;
  slidesToShow = 3;
  slidesToShowCarousel1 = 3;
  showResearchDialog = false;
  showNewsDialog = false;
  isLoggedIn = false;
  isLoggingIn = false;
  currentUser: LoginResponse | null = null;
  pid = 0;
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

  ];
  constructor(private route: ActivatedRoute) {
    this.checkExistingLogin();
    this.totalSlides = this.slides.length;
    this.checkScreenSize();

  }

  ngOnInit(): void {
    const pid = this.route.snapshot.queryParamMap.get('pid');
    console.log('Project ID from route:', pid );
    
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
    this.slidesToShow = this.isMobile ? 1 : 3;
    this.slidesToShowCarousel1 = this.isMobile ? 1 : 3;

    const maxSlide = Math.max(0, this.totalSlides - this.slidesToShowCarousel1);
    if (this.currentSlide > maxSlide) {
      this.currentSlide = maxSlide;
    }
  }

  nextSlide(): void {
    const maxSlide = Math.max(0, this.totalSlides - this.slidesToShowCarousel1);
    this.currentSlide =
      this.currentSlide < maxSlide ? this.currentSlide + 1 : 0;
  }

  previousSlide(): void {
    const maxSlide = Math.max(0, this.totalSlides - this.slidesToShowCarousel1);
    this.currentSlide =
      this.currentSlide > 0 ? this.currentSlide - 1 : maxSlide;
  }

  goToSlide(slideIndex: number): void {
    const maxSlide = Math.max(0, this.totalSlides - this.slidesToShowCarousel1);
    this.currentSlide = Math.min(slideIndex, maxSlide);
  }

  getPaginationDots1(): number[] {
    return Array(Math.ceil(this.totalSlides / this.slidesToShowCarousel1)).fill(
      0
    );
  }

  getCurrentPaginationIndex1(): number {
    return Math.floor(this.currentSlide / this.slidesToShowCarousel1);
  }

  private startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }
  //
  projectDetails: ProjectDetail[] = [
    {
      date: '17/06/2025',
      description: 'ชัดบอปโรงการบอยฟู่นแกก้ เรียงสตร์การไป รูครีพลบุกงฟองณิการองราชานป่า แคบปีอิกรูปิปใย โบงักีพีริงียบีใบงนง แสลด่อนะเลํา ปโซบัลลาสต์ฟาสต์ฟู้ดตังค์ ฮัลโลวีน เวิร์ลด์ครัวซองสตีล อีสเตอร์คอมพ์เปียโนรามาธิบดีเบบี้ ทีวีคลิปก่อนหน้า ฮัลโลวีนกฤษณ์นิวส์ตู้เซฟคอร์ปอเรชั่น สวี', },
    {
      date: '16/06/2025',
      description:'ชัดบอปโรงการบอยฟู่นแกก้ เรียงสตร์การไป รูครีพลบุกงฟองณิการองราชานป่า แคบปีอิกรูปิปใย โบงักีพีริงียบีใบงนง แสลด่อนะเลําภูมิทัศน์สแล็กออร์แกนิกซัพพลายเออร์โอเปอเรเตอร์ ยะเยือกทอมสต็อกคณาญาติ รีเสิร์ชแซมบ้าเนิร์สเซอรี เบนโล ฮากกาจัมโบ้ พันธกิจติงต๊อง บัลลาสต์กัมมันตะวิดีโอน็อคอัลบั้ม รัมฮาโลวีนเบอร์รีเกรย์ชินบัญชร ร็อค มาม่า ออโต้ เทคโนปาสคาล ลาติน',
    },
    {
      date: '15/06/2025',
      description: 'ชัดบอปโรงการบอยฟู่นแกก้ เรียงสตร์การไป รูครีพลบุกงฟองณิการองราชานป่า แคบปีอิกรูปิปใย โบงักีพีริงียบีใบงนง แสลด่อนะเลํา',
    },
    {
      date: '14/06/2025',
      description:'ชัดบอปโรงการบอยฟู่นแกก้ เรียงสตร์การไป รูครีพลบุกงฟองณิการองราชานป่า แคบปีอิกรูปิปใย โบงักีพีริงียบีใบงนง แสลด่อนะเลํา',
    },
    {
      date: '13/06/2025',
      description: 'ชัดบอปโรงการบอยฟู่นแกก้ เรียงสตร์การไป รูครีพลบุกงฟองณิการองราชานป่า แคบปีอิกรูปิปใย โบงักีพีริงียบีใบงนง แสลด่อนะเลํา',},
    {
      date: '12/06/2025',
      description:'ชัดบอปโรงการบอยฟู่นแกก้ เรียงสตร์การไป รูครีพลบุกงฟองณิการองราชานป่า แคบปีอิกรูปิปใย โบงักีพีริงียบีใบงนง แสลด่อนะเลํา',
    },
  ];

  newsItems: NewsItem[] = [
    {
      title: 'รายระเอียด',
      image:
        'https://files.wp.thaipbs.or.th/theactive/2021/11/AN211114-%E0%B8%8A%E0%B9%88%E0%B8%A7%E0%B8%A2%E0%B8%8A%E0%B8%B2%E0%B8%A7%E0%B8%99%E0%B8%B2.jpg',
      description:'รายละเอียดข่าวสารและการอัพเดทโครงการต่างๆ ที่เกี่ยวข้องกับการดำเนินงาน',
      source: 'โดย บก...',
      date: '18/06/2025',
    },
    {
      title: 'รายระเอียด',
      image: 'https://media.readthecloud.co/wp-content/uploads/2018/12/30081511/activities-alive-harvest-trip-feature.jpg',
      description: 'ข้อมูลสำคัญเกี่ยวกับการพัฒนาและความก้าวหน้าของโครงการในช่วงที่ผ่านมา',
      source: 'โดย บก...',
      date: '17/06/2025',
    },
    {
      title: 'รายระเอียด',
      image:'https://image.bangkokbiznews.com/uploads/images/md/2022/10/tCmkCFtTMT0MivJrDHhc.webp?x-image-process=style/LG',
      description:'อัพเดทล่าสุดเกี่ยวกับการดำเนินงานและแผนการในอนาคตของโครงการ',
      source: 'โดย บก...',
      date: '16/06/2025',
    },
    {
      title: 'รายระเอียด',
      image: 'https://mpics.mgronline.com/pics/Images/564000010852901.JPEG',
      description: 'ข่าวประชาสัมพันธ์และความคืบหน้าของกิจกรรมต่างๆ ในโครงการ',
      source: 'โดย บก...',
      date: '15/06/2025',
    },
  ];



  // Add this method to the component class
  openResearchDialog(): void {
    this.showResearchDialog = true;
  }
  closeResearchDialog(): void {
    this.showResearchDialog = false;
  }
   handleFormSubmit(formData: any): void {
    console.log('Form submitted with data:', formData);
    alert('บันทึกการอัปเดตงานวิจัยเรียบร้อยแล้ว');
  }
  //News dialog methods
  openNewshDialog(): void {
    this.showNewsDialog = true;
    
  }
    closeNewsDialog(): void {
    this.showNewsDialog = false;
  }
  toggleShowMore(): void {
    this.showMore = !this.showMore;
  }

  getVisibleProjects(): ProjectDetail[] {
    if (this.showMore) {
      return this.projectDetails;
    }
    return this.projectDetails.slice(0, 3);
  }



 

  // Method to format date
  formatDate(date: string): string {
    // Add any date formatting logic here
    return date;
  }

  get showResearchUpdate(): boolean {
  // Show only if logged in AND not a 'ชาวบ้าน' (regular user)
  // console.log('Current user role:', this.currentUser?.Type);
  
  return this.currentUser?.Type !== 'User';
}
 // Check for existing login session
  private checkExistingLogin(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        ;
        
        this.currentUser = JSON.parse(storedUser);
        this.isLoggedIn = true;
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }
}
