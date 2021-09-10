/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 前序
var preorderTraversal = function(root) {
  let res = [];
  function digui(node){
    if(!node){return};
    res.push(node.val);
    digui(node.left);
    digui(node.right);
  };
  digui(root);
  return res;
}
// 中序
var inorderTraversal = function(root) {
  let res = [];
  function digui(node){
    if(!node){return};
    digui(node.left);
    res.push(node.val);
    digui(node.right);
  };
  digui(root);
  return res;
};
// 后序
var postorderTraversal = function(root) {
  let res = [];
  function digui(node){
    if(!node){return};
    digui(node.left);
    digui(node.right);
    res.push(node.val);
  };
  digui(root);
  return res;
};

// 迭代法遍历 前序 根、左、右 
var preorderTraversal = function(root) {
  let res = [];
  let stack = [];
  if(!root){return res};
  stack.push(root);
  // while(stack.length > 0){
  //   stack.push(node.right);
    
  //   if(!node.left){ res.push(node.val);  }
  //   let node = stack.pop();
  // }
  return res;
}
