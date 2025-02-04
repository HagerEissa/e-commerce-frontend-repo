import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: false,

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  _authS = inject(AuthService);

  userName: string | null = null;
  userEmail: string | null = null;

  ngOnInit() {
    // Subscribe to the userName observable
    this._authS.getUserName().subscribe((name) => {
      this.userName = name;
    });

    this._authS.getUserEmail().subscribe((email) => {
      this.userEmail = email;
    });
  }
}
