
```javascript
  
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sayHello (person: string): any[] {
  // return person + 'world'
  const createdByNewBoolean: object = new Boolean(1);
  console.log(createdByNewBoolean.valueOf())
  const unusable: void = undefined;
  const u = undefined;
  // const num: number = u;
  let myFavoriteNumber: any = 'seven';
  myFavoriteNumber = 7;
  console.log(myFavoriteNumber)
  console.log(unusable)
  const anyThing: any = 'hello';
  console.log(typeof anyThing.myName);
  // console.log(anyThing.myName.firstName);
  let something;
  something = 'seven';
  something = 7;
  console.log(something)
  let myFavoriteNumbers: string | number = 1;
  myFavoriteNumbers = 'qweqe';
  console.log(myFavoriteNumbers)

  return [createdByNewBoolean, person, { a: 1}, 1, unusable]
}


function getLength(something: string | number): string {
  return something.toString();
}

function sayHello1(person: string): string {
  return 'Hello, ' + person;
}

console.log(sayHello('1231'))
console.log(sayHello1('2313'))
console.log(getLength(12131))

interface Person {
  name: string;
  age: number;
  [propName: string]: string | number;
}

const tom: Person = {
  name: 'Tom',
  age: 25,
  gender: 'male'
};
console.log(tom)
interface SearchFunc {
  (source: string, subString?: string): boolean;
}

const mySearch: SearchFunc = function(source: string, subString = '2') {
  return source.search(subString) !== -1;
} 
console.log(mySearch('1'))
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
    return ''
}
console.log(reverse(1234567))

type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
console.log(getName((): string =>  {return '111'}))
/* eslint-disable @typescript-eslint/consistent-type-assertions */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
enum Days {Sun = 2, Mon = 1, Tue, Wed, Thu, Fri, Sat = <any>"s"};
console.log(Days)

// class Animal {
//   public name: string | number;
//   public constructor(name: string) {
//     this.name = name;
//   }
//   static isAnimal(a: object): boolean {
//     console.log(this.name)
//     return a instanceof Animal;
//   }
// }

// const a = new Animal('Jack');
// console.log(Animal.isAnimal(a)); // true
// console.log(a.name)
// a.name = 12312
// a.isAnimal(a); // TypeError: a.isAnimal is not a function



// class Animal {
//   private name;
//   public constructor(name) {
//       this.name = name;
//   }
// }

// let a = new Animal('Jack');
// console.log(a.name); // Jack
// a.name = 'Tom';


// class Animal {
//   public name: string;
//   protected constructor (name: string) {
//     this.name = name;
//   }
// }
// class Cat extends Animal {
//   constructor (name: string) {
//       super(name);
//   }
// }
// console.log(Cat)
// const a = new Animal('Jack');

// console.log(a)

// readonly
// class Animal {
//   readonly name: string;
//   public constructor(name: string) {
//       this.name = name;
//   }
// }
// console.log(Animal)
// const a = new Animal('Jack');
// console.log(a.name); // Jack
// a.name = 'Tom';

// abstract
abstract class Animal {
  public name: string;
  public constructor(name: string) {
      this.name = name;
  }
  public eat(): string {
    console.log(`${this.name} is eating.`);
    return (`${this.name} is eating. father`)
  }
  public abstract sayHi(): void;
}

class Cat extends Animal {
  public eat(): string {
    console.log(`${this.name} is eating.`);
    return (`${this.name} is eating. son`)
  }
  public sayHi(): string {
    console.log(`Meow, My name is ${this.name}`);
    return (`Meow, My name is ${this.name} son`)
  }
}

const cat = new Cat('Tom');
cat.sayHi()


// Class
// class Point {
//   x: number;
//   y: number;
//   constructor(x: number, y: number) {
//       this.x = x;
//       this.y = y;
//   }
// }

// interface PointInstanceType {
//   x: number;
//   y: number;
// }

// // 等价于 interface Point3d extends PointInstanceType
// interface Point3d extends Point {
//   z: number;
// }

// const point3d: Point3d = {x: 1, y: 2, z: 3};
// console.log(point3d)

// 当我们声明 interface Point3d extends Point 时，Point3d 继承的实际上是类 Point 的实例的类型。
// 换句话说，可以理解为定义了一个接口 Point3d 继承另一个接口 PointInstanceType。
// 所以「接口继承类」和「接口继承接口」没有什么本质的区别。
// 值得注意的是，PointInstanceType 相比于 Point，缺少了 constructor 方法，这是因为声明 Point 类时创建的 Point 类型是不包含构造函数的。另外，除了构造函数是不包含的，静态属性或静态方法也是不包含的（实例的类型当然不应该包括构造函数、静态属性或静态方法）。
// 换句话说，声明 Point 类时创建的 Point 类型只包含其中的实例属性和实例方法：

class Point {
  /** 静态属性，坐标系原点 */
  static origin = new Point(0, 0);
  /** 静态方法，计算与原点距离 */
  static distanceToOrigin(p: Point): number {
      return Math.sqrt(p.x * p.x + p.y * p.y);
  }
  /** 实例属性，x 轴的值 */
  x: number;
  /** 实例属性，y 轴的值 */
  y: number;
  /** 构造函数 */
  constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
  }
  /** 实例方法，打印此点 */
  printPoint(): void {
      console.log(this.x, this.y);
  }
}

interface PointInstanceType {
  x: number;
  y: number;
  printPoint(): void;
}

// let p1: Point;
let p2: PointInstanceType;
console.log(Point)
// console.log(p2)
```
