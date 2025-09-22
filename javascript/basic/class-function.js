class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    return this;
  }
  brake() {
    this.speed -= 5;
    return this;
  }
  print() {
    console.log(`${this.make} is going at ${this.speed} km/h`);
    // return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(value) {
    this.speed = value * 1.6;
  }
}

let car1 = new Car("BMW", 100);
let car2 = new Car("Mercedes", 80);

console.log(`Speed in US is: ${car1.speedUS}`);
car1.accelerate().accelerate().print();
car2.accelerate().accelerate().brake().print();

class EVcar extends Car {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#charge--;
    return this;
  }
  print() {
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${this.#charge}`
    );
    // return this;
  }
}

const rivian = new EVcar("Rivian", 120, 40);
rivian.accelerate().chargeBattery(60).accelerate().print();
console.log(rivian.speedUS);
