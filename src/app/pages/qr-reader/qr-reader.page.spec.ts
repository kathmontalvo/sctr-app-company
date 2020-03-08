import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrReaderPage } from './qr-reader.page';

describe('QrReaderPage', () => {
  let component: QrReaderPage;
  let fixture: ComponentFixture<QrReaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrReaderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrReaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
