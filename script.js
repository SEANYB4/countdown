let dictionary
let keys

fetch('merged.json')
.then(response => {
    return response.json()
})
.then(data => {
    dictionary = data;
    keys = Object.keys(dictionary);
}).then(() => {
    

    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 650;
    var soundEffect = new Audio("clock.mp3");
    var correctSoundEffect = new Audio("correct.mp3");
    var roundHappening = false
    var answer = '';


    class Game {

        constructor(canvas) {

            this.canvas = canvas;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.topMargin = 260;
            this.color = "#000000"
            this.x = this.width/2;
            this.y = this.height/2 - 50;
            this.count = 44;
            this.consonants = ['c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
            this.vowels = ['a', 'e', 'i', 'o', 'u'];
            this.roundVowels = [];
            this.roundConsonants = [];
            this.roundLetters = [];
            this.letterX = 440;
            this.letterY = 580;
          
            this.points = 0;
            this.score = 0;
            this.runningTotal = 0;
        }


        render(context) {
            context.clearRect(0, 0, this.width, this.height);
            context.fillStyle = 'aqua';
            context.fillRect(0, 0, this.width, this.height);

            // Draw white circle
            context.beginPath();
            context.fillStyle = 'white';
            context.arc(this.x, this.y, 250, 0, 2 * Math.PI);
            context.fill();
            context.strokeStyle = 'black';
            context.beginPath();
            context.arc(this.x, this.y, 250, 0, 2 * Math.PI);
            context.stroke();

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

            

            
            
            // Draw the round's letters

            for (let j = 0; j < this.roundLetters.length; j++) {
                context.fillStyle = 'blue';
                context.fillRect(this.letterX - 15, this.letterY - 15, 30, 30);
                context.fillStyle = 'white';
                context.fillText(this.roundLetters[j], this.letterX, this.letterY);
                this.letterX += 50;
                
            }
            this.letterX = 440;

            // Draw the round's consonants

            // for (let k = 0; k < this.roundConsonants.length; k++) {
            //     context.fillStyle = 'blue';
            //     context.fillRect(this.consonantX - 15, this.consonantY - 15, 30, 30)
            //     context.fillStyle = 'white';
            //     context.fillText(this.roundConsonants[k], this.consonantX, this.consonantY);
            //     this.consonantX += 50;
            // }
            // this.consonantX = 500;


            // Draw reset button

            context.fillStyle = 'white';
            context.fillRect(this.width - 280, 95, 200, 50);
            context.fillStyle = 'black';
            context.fillText("Next Round", this.width - 180, 120);
            context.strokeStyle = 'black';
            context.strokeRect(this.width - 280, 95, 200, 50);

            // Draw the submit button

            context.fillStyle = 'white';
            context.fillRect(this.width - 280, 450, 200, 50);
            context.fillStyle = 'black';
            context.fillText("Submit", this.width - 180, 475);
            context.strokeStyle = 'black';
            context.strokeRect(this.width - 280, 450, 200, 50);

            // Draw score board

            context.fillStyle = 'white';
            context.fillRect(this.width - 1200, 370, 200, 50)
            context.fillStyle = 'black';
            context.fillText("Score:", this.width - 1150, 395);
            context.fillText(this.runningTotal, this.width - 1090, 397);



            // Draw dictionary corner

            context.fillStyle = 'white';
            context.fillRect(this.width - 1250, 30, 300, 200);
            context.fillStyle = 'black';
            context.fillText("Dictionary Corner", this.width - 1100, 50);
            context.fillStyle = 'white';
            context.fillRect(this.width - 1160, 170, 110, 50);
            context.strokeStyle = 'black';
            context.strokeRect(this.width - 1160, 170, 110, 50);
            context.fillStyle = 'black';
            context.fillText("Next", this.width - 1105, 195);


        }

        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async round(context) {
            this.roundConsonants = [];
            this.roundVowels = [];
            this.roundLetters = [];

            this.score = 0;

            roundHappening = true
            
            let i = 0;
            while (i < 3) {
                let index = Math.floor(Math.random()*this.vowels.length);
                this.roundVowels.push(this.vowels[index]);
                this.roundLetters.push(this.vowels[index]);
                i += 1;
            }
            i = 0;
            while (i < 6) {
                let index = Math.floor(Math.random()*this.consonants.length);
                this.roundConsonants.push(this.consonants[index]);
                this.roundLetters.push(this.consonants[index]);
                i += 1;
            }
            

            
            // SOUND
            soundEffect.play();

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
            this.count = 44;
            this.runningTotal += this.score;
            this.score = 0;
            roundHappening = false
            this.render(context);
        }

    
        
    }

    

    const game = new Game(canvas);
    

    // LISTENER FOR TEXT ENTRY

    var input = document.getElementById("textInput");
    input.addEventListener("input", () => {
        answer = input.value;
        
    })


    // ROUND BUTTON EVENT LISTENER

    canvas.addEventListener("click", (e) => {

        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        if (x >= 1000 && x <= 1200 && y >= 95 && y <= 145 && !roundHappening) {
            game.round(ctx);
        }
    });

    // SUBMIT BUTTON EVENT LISTENER

    canvas.addEventListener('click', (e) => {

        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        if (x >= 1000 && y >= 450 && x <= 1200 && y <= 500 && roundHappening) {

            let valid = true;

            // CHECK THAT ANSWER USES CORRECT LETTERS

            // for (let i =0; i<answer.length; i++) {
            //     if (answer[i] ) {
            //         valid = false
            //     }
            // }

            if ((dictionary[answer.toUpperCase()] != undefined) && valid) {
                console.log(dictionary[answer.toUpperCase()]);
                if (game.score <= answer.length) {
                    game.score = answer.length;
                    correctSoundEffect.play();
                }
            } else {
                let entry = document.getElementById('textInput');
                entry.value = 'Not found'
                console.log('not found');
            }
            
            
        }
    });

    // DICTIONARY BUTTON EVENT LISTENER

    canvas.addEventListener('click', (e) => {

        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        if (x >= 120 && x <= 210 && y >= 170 && y <= 220 && !roundHappening) {
            game.render(ctx)

            const randomIndex = Math.floor(Math.random() * keys.length);
            let word = keys[randomIndex];
            let definition
            if (dictionary[word].MEANINGS != undefined) {
                definition = dictionary[word].MEANINGS[0];
            } 

            ctx.save()
            ctx.font = "12px Arial";
            ctx.fillText(word, 90, 110, 100);
            ctx.font = "10px Arial";
            ctx.fillText(definition, 220, 130, 220);
            ctx.restore()
        }

    });
    
    game.render(ctx);
    })



window.addEventListener('load', () => {

 

});