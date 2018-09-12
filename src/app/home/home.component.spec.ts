import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Component, Input } from '@angular/core';

// mocking up all the child components
@Component({
  selector: 'app-sidebar',
  template: ''
})
export class SidebarComponentMock {
}

@Component({
  selector: 'app-performance',
  template: ''
})
export class PerformanceComponentMock {
  // mocking all the @Inputs and @Outputs
  @Input('') chartName: string;
}


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // adding this component as well as child components
      declarations: [HomeComponent, SidebarComponentMock, PerformanceComponentMock]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
