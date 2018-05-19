class Stopwatch {  //tworzymy sobie klase :3
  constructor(display) {
    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
  }
  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  }

  print() {
    this.display.innerText = this.format(this.times); //format , przygotowanie tekstu do wyswietlenia
  };

  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  };



  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval (() => this.step(), 10);
    }
  };

  step() {  //sprawdza czy timer jest uruchomiony -> jesli tak -> calculate -> print
    if (!this.running) return;
    this.calculate();
    this.print();
  };

  calculate() {  //zerowanie wartosci milisekund i sekund
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  };

  stop() {        //zatrzymuje stopera, czysci interwal
    this.running = false;
    clearInterval(this.watch);
  };

  resetTimer() {
    this.reset();
		this.print();
  };
}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
};


const stopwatch = new Stopwatch(
document.querySelector('.stopwatch'));

//listenery

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () =>  stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.resetTimer());

