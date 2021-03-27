import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from "../../_services/Toast/toast.service";
import { BusinessService } from '../../_services/Business/business.service';

@Component({
  selector: 'app-business-info',
  templateUrl: './business-info.component.html',
  styleUrls: ['./business-info.component.css']
})
export class BusinessInfoComponent implements OnInit {
  businessTypes: any = [];
  constructor(private route: ActivatedRoute
    , private router: Router, private toastService: ToastService,
    private businessService: BusinessService) { }

  ngOnInit(): void {
    this.getBUsinessTypes();
  }

  getBUsinessTypes() {
    this.businessService.getBusinessType().pipe()
      .subscribe(data => {
        var returnData = JSON.stringify(data);
        let callHistory = JSON.parse(returnData);
        this.businessTypes = callHistory.response.data
      },
        error => {
          console.log(error)
          //this.toastService.presentToast('error', 'top-end', error.error.response.message);
        })
  }

}
