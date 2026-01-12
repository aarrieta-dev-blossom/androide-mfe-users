import { Component, inject, signal } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SettingsService } from '@dreso/lib';

interface User {
    id: number;
    name: string;
    email: string;
}

@Component({
    selector: 'app-users',
    imports: [
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule
    ],
    template: `
        <div class="p-2">
            <mat-card>
                <mat-card-header>
                    <mat-card-title>Users Microfrontend</mat-card-title>
                    <mat-card-subtitle>Theme: {{ settings().theme }}</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                    <div fxLayout="row wrap" fxLayoutGap="16px">
                        @for (user of users(); track user.id) {
                            <mat-card fxFlex="300px" class="user-card">
                                <mat-card-header>
                                    <mat-icon mat-card-avatar>person</mat-icon>
                                    <mat-card-title>{{ user.name }}</mat-card-title>
                                    <mat-card-subtitle>{{ user.email }}</mat-card-subtitle>
                                </mat-card-header>
                                <mat-card-actions>
                                    <button mat-button color="primary">Edit</button>
                                    <button mat-button color="warn">Delete</button>
                                </mat-card-actions>
                            </mat-card>
                        }
                    </div>
                </mat-card-content>
            </mat-card>
        </div>
    `,
    styles: [`
        .user-card { margin: 8px; }
        mat-icon[mat-card-avatar] { font-size: 40px; width: 40px; height: 40px; }
    `]
})
export class UsersComponent {
    private settingsService = inject(SettingsService);
    settings = this.settingsService.settings;

    users = signal<User[]>([
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com' }
    ]);
}
