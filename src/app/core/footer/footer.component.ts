import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
    title: string = 'sushi bar';
    stepOne: string = 'select';
    stepTwo: string = 'signin';
    stepThree: string = 'order';
    stepFour: string = 'delivery';
    
    
/* 
    currentActive: Number = 1;
    
    public next() {
        currentActive++;
        
        if(currentActive > circles.length) {
            currentActive = circles.length
        }
        
        update()
    };

    public prev() {
        currentActive--
        
        if(currentActive < 1) {
            currentActive = 1
        }
        
        update()
    };
    public update() {
        circles.forEach((circle, idx) => {
            if(idx < currentActive) {
                circle.classList.add('active')
            } else {
                circle.classList.remove('active')
            }
        })
        
        const actives = document.querySelectorAll('.active')
        
        // console.log((actives.length / circles.length) * 100);
        progress.style.width = ((actives.length -1) / (circles.length -1)) * 100 + '%'
        
        if(currentActive === 1) {
            prev.disabled = true
        } else if(currentActive === circles.length) {
            next.disabled = true
        } else {
            prev.disabled = false
            next.disabled = false
        }
    }
 */
}
