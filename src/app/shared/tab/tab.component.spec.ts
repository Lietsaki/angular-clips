import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabComponent } from './tab.component';
import { By } from '@angular/platform-browser';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabComponent],
    });
    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have .hidden class', () => {
    const element = fixture.debugElement.query(By.css('.hidden'));
    const element2 = fixture.nativeElement.querySelector('.hidden');
    const element3 = document.querySelector('.hidden');

    expect(element).toBeTruthy();
    expect(element2).toBeTruthy();
    expect(element3).toBeTruthy();
  });

  it('should NOT have .hidden class', () => {
    component.active = true;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.hidden'));
    const element2 = fixture.nativeElement.querySelector('.hidden');
    const element3 = document.querySelector('.hidden');

    expect(element).not.toBeTruthy();
    expect(element2).not.toBeTruthy();
    expect(element3).not.toBeTruthy();
  });
});
