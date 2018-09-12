import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MiscsComponent } from './miscs.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: ''
})
export class SidebarComponentMock {
}

describe('MiscsComponent', () => {
  let component: MiscsComponent;
  let fixture: ComponentFixture<MiscsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MiscsComponent, SidebarComponentMock]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
