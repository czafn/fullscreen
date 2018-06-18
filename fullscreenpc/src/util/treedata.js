/*
思路：
构造地理位置树结点,该树固定死(省市区)
树控件渲染该树,若该结点对应数量为0，则不显示结点
树结点的title动态通过render获取
定义数据结构,放入reducer,定时器动态更新之
*/
import jsondataprovinces from './provinces.json';
import jsondatacities from './cities.json';
import jsondataareas from './areas.json';
import map from 'lodash.map';


export function get_initgeotree(){
  //获取第一次完整树结构
  let gmap_acode_node = {};
  //root
  let gmap_acode_treename = {};
  let gmap_acode_treecount = {};
  let datatree =  {
      id:100000,
      adcode:100000,
      loading: false,
      active : false,
      toggled:true,
      type:'group_root',
      children:[]
  };
  gmap_acode_node[100000] = datatree;
  gmap_acode_treename[100000] = '全国';
  gmap_acode_treecount[100000] = {
    count_total:0,
    count_online:0,
    count_offline:0,
  };

  map(jsondataprovinces,(province)=>{
    let provincecode = parseInt(province.code,10);
    let provincenode = {
      adcode:provincecode,
      name:province.name,
      loading: false,
      type:'group_province',
      children:[]
    };
    gmap_acode_node[provincecode] = provincenode;
    gmap_acode_treename[provincecode] = province.name;
    gmap_acode_treecount[provincecode] = {
      count_total:0,
      count_online:0,
      count_offline:0,
    };

    map(jsondatacities,(city)=>{
      let citycode = parseInt(city.code,10);
      let parent_code = parseInt(city.parent_code,10);
      if(parent_code === provincecode){
        let citynode = {
          adcode:citycode,
          name:city.name,
          loading: false,
          type:'group_city',
          children:[]
        };
        gmap_acode_node[citycode] = citynode;
        gmap_acode_treename[citycode] = city.name;
        gmap_acode_treecount[citycode] = {
          count_total:0,
          count_online:0,
          count_offline:0,
        };

        map(jsondataareas,(area)=>{
          let areacode = parseInt(area.code,10);
          parent_code = parseInt(area.parent_code,10);
          if(parent_code === citycode){
            let areanode = {
              adcode:areacode,
              name:area.name,
              loading: false,
              type:'group_area',
              children:[]
            };
            gmap_acode_node[areacode] = areanode;
            gmap_acode_treename[areacode] = area.name;
            gmap_acode_treecount[areacode] = {
              count_total:0,
              count_online:0,
              count_offline:0,
            };
            if(gmap_acode_treename[citycode] !== "市辖区"){
              citynode.children.push(areanode);
            }
            else{

              provincenode.children.push(areanode);
            }
          }
        });
        if(gmap_acode_treename[citycode] !== "市辖区"){
          provincenode.children.push(citynode);
        }
      }
    });
    datatree.children.push(provincenode);
  });

  const node2 = {
    id:2,
    adcode:2,
    loading: false,
    active : false,
    toggled:false,
    name:'未定位',
    type:'group_area',
    usefixedname:true,
    children:[]
  };
  let datatreeall =  {
      id:1,
      adcode:1,
      loading: false,
      active : false,
      toggled:true,
      usefixedname:true,
      name:'所有',
      children:[
        datatree,
        node2
      ]
  };

  gmap_acode_node[1] = datatreeall;
  gmap_acode_treename[1] = '所有';

  gmap_acode_node[2] = node2;
  gmap_acode_treename[2] = '未定位';
  gmap_acode_treecount[1] = {
    count_total:0,
    count_online:0,
    count_offline:0,
  };
  gmap_acode_treecount[2] = {
    count_total:0,
    count_online:0,
    count_offline:0,
  };
  return {datatree:datatreeall,gmap_acode_treename,gmap_acode_treecount,gmap_acode_node};
};
