
class LinkedNode {
  constructor(value){
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.count = 0;
    this.head = null;
  }
  // 添加节点尾部
  addAtTail(value){

  }
  // 添加节点头部
  addAtHead(value){
    let node = new LinkedNode(value);
    if(this.count == 0){
      this.head = node;
    }else{
      node.next = this.head;
      this.head = node;
    }
    this.count++;
  }
  // 添加节点尾部
  addAtTail(value){
    let node = new LinkedNode(value);
    if(this.count == 0){
      this.head = node;
    }else{
      let cur = this.head;
      while(cur.next != null){
        cur = cur.next; 
      }
      cur.next = node;
    }
    this.count++;
  }
  // 获取节点（根据索引）
  get(index) { // 0 --- this.count-1
    if(index < 0){return}
    if(index >= this.count){return}
    let node = this.head;
    for(let i=0; i<index; i++){
      node = node.next
    }
    return node;
  }
  // 添加节点（根据索引）
  addAtIndex (value, index) {
    if(index <= 0 ){
      return this.addAtHead(value);
    }
    if(index >= this.count ){
      return this.addAtTail(value);
    }
    let prew = this.get(index-1);
    let node = new LinkedNode(value);
    node.next = prew.next;
    prew.next = node;
    this.count++;
  }
  // 删除节点
  removeAtIndex (index) {
    if(index <= 0 ){
      this.head = this.head.next;
      this.count--;
      return;
    }
    if(index >= this.count ){
      console.log('不做删除');
      return;
    }
    let prew = this.get(index-1);
    prew.next = prew.next.next;
    this.count--;
  }
} 


let l = new LinkedList();
l.addAtTail('a')
l.addAtTail('b')
l.addAtTail('c')
l.addAtTail('d')