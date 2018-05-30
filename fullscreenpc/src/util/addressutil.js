import jsondataprovinces from './provinces.json';
import jsondatacities from './cities.json';
import jsondataareas from './areas.json';
import find from 'lodash.find';

export const getadcodeinfo = (adcodei)=>{
  let adcode = adcodei + '';
  let resultobj = find(jsondataareas,(o)=>{return o.code === adcode;});
  if(!!resultobj){
    let resultobjcity = find(jsondatacities,(o)=>{return o.code === resultobj.parent_code;});
    if(!!resultobjcity){
      if(resultobjcity.name === '市辖区'){
        //直辖市特殊处理！！兼容目前方式
        return {
          level:'city',
          parent_code:parseInt(resultobjcity.parent_code,10)
        }
      }
    }
    return {
      level:'district',
      parent_code:parseInt(resultobj.parent_code,10)
    };
  }

  resultobj = find(jsondatacities,(o)=>{return o.code === adcode;});
  if(!!resultobj){
    return {
      level:'city',
      parent_code:parseInt(resultobj.parent_code,10)
    };
  }

  resultobj = find(jsondataprovinces,(o)=>{return o.code === adcode;});
  if(!!resultobj){
    return {
      level:'provice',
      parent_code:parseInt(resultobj.parent_code,10)
    };
  }

  return {
    level:'error',
    parent_code:100000
  }
}
