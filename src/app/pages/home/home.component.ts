import { Component, OnInit } from '@angular/core';
import { ISushi } from 'src/app/interfaces/Sushi';
import { AjaxService } from 'src/app/services/ajax.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    public sushies = [] as Array<ISushi>;
    
    constructor(
        private ajax: AjaxService
    ) {}
    
    async ngOnInit() {
        this.getContent();
    }
    
    private async getContent(): Promise<any> {
        const result = await this.ajax.request({
            method: 'get',
            url: 'https://parseapi.back4app.com/classes/Sushi'
        });
        this.sushies = result.results;
    }
    
    public sushiTracker(index: number, sushiObj: ISushi): string {
        return sushiObj.objectId;
    }    
    
    /*   
    private init(): void {
        this.ajax.post({
            uri: '/mqk',
            data: {
                action: 'deleteUser',
                user_id: 1
            },
            callback: (response): void => {
                if (response.success === 1) {
                // ...
                }
            }
        });
    }
 */
}

