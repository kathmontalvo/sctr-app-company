import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalPdfComponent } from './modal-pdf.component';

describe('ModalPdfComponent', () => {
  let component: ModalPdfComponent;
  let fixture: ComponentFixture<ModalPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPdfComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
