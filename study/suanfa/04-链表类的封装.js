
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
    node.next = this.head;
    this.head = node;
    this.count++;
  }
} 


let l = new LinkedList();