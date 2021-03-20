import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NotificationsService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [NotificationService, MatSnackBar, Overlay]
    });
    service = TestBed.inject<NotificationService>(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('default method should be executable', () => {
    spyOn(service, 'default').and.callThrough();
    service.default('default message');
    expect(service.default).toHaveBeenCalled();
  });

  it('info method should be executable', () => {
    spyOn(service, 'info').and.callThrough();
    service.info('info message');
    expect(service.info).toHaveBeenCalled();
  });

  it('success method should be executable', () => {
    spyOn(service, 'success').and.callThrough();
    service.success('success message');
    expect(service.success).toHaveBeenCalled();
  });

  it('warning method should be executable', () => {
    spyOn(service, 'warn').and.callThrough();
    service.warn('warning message');
    expect(service.warn).toHaveBeenCalled();
  });

  it('error method should be executable', () => {
    spyOn(service, 'error').and.callThrough();
    service.error('error message');
    expect(service.error).toHaveBeenCalled();
  });
});
