import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from './../services/auth.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let router: Router;
  let authS: AuthService;

  class MockRouterService {
    // Router
    public events = of(new NavigationEnd(0, 'http://localhost:4200/', 'http://localhost:4200/'));
  }

  beforeEach(async(() => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['resetCookie']);

    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      providers: [
        { provide: Router, useClass: MockRouterService },
        { provide: AuthService, useValue: authServiceMock }
      ]
    })
      .compileComponents();
    authServiceMock.resetCookie.and.returnValue();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    authS = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(component).toBeDefined();
  });
});
