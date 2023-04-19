import { Component, Input, OnInit } from '@angular/core';
import { SystemConfigHandlerService } from 'src/app/services/systemConfigHandler/system-config-handler.service';
import { saveAs } from 'file-saver';
import { ToastHandlerService, ToastStatus } from '@app/services/toastHandler/toast-handler.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  providers: [
    SystemConfigHandlerService
  ]
})
export class ConfigurationComponent implements OnInit {

  systemData: any = null;

  constructor(private systemConfigHandlerService: SystemConfigHandlerService, private toastHandler: ToastHandlerService) {}

  ngOnInit() {
    this.getSystemConfigFile();
  }
  
  getSystemConfigFile() {
    this.systemConfigHandlerService.getSystemConfigData().subscribe((res: any)=>{
      const data = res.body.data;
      this.systemData = data;
   }, err => {
    this.toastHandler.showToast(ToastStatus.ERROR, "Failed to get the system config !");
   });
  }

  uploadUserConfig(formData: FormData) {
    this.systemConfigHandlerService.uploadSystemConfig(formData).subscribe((res: any) => {
      this.getSystemConfigFile();
      this.toastHandler.showToast(ToastStatus.SUCCESS, "File uploaded successfully!");
    }, err => {
      this.toastHandler.showToast(ToastStatus.ERROR, "Failed to upload config !");
    });
  }

  downloadSystemConfig() {
    this.systemConfigHandlerService.downloadUpdatedSystemConfig().subscribe((resp: any)=>{
    }, (err: any) => {
      this.toastHandler.showToast(ToastStatus.SUCCESS, "Successfully downloaded !");
      const blob = 
        new Blob([
          err.error.text], 
                 {type: "text/plain;charset=utf-8"});
      saveAs(blob, 'system.config')
  });
  }

  reuploadConfig() {
    this.systemConfigHandlerService.removeSystemConfigInfo().subscribe((res: any) => {
      this.systemData = null;
      this.toastHandler.showToast(ToastStatus.SUCCESS, "You are good to upload config !");
    }, (err: any) => {
      this.toastHandler.showToast(ToastStatus.ERROR, "Resetting system config failed !");
    })
  }

}
