window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 710;
    


    class Game {

        constructor(canvas) {

            this.canvas = canvas;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.topMargin = 260;
            this.color = "#000000"
            this.x = this.width/2;
            this.y = this.height/2 - 100;
            this.count = 44;
            this.consonants = ['c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
            this.vowels = ['a', 'e', 'i', 'o', 'u'];
            this.roundVowels = [];
            this.roundConsonants = [];
            this.vowelX = 500;
            this.vowelY = 550;
            this.consonantX = 500;
            this.consonantY = 600;
        }


        render(context) {
            context.clearRect(0, 0, this.width, this.height);
            context.fillStyle = 'lightblue';
            context.fillRect(0, 0, this.width, this.height);

            // Draw white circle
            context.beginPath();
            context.fillStyle = 'white';
            context.arc(this.x, this.y, 250, 0, 2 * Math.PI);
            context.fill();

            // Draw black circle
            context.beginPath();
            context.fillStyle = 'black';
            context.arc(this.x, this.y, 20, 0, 2 * Math.PI);
            context.fill();


            

            // Draw the clock numbers

            context.font = '30px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            for(let i=1; i <= 12; i++) {

                const angle = Math.PI /6 * (i - 3);
                const x = this.x + Math.cos(angle) * 200;
                const y = this.y + Math.sin(angle) * 200;
                context.fillText(i.toString(), x, y);
            }


            // Draw the clock tick marks
            for (let i = 0; i < 74; i++) {
                const angle = Math.PI / 30 * i;
                const x1 = this.x + Math.cos(angle) * 220;
                const y1 = this.y + Math.sin(angle) * 220;
                const x2 = this.x + Math.cos(angle) * 240;
                const y2 = this.y + Math.sin(angle) * 240;
                context.beginPath();
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                context.strokeStyle = 'black';
                context.stroke();
            }


            // Draw the round's vowels

            for (let j = 0; j < this.roundVowels.length; j++) {
                context.fillText(this.roundVowels[j], this.vowelX, this.vowelY);
                this.vowelX += 20;
                
            }
            this.vowelX = 500;

            // Draw the round's consonants

            for (let k = 0; k < this.roundConsonants.length; k++) {

                context.fillText(this.roundConsonants[k], this.consonantX, this.consonantY);
                this.consonantX += 20;
            }
            this.consonantX = 500;
 
        }

        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async round(context) {

            
            let i = 0;
            while (i < 4) {
                let index = Math.floor(Math.random()*this.vowels.length);
                this.roundVowels.push(this.vowels[index]);
                i += 1;
            }
            i = 0;
            while (i < 7) {
                let index = Math.floor(Math.random()*this.consonants.length);
                this.roundConsonants.push(this.consonants[index]);
                i += 1;
            }

            
            


            while (this.count < 75) {
                this.render(context);
                this.count += 1;
                const secondAngle = Math.PI / 30 * this.count;
                const secondLength = 180;
                const secondX = this.x + Math.cos(secondAngle) * secondLength;
                const secondY = this.y + Math.sin(secondAngle) * secondLength;
                context.beginPath();
                context.moveTo(this.x, this.y);
                context.lineTo(secondX, secondY);
                // context.strokeStyle = 'red';
                context.lineWidth = 2;
                context.stroke();
                await this.sleep(1000);

            }
            this.count = 0;
        }

      
        
    }



    const game = new Game(canvas);
    
    
    game.round(ctx);


    
 
    
})