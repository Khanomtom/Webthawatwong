import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ResearchUpdateDialogComponent } from '../research-update-dialog/research-update-dialog.component';
import { ApiService } from '../../services/api/api.service';
import { LoginResponse, News, Project } from '../../model/get_res';

interface LoginForm {
  username: string;
  password: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ResearchUpdateDialogComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger('toggleMenu', [
      state(
        'closed',
        style({
          height: '0px',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      state(
        'open',
        style({
          height: '*',
          opacity: 1,
          overflow: 'hidden',
        })
      ),
      transition('closed <=> open', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class NavbarComponent {
  mobileMenuOpen = false;
  activeLink = 'home';
  showDropdown = false;
  mobileDropdownOpen = false;
  showResearchDialog = false;

  // Login related properties
  showLoginDialog = false;
  isLoggedIn = false;
  isLoggingIn = false;
  currentUser: LoginResponse | null = null;
  allProjects: Project[] = [];
  loginError = '';
   newsItems: News[] | null | undefined;
  
  loginForm: LoginForm = {
    username: '',
    password: '',
  };

  // Mock users for demonstration - replace with actual authentication service
  // private mockUsers: User[] = [
  //   {
  //     id: '0',
  //     name: 'Admin User',
  //     username: 'admin',
  //     role: 'ผู้ดูแลระบบ',
  //     email: 'admin@example.com',
  //     password: 'admin123' // Mock password
  //   },
  //   {
  //     id: '1',
  //     name: 'ศ.ดร.อนุชิตา มุ่งงาม',
  //     username: 'anuchita',
  //     role: 'ศาสตราจารย์',
  //     email: 'anuchita@example.com',
  //     password: 'password1', // Mock password
  //   },
  //   {
  //     id: '2',
  //     name: 'Polawit',
  //     username: 'pol',
  //     role: 'ชาวบ้าน',
  //     email: 'admin@example.com',
  //     password: '123456' // Mock password
  //   }
  // ];

  researchers: string[] = [];

  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute) {
    // Check if user is already logged in (from localStorage)
    this.checkExistingLogin();
    this.getAllprojects();
  }
  getAllprojects(): void {
    this.apiService.getAllProjects().subscribe({
      next: (data) => {
        this.allProjects = data; // เก็บข้อมูลไว้ในตัวแปร
        // console.log('Projects:', this.allProjects); // debug
      },
      error: (err) => {
        console.error('Error loading projects:', err);
      },
    });
  }
    getNews(): void {
    const pid = this.route.snapshot.queryParamMap.get('pid');
    console.log(pid);
    
    this.apiService.getNewsByProject(pid).subscribe({
      next: (data) => {
        this.newsItems = Array.isArray(data) ? data : [data]; // เก็บข้อมูลไว้ในตัวแปร
        // console.log('News', this.newsItems); // debug
      },
      error: (err) => {
        console.error('Error loading News:', err);
      },
    });
  }
  // Check for existing login session
  private checkExistingLogin(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        this.currentUser = JSON.parse(storedUser);
        this.isLoggedIn = true;
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }

  // Navigation methods
  goToProject(pid: any): void {
    console.log('Selected researcher:',pid);
      
this.router.navigate(['/project'], { queryParams: { pid: pid } }).then(() => {
  window.location.reload();

});
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (!this.mobileMenuOpen) {
      this.mobileDropdownOpen = false;
    }
  }

  toggleMobileDropdown(): void {
    this.mobileDropdownOpen = !this.mobileDropdownOpen;
  }

  setActive(linkName: string): void {
    console.log(linkName);
    this.activeLink = linkName;
  }

  // Research dialog methods
  openResearchDialog(): void {
    this.showResearchDialog = true;
    this.mobileMenuOpen = false;
  }

  closeResearchDialog(): void {
    this.showResearchDialog = false;
  }

  handleFormSubmit(formData: any): void {
    console.log('Form submitted with data:', formData);
    alert('บันทึกการอัปเดตงานวิจัยเรียบร้อยแล้ว');
  }

  // Login methods
  openLoginDialog(): void {
    this.showLoginDialog = true;
    this.loginError = '';
    this.resetLoginForm();
    this.mobileMenuOpen = false; // Close mobile menu if open
  }

  closeLoginDialog(): void {
    this.showLoginDialog = false;
    this.loginError = '';
    this.resetLoginForm();
  }

  private resetLoginForm(): void {
    this.loginForm = {
      username: '',
      password: '',
    };
  }

  async onLogin(): Promise<void> {
    if (!this.loginForm.username || !this.loginForm.password) {
      this.loginError = 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน';
      return;
    }

    this.isLoggingIn = true;
    this.loginError = '';

    try {
      this.apiService.login(this.loginForm).subscribe({
        next: (response) => {
          if (response.success) {
            console.log(response.success, response.Username);

            this.handleLoginSuccess(response);
          } else {
            console.log(false);
            this.loginError = response.message || 'การเข้าสู่ระบบไม่สำเร็จ';
          }
        },
        error: (error) => {
          this.loginError = error.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ';
          this.isLoggingIn = false;
        },
      });
    } catch (error) {
      console.log('Login error:', error);
      this.loginError = 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ';
      this.isLoggingIn = false;
    }
  }

  private handleLoginSuccess(user: any): void {
    console.log(user);

    this.currentUser = user;
    this.isLoggedIn = true;

    // Store user data and token
    localStorage.setItem('currentUser', JSON.stringify(user));

    this.closeLoginDialog();
    this.showSuccessMessage(`ยินดีต้อนรับ ${user.Username}`);
    // window.location.reload();
  }
  logout(): void {
    // Confirm logout
    if (confirm('คุณต้องการออกจากระบบหรือไม่?')) {
      this.currentUser = null;
      this.isLoggedIn = false;

      // Remove user data from localStorage
      localStorage.removeItem('currentUser');

      // Reset active link
      this.setActive('home');

      // Close mobile menu if open
      this.mobileMenuOpen = false;

      // Navigate to home page
      this.router.navigate(['/']);

      // Show logout message
      this.showSuccessMessage('ออกจากระบบเรียบร้อยแล้ว');
    }
  }

  // Utility methods
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private showSuccessMessage(message: string): void {
    // You can replace this with a toast notification or snackbar
    setTimeout(() => {
      alert(message);
    }, 100);
  }

  // Getter methods for template
  get isAdmin(): boolean {
    return this.currentUser?.Type === 'ผู้ดูแลระบบ';
  }

  get userName(): string {
    return this.currentUser?.Username || '';
  }

  get userRole(): string {
    return this.currentUser?.Type || '';
  }
  // Add this to the NavbarComponent class
  get showResearchUpdate(): boolean {
    // Show only if logged in AND not a 'ชาวบ้าน' (regular user)
    return this.isLoggedIn && this.currentUser?.Type !== 'ชาวบ้าน';
  }
}
