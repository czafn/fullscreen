import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import lodashsortby from 'lodash.sortby';
import lodashreverse from 'lodash.reverse';
import moment from 'moment';
const oldyears = moment().subtract(10,'years').format('YYYY');

const getqueryresult = (deviceextlist,query)=>{

  //deviceextlist中过滤 query,
  let getcountcar = 0;
  let getcountbus = 0;
  let getcountEnergy = 0;
  let getcountContainer = 0;
  let getusedyearcar = [];
  let getusedyearbus = [];
  let getusedyearEnergy = [];
  let getusedyearContainer = [];
  let getstatprovince = [];
  let getstatcatlproject = [];

  // console.log(deviceextlist);
  // _id:"5b273fc99eae51428496e987"
  // DeviceId:"1627100503"
  // usedyear:"2004"
  // province:"福建"
  // catlprojectname:"AAA-123"
  // type:"BUS"
  let mapusedyearcar = {};
  let mapusedyearbus = {};
  let mapusedyearEnergy = {};
  let mapusedyearContainer = {};
  let mapprovincecar = {};
  let mapprovincebus = {};
  let mapprovinceEnergy = {};
  let mapprovinceContainer = {};
  let mapcatlprojectnamecar = {};
  let mapcatlprojectnamebus = {};
  let mapcatlprojectnameEnergy = {};
  let mapcatlprojectnameContainer = {};

  for(let i = 0 ;i < deviceextlist.length ; i++){
    const deviceextinfo = deviceextlist[i];
    let matched = false;
    let isclickedproject = false;
    let isclickedprovince = false;
    let matchedproject = false;
    let matchedprovince = false;
    if(!!query['catlprojectname']){
      isclickedproject = true;
      if(deviceextinfo.catlprojectname === query['catlprojectname']){
        matched = true;
        matchedproject = true;
      }
    }
    else if(!!query['province']){
      isclickedprovince = true;
      if(deviceextinfo.province === query['province']){
        matched = true;
        matchedprovince = true;
      }
    }
    else{
      matched = true;
    }

    // if((!isclickedprovince) || (isclickedprovince&&matchedprovince)){

    if((!isclickedproject) || (isclickedproject&&matchedproject)){
      //未点击项目，或者点击了项目,并且符合项目
      if(lodashget(deviceextinfo,'type') === 'CAR'){
        if(!!mapprovincecar[deviceextinfo.province]){
          mapprovincecar[deviceextinfo.province] += 1;
        }
        else{
          mapprovincecar[deviceextinfo.province] = 1;
        }
      }
      if(lodashget(deviceextinfo,'type') === 'BUS'){
        if(!!mapprovincebus[deviceextinfo.province]){
          mapprovincebus[deviceextinfo.province] += 1;
        }
        else{
          mapprovincebus[deviceextinfo.province] = 1;
        }
      }
      if(lodashget(deviceextinfo,'type') === 'ENERGYTRUCK'){
        if(!!mapprovinceEnergy[deviceextinfo.province]){
          mapprovinceEnergy[deviceextinfo.province] += 1;
        }
        else{
          mapprovinceEnergy[deviceextinfo.province] = 1;
        }
      }
      if(lodashget(deviceextinfo,'type') === 'CONTAINERTRUCK'){
        if(!!mapprovinceContainer[deviceextinfo.province]){
          mapprovinceContainer[deviceextinfo.province] += 1;
        }
        else{
          mapprovinceContainer[deviceextinfo.province] = 1;
        }
      }
    }
    if((!isclickedprovince) || (isclickedprovince&&matchedprovince)){
    // if((!isclickedproject) || (isclickedproject&&matchedproject)){
      //未点击省份，或者点击了省份,并且符合省份
      if(lodashget(deviceextinfo,'type') === 'CAR'){
        if(!!mapcatlprojectnamecar[deviceextinfo.catlprojectname]){
          mapcatlprojectnamecar[deviceextinfo.catlprojectname] += 1;
        }
        else{
          mapcatlprojectnamecar[deviceextinfo.catlprojectname] = 1;
        }
      }
      if(lodashget(deviceextinfo,'type') === 'BUS'){
        if(!!mapcatlprojectnamebus[deviceextinfo.catlprojectname]){
          mapcatlprojectnamebus[deviceextinfo.catlprojectname] += 1;
        }
        else{
          mapcatlprojectnamebus[deviceextinfo.catlprojectname] = 1;
        }
      }
      if(lodashget(deviceextinfo,'type') === 'ENERGYTRUCK'){
        if(!!mapcatlprojectnameEnergy[deviceextinfo.catlprojectname]){
          mapcatlprojectnameEnergy[deviceextinfo.catlprojectname] += 1;
        }
        else{
          mapcatlprojectnameEnergy[deviceextinfo.catlprojectname] = 1;
        }
      }
      if(lodashget(deviceextinfo,'type') === 'CONTAINERTRUCK'){
        if(!!mapcatlprojectnameContainer[deviceextinfo.catlprojectname]){
          mapcatlprojectnameContainer[deviceextinfo.catlprojectname] += 1;
        }
        else{
          mapcatlprojectnameContainer[deviceextinfo.catlprojectname] = 1;
        }
      }
    }

    if(matched){//当前符合过滤条件
      let mapusedyear = mapusedyearcar;
      if(lodashget(deviceextinfo,'type') === 'BUS'){
        mapusedyear =  mapusedyearbus;
        getcountbus++;
      }
      if(lodashget(deviceextinfo,'type') === 'CAR'){
        mapusedyear =  mapusedyearcar;
        getcountcar++;
      }
      if(lodashget(deviceextinfo,'type') === 'ENERGYTRUCK'){
        mapusedyear =  mapusedyearEnergy;
        getcountEnergy++;
      }
      if(lodashget(deviceextinfo,'type') === 'CONTAINERTRUCK'){
        mapusedyear =  mapusedyearContainer;
        getcountContainer++;
      }
      const usedyear = lodashget(deviceextinfo,'usedyear','');
      if(usedyear !== ''){
        if(oldyears > usedyear){
          if(!mapusedyear[`${oldyears}之前`]){
            mapusedyear[`${oldyears}之前`] = 1;
          }
          else{
            mapusedyear[`${oldyears}之前`] += 1;
          }
        }
        else{
          if(!mapusedyear[usedyear]){
            mapusedyear[usedyear] = 1;
          }
          else{
            mapusedyear[usedyear] += 1;
          }
        }
      }
    }//matched
  }

  // console.log(mapprovincebus);
  // console.log(mapprovincecar);

  lodashmap(mapusedyearcar,(v,k)=>{
    getusedyearcar.push({
      type:'CAR',
      name:k,
      value:`${v}`
    })
  });

  lodashmap(mapusedyearbus,(v,k)=>{
    getusedyearbus.push({
      type:'BUS',
      name:k,
      value:`${v}`
    })
  });
  lodashmap(mapusedyearEnergy,(v,k)=>{
    getusedyearEnergy.push({
      type:'ENERGYTRUCK',
      name:k,
      value:`${v}`
    })
  });

  lodashmap(mapusedyearContainer,(v,k)=>{
    getusedyearContainer.push({
      type:'CONTAINERTRUCK',
      name:k,
      value:`${v}`
    })
  });

  // let mapprovincecar = {};
  // let mapprovincebus = {};
  // let mapcatlprojectnamecar = {};
  // let mapcatlprojectnamebus = {};
  let province_keymapcount = [];
  lodashmap(mapprovincecar,(vcar,kcar)=>{
    // if(!!mapprovincebus[kcar]){//既有bus又有car
      province_keymapcount.push({
        key:kcar,
        countcar:vcar,
        countbus:mapprovincebus[kcar]||0,
        countEnergy:mapprovinceEnergy[kcar]||0,
        countContainer:mapprovinceContainer[kcar]||0,
        count:vcar+(mapprovincebus[kcar]||0)+(mapprovinceEnergy[kcar]||0)+(mapprovinceContainer[kcar]||0)
      });
    // }
    // else{//仅有car没bus
    //   province_keymapcount.push({
    //     key:kcar,
    //     countcar:vcar,
    //     countbus:0,
    //     count:vcar
    //   });
    // }
  });

  lodashmap(mapprovincebus,(vbus,kbus)=>{
    let isTemp = province_keymapcount.findIndex((value, index) => {
      return value.key === kbus
    })
    if(isTemp === -1){
      province_keymapcount.push({
        key:kbus,
        countcar:0,
        countbus:vbus,
        countEnergy:mapprovinceEnergy[kbus]||0,
        countContainer:mapprovinceContainer[kbus]||0,
        count:vbus+(mapprovinceEnergy[kbus]||0)+(mapprovinceContainer[kbus]||0)
      });
    }
  });
  lodashmap(mapprovinceEnergy,(vEnergy,kEnergy)=>{
    let isTemp = province_keymapcount.findIndex((value, index) => {
      return value.key === kEnergy
    })
    if(isTemp === -1){
      province_keymapcount.push({
        key:kEnergy,
        countcar:0,
        countbus:0,
        countEnergy:vEnergy,
        countContainer:mapprovinceContainer[kEnergy]||0,
        count:vEnergy+(mapprovinceContainer[kEnergy]||0)
      });
    }
  });
  lodashmap(mapprovinceContainer,(vContainer,kContainer)=>{
    let isTemp = province_keymapcount.findIndex((value, index) => {
      return value.key === kContainer
    })
    if(isTemp === -1){
      province_keymapcount.push({
        key:kContainer,
        countcar:0,
        countbus:0,
        countEnergy:0,
        countContainer:vContainer,
        count:vContainer
      });
    }
  });



  province_keymapcount = lodashsortby(province_keymapcount, [(o)=> { return o.count; }]);
  province_keymapcount = lodashreverse(province_keymapcount);
  //sort with count!
  let maxcount = province_keymapcount.length > 20 ? 20 : province_keymapcount.length;
  for(let i = 0;i < maxcount ;i ++){
    const v = province_keymapcount[i];
    getstatprovince.push({
      type:'CAR',
      name:v.key,
      value:v.countcar
    });
    getstatprovince.push({
      type:'BUS',
      name:v.key,
      value:v.countbus
    });
    getstatprovince.push({
      type:'ENERGYTRUCK',
      name:v.key,
      value:v.countEnergy
    });
    getstatprovince.push({
      type:'CONTAINERTRUCK',
      name:v.key,
      value:v.countContainer
    });
  }
  // console.log(getstatprovince);

  //for project
  let project_keymapcount = [];
  lodashmap(mapcatlprojectnamecar,(vcar,kcar)=>{
    // if(!!mapcatlprojectnamebus[kcar]){
      project_keymapcount.push({
        key:kcar,
        countcar:vcar,
        countbus:mapcatlprojectnamebus[kcar]||0,
        countEnergy:mapcatlprojectnameEnergy[kcar]||0,
        countContainer:mapcatlprojectnameContainer[kcar]||0,
        count:vcar+(mapcatlprojectnamebus[kcar]||0)+(mapcatlprojectnameEnergy[kcar]||0)+(mapcatlprojectnameContainer[kcar]||0)

      });
    // }
    // else{//仅有kar没bus
    //   project_keymapcount.push({
    //     key:kcar,
    //     countcar:vcar,
    //     countbus:0,
    //     count:vcar
    //   });
    // }
  });
  lodashmap(mapcatlprojectnamebus,(vbus,kbus)=>{
    let isTemp = project_keymapcount.findIndex((value, index) => {
      return value.key === kbus
    })
    if(isTemp === -1){
      project_keymapcount.push({
        key:kbus,
        countcar:0,
        countbus:vbus,
        countEnergy:mapcatlprojectnameEnergy[kbus]||0,
        countContainer:mapcatlprojectnameContainer[kbus]||0,
        count:vbus+(mapcatlprojectnameEnergy[kbus]||0)+(mapcatlprojectnameContainer[kbus]||0)
      });
    }
  });
  lodashmap(mapcatlprojectnameEnergy,(vEnergy,kEnergy)=>{
    let isTemp = project_keymapcount.findIndex((value, index) => {
      return value.key === kEnergy
    })
    if(isTemp === -1){
      project_keymapcount.push({
        key:kEnergy,
        countcar:0,
        countbus:0,
        countEnergy:vEnergy,
        countContainer:mapcatlprojectnameContainer[kEnergy]||0,
        count:vEnergy+(mapcatlprojectnameContainer[kEnergy]||0)
      });
    }
  });
  lodashmap(mapcatlprojectnameContainer,(vContainer,kContainer)=>{
    let isTemp = project_keymapcount.findIndex((value, index) => {
      return value.key === kContainer
    })
    if(isTemp === -1){
      project_keymapcount.push({
        key:kContainer,
        countcar:0,
        countbus:0,
        countEnergy:0,
        countContainer:vContainer,
        count:vContainer
      });
    }
  });
  project_keymapcount = lodashsortby(project_keymapcount, [(o)=> { return o.count; }]);
  project_keymapcount = lodashreverse(project_keymapcount);
  //sort with count!
  maxcount = project_keymapcount.length > 20 ? 20 : project_keymapcount.length;
  for(let i = 0;i < maxcount ;i ++){
    const v = project_keymapcount[i];
    getstatcatlproject.push({
      type:'CAR',
      name:v.key,
      value:v.countcar
    });
    getstatcatlproject.push({
      type:'BUS',
      name:v.key,
      value:v.countbus
    });
    getstatcatlproject.push({
      type:'ENERGYTRUCK',
      name:v.key,
      value:v.countEnergy
    });
    getstatcatlproject.push({
      type:'CONTAINERTRUCK',
      name:v.key,
      value:v.countContainer
    });

  }

  const payload = {
    getcountcar,
    getcountbus,
    getcountEnergy,
    getcountContainer,
    getusedyearcar,
    getusedyearbus,
    getusedyearEnergy,
    getusedyearContainer,
    getstatprovince,
    getstatcatlproject,
  };
  // console.log(`payload--->${JSON.stringify(payload)}`)
  return payload;
}

export {getqueryresult};
