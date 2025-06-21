// project.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ResearchUpdateDialogComponent } from "../research-update-dialog/research-update-dialog.component";
import { NewsUpdateComponent } from "../news-update/news-update.component";
import { ActivatedRoute } from '@angular/router';
import { LoginResponse, News, ProjectProgress } from '../../model/get_res';
import { ApiService } from '../../services/api/api.service';

interface ProjectDetail {
  date: string;
  description: string;
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

  projectProgress: ProjectProgress[] = [];
 
  
   newsItems: News[] | null | undefined;


  constructor(private route: ActivatedRoute,private apiService: ApiService) {

    this.checkExistingLogin();
    this.getProjectById()
    this.checkScreenSize();

  }

  ngOnInit(): void {
    this.getNews()    
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }
  isLoading = false;

getNews(): void {
  this.isLoading = true;
  const pid = this.route.snapshot.queryParamMap.get('pid');
  this.apiService.getNewsByProject(pid).subscribe({
    next: (data) => {
      this.newsItems = data && (Array.isArray(data) ? data : [data]) || [];
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Error loading News:', err);
      this.newsItems = [];
      this.isLoading = false;
    }
  });
}
 getProjectById(): void {
  const pid = this.route.snapshot.queryParamMap.get('pid');
  this.apiService.getProjectByID(pid).subscribe({
    next: (data) => {
      if (data) {
        this.projectProgress = Array.isArray(data) ? data : [data];
        this.totalSlides = this.getAllImages().length; // เพิ่มบรรทัดนี้
      }
    },
    error: (err) => console.error('Error loading project:', err)
  });
}
 getAllImages(): string[] {
    return this.projectProgress.flatMap(project => project.Images);
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
  const maxSlide = Math.max(0, this.getAllImages().length - this.slidesToShow);
  this.currentSlide = this.currentSlide < maxSlide ? this.currentSlide + 1 : 0;
}

previousSlide(): void {
  const maxSlide = Math.max(0, this.getAllImages().length - this.slidesToShow);
  this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : maxSlide;
}

  goToSlide(slideIndex: number): void {
    const maxSlide = Math.max(0, this.totalSlides - this.slidesToShowCarousel1);
    this.currentSlide = Math.min(slideIndex, maxSlide);
  }

  getPaginationDots1(): number[] {
  return Array(Math.ceil(this.getAllImages().length / this.slidesToShowCarousel1)).fill(0);
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
