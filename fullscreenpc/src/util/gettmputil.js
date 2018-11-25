import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import * as math from 'mathjs';
const _ = require('underscore');

const getmedian = (data)=>{
  // debugger;
  let inputdata = [];
  for(let i =0 ;i < data.length; i++){
    for(let j=0;j<data[i].value;j++){
      inputdata.push(data[i].name);
    }
  }
  if(inputdata.length > 0){
    const median = math.median(inputdata);
    // debugger;
    return median;
  }
  return 0;

}

const getpercent  = (data,fpercent=0.9)=>{

  let convertdata = [];
  let totalfv = 0;
  lodashmap(data,(v)=>{
    const fv = parseFloat(lodashget(v,'value','0'));
    const nv = parseFloat(lodashget(v,'name','0'));
    convertdata.push({
      name:lodashget(v,'name',''),
      value:fv,
      nv
    });
    totalfv += fv;
  });
  // console.log(`convertdata--->${JSON.stringify(convertdata)}`);
  let inputsz = [];
  let mapindex = {};
  for(let i = 0 ;i < convertdata.length; i++){
    const sample = convertdata[i];
    inputsz.push(sample.nv);
    mapindex[sample.nv] = i;
  }
  if(totalfv === 0){
    return {
      start:0,
      end:0
    }
  }
  const median = math.median(inputsz);
  const medianindex = mapindex[median];

  let start = medianindex;
  let end = medianindex;
  let tmptotal = 0;
  let boundmax = totalfv*fpercent;
  for(let i=medianindex,j=medianindex;i>=0,j<convertdata.length;i--,j++){
    let vstart = convertdata[i].value;
    let vend = convertdata[j].value;
    tmptotal += vstart;
    // console.log(`tmptotal--->${tmptotal},i->${i},j->${j},boundmax->${boundmax}`);
    if(tmptotal >= boundmax){
      start = i;
      end = j;
      break;
    }
    tmptotal += vend;
    if(tmptotal >= boundmax){
      start = i;
      end = j;
      break;
    }
  }


  const areaParam = {
      start: convertdata[start].name,
      end: convertdata[end].name
  }

  // console.log(`start--->${start},end--->${end},median--->${median}`);
  return areaParam;
}

/*
@input data为传过来的数据
@param 是个数组,数组的元素分别是:[{start,end,step}]
*/
const convertdata = (inpudata,paramz)=>{
  const m5data = [];
  for(let pi = 0; pi < paramz.length ; pi++){
      const param = paramz[pi];
      for(let i=param.start; i<=param.end; i+=param.step){
        const fs = _.filter(inpudata, (d) =>
          d.name-0 >= i && d.name-0 < i+param.step
        );
        const tempNum = _.reduce(fs, (memo, num) =>  memo + num.value, 0)-0
        m5data.push({
          name: `${i}`,
          value: `${tempNum}`
        })
    }
  }
  return m5data;
}
/*
*将传过来的中位数，查找离X轴数据最近的一个数据项，并返回。
@median  中位数
@xAxisDate X轴数据
*/
const getmedianconvert = (median,xAxisDate) => {
  for(let i=0, len = xAxisDate.length; i<len; i++){
    if(Number(xAxisDate[i])<median && Number(xAxisDate[i+1])>median){
      let left = Number(median) - Number(xAxisDate[i]);
      let right = Number(xAxisDate[i+1]) - Number(median);
      return left<right ? xAxisDate[i]:xAxisDate[i+1];
    }
  }

  return median.toString()
}

export {getmedian,getpercent,convertdata,getmedianconvert};
