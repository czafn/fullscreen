import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';

const getmedian  = (data,fpercent=0.9)=>{
  let convertdata = [];
  let totalfv = 0;
  lodashmap(data,(v)=>{
    const fv = parseFloat(lodashget(v,'value','0'));
    convertdata.push({
      name:lodashget(v,'name',''),
      value:fv
    });
    totalfv += fv;
  });
  console.log(`totalfv--->${totalfv}`);

  let start = 0;
  let end = convertdata.length-1;
  let tmptotal = 0;
  let boundmax = totalfv*(1-fpercent);
  for(let i=0,j=convertdata.length-1;i<j;i++,j--){
    let vstart = convertdata[i].value;
    let vend = convertdata[j].value;
    tmptotal += vstart;
    console.log(`tmptotal--->${tmptotal},i->${i},j->${j},boundmax->${boundmax}`);
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
  const median = convertdata.length/2; //需要后台传过来中位数的数据。 此处暂时模拟一个中位数。

  console.log(`start--->${start},end--->${end}`);
  return {areaParam,median};
}

export {getmedian};
