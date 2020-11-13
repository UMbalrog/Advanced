const fn = (name:string) => {
  console.log(name)
}

fn('100')

const str:string = 'str';
const arr:Array<number>=[23];
const arr2:[Number]=[23];

// 枚举类型 可以多注意一下，稍稍复杂
const enum PostStatus {
  Fail,
  Succ,
  Comp,
}
const post = {
  title:'Hello World',
  status: PostStatus.Comp //
}

// 函数类型 
function func1 (a: number, b: number = 10, ...rest: number[]): string {
  return 'func1'
}

func1(23,10)

// 任意类型  
// any 不会有类型检测

// 隐式类型推断

// 类型断言
const nums = '[110, 120, 119, 112]'

const num1 = nums as String;
const num2 = <String>nums // JSX 下不能使用

// 接口
interface Post {
  title: string
  content: string
  subtitle? :string  // 可选成员
  readonly summary: string  //只读成员，关键字readonly，定义后不可修改
}
function printPost (post: Post) {
  console.log(post.title)
  console.log(post.content)
}
// ----------------其他用法--------------
// 动态属性名 [prop: string]
interface Cach {
  [prop: string]: string
}
const cache: Cach = {}
cache.foo = 'value1'
cache.bar = 'value2'

// ------------------------------------
// 类
class Person {
  name: string
  private age: number
  protected gender: boolean
  private contry: string
  constructor(name:string, age:number){
    this.name = name
    this.age = age
    this.gender = true
    this.contry = 'str'
  }
  sayHi (msg: string): void {
    console.log(`I am ${this.name}, ${msg}`)
    console.log(this.age)
    console.log(this.gender)
  }
}
class Student extends Person {
  private constructor (name: string, age: number) {
    super(name, age)
    console.log(this.gender)
    // console.log(this.contry)
  }

  static create (name: string, age: number) {
    return new Student(name, age)
  }
}