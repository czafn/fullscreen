import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import * as math from 'mathjs';

const getmedian = (data)=>{
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
  let mapindex = {};
  // console.log(`convertdata--->${JSON.stringify(convertdata)}`);
  let inputsz = [];
  for(let i = 0 ;i < convertdata.length; i++){
    const sample = convertdata[i];
    inputsz.push(sample.nv);
    mapindex[sample.nv] = i;
  }
  if(totalfv === 0){
    return 0;
  }
  // console.log(`inputsz--->${JSON.stringify(inputsz)}`);
  const median = math.median(inputsz);
  const medianindex = mapindex[median];
  // console.log(`medianindex--->${medianindex}`);
  return medianindex;
}

const getmedian2  = (data,fpercent=0.9)=>{
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
      areaParam:{
        start:0,
        end:0
      },
      median:0
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
  return {areaParam,median};
}

export {getmedian,getmedian2};
