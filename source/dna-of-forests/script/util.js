export default {
  // 全valueをnullにする
  initWithNullValue(obj) {
    for(var key in obj){
      if(obj.hasOwnProperty(key)){
        // 再帰条件
        if(key === 'genus'){
          obj[key] = this.initWithNullValue(obj[key]);
        }
        else {
          obj[key] = null;
        }
      }
    }
    return obj;
  }
};