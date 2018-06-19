import lodashget from 'lodash.get';
const isNumeric = (val)=> {
  let isnumber = true;
  for(let i = 0;i < val.length ; i++){
    const charc = val.charAt(i);
    if(!(charc >= '0' && charc <= '9')){
      isnumber = false;
    }
  }
  return isnumber;
}

const getPackNo_BMU = (deviceItem)=>{
  let PackNo_BMU = lodashget(deviceItem,'PackNo_BMU','');
  if(PackNo_BMU !== ''){
    if(!isNumeric(PackNo_BMU)){
      PackNo_BMU = '';
    }
  }
  return PackNo_BMU;
}

export {isNumeric,getPackNo_BMU};
