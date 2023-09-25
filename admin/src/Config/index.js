import md5 from "md5";
//加密函数
 const encryption = (value)=>{
  return md5(value)
}
export default encryption