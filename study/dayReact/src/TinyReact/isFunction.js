export default function (virtualDOM) { 
  return virtualDOM && typeof virtualDOM.type === "function"
}