import { select,put,call,take,takeEvery,takeLatest,cancel,fork,join, } from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  common_err,
  mapmain_setmapcenter,
  map_setmapinited,
  carmapshow_createmap,
  carmapshow_destorymap,
  querydevicealarm_result,
  querymapstat_request,
  querymapstat_result
} from '../actions';
// import async from 'async';
import {getcurrentpos} from './getcurrentpos';
import { push,replace } from 'react-router-redux';
import L from 'leaflet';
import lodashmap from 'lodash.map';
import lodashclone from 'lodash.clone';
// import find from 'lodash.find';
// import sampleSize from 'lodash.samplesize';
import get from 'lodash.get';
import includes from 'lodash.includes';
import filter from 'lodash.filter';

import config from '../config.js';


import {getdata,setdata,setcounttotal} from './catlfull_mapcitystat_data';
const divmapid_mapmain = 'mapmain';
const maxzoom = 9;
let infoWindow;
const loczero = L.latLng(0,0);
let distCluster;
// let groupStyleMap = {};
let car = 'data:image/png;base64,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';
let bus = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL8AAACACAQAAADwz3D1AAAACXBIWXMAAAsTAAALEwEAmpwYAAADGWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBA3y7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BUNTVQYqg4jIKAX08EGIIUByaVEZhMXIwMDAIMCgxeDHUMmwiuEBozRjFOM8xqdMhkwNTJeYNZgbme+y2LDMY2VmzWa9yubEtoldhX0mhwBHJycrZzMXM1cbNzf3RB4pnqW8xryH+IL5nvFXCwgJrBZ0E3wk1CisKHxYJF2UV3SrWJw4p/hWiRRJYcmjUhXSutJPZObIhsoJyp2V71HwUeRVvKA0RTlKRUnltepWtUZ1Pw1Zjbea+7QmaqfqWOsK6b7SO6I/36DGMMrI0ljS+LfJPdPDZivM+y0qLBOtfKwtbFRtRexY7L7aP3e47XjB6ZjzXpetruvdVrov9VjkudBrgfdCn8W+y/xW+a8P2Bq4N+hY8PmQW6HPwr5EMEUKRilFG8e4xUbF5cW3JMxO3Jx0Nvl5KlOaXLpNRlRmVdas7D059/KY8tULfAqLi2YXHy55WyZR7lJRWDmv6mz131q9uvj6SQ3HGn83G7Skt85ru94h2Ond1d59uJehz76/bsK+if8nO05pnXpiOu+M4JmzZj2aozW3ZN6+BVwLwxYtXvxxqcOyCcsfrjRe1br65lrddU3rb2402NSx+cFWq21Tt3/Y6btr1R6Oven7jh9QP9h56PURv6Obj4ufqD355LT3mS3nZM+3X/h0Ke7yqasW15bdEL3ZeuvrnfS7N+/7PDjwyPTx6qeKz2a+EHzZ9Zr5Td3bn+9LP3z6VPD53de8b+9+5P/88Lv4z7d/Vf//AwAqvx2K829RWwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAB6ElEQVR42uzcu1LDMBBAUa0m///LS8FjhiGFiR5rO+dWFBGSj4RxUiSyffXzg7YUrbUWib5wAzr8svKTX2Ub0J39ypx+/PiFH7/w4xd+/MKPX/jv1+PQq2LKXMc/3Isl17p7/pxz+mdhRCn+/vljDv9+gLvO795/ri3C7/TjF378wo9f+PELP37hxy/8+IUfv/DjF378wo9f+PELP37hxy/8+IX/aXlf/nwn2ln8eROk3Dz/gd8T6cvE3PvxCz9+4ccv/PiFH7/w4xd+/MKPX/jxCz9+4ccv/PiFH7/w4xd+/MKPH7/w4xd+/MKPX/jxCz9+4cevefwBoazordmAKvzvm48NKMFvLX59m5KvVtpI/5f/eTk0Uc5Z6MuNzr90/X3x8rMUz4NncSfffs/9pdv/GBoegyckdpywM6+/Dy++tXjxH2RM+/faSuafsP5z3Hyi4O4bxePd+z35bDplZ30m6lMWkCXjZ21A4UY8rn+CyubP9affh3Hedl34+SZq+U/xeHfl0//OgMuvvd/+7J/6+PSrX8DC+Tdcd1+4kJg2/orbF7NO/2tLiKnj9wPGjoPQT/YHv+qCY/D1sWa++NdbtxycPIvw//suNZaMH+Y/toRYOH79FmxdfeTcS4gN49dtwfbVfwwAgPFFFzlSio4AAAAASUVORK5CYII=';
let containerImg = 'data:image/png;base64,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';
let energy = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN8AAACACAYAAACLIbwOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMRSURBVHja7N3LbuMwDAVQU/X///GEsx+kgD2W9TwH6Kptkoq+IhUEbmRmHvBAiZ/I42Mh7q6bJQDhA+EDhA+EDxA+ED5A+ED4gGtOS0BNMeF+3uvTOeHjZVTJ3Ldres7XbeyEJk1P+GA/wgfCB8IHCB8IHyB8IHyA8IHwAcIHl6Twgc4HCB8IHzj3CR/ofIDwgfCBc5/wweDcOpDR1Lyj2NB3UNP5QPhgr3Of8GGE1fnA2AlGT+GDdQMofDj3GTvBmQ9oMHoKH+h8sNe5T/hA+GC47pfCBwuOn8IHwgdDSuEDnQ+c+4QPdD5w7hM+mGT0FD4QPthr9BQ+0Plgr3OfO1az/Hj3wmsL4YP+G8R/B9HYCc+DmMIHE43LwgeduqAzH3Q6EwofdAqisRM6jaU6H3TqhjofdCJ8IHwgfIDwgfABwgfCBwgfCB8gfCB8gPCB8IHwWQIQPhA+QPhA+ADhgyti9BfoBkqsHLLfvpfCB326WowQROFjtdDlzd+JXiEUPmY+W+WDnxnin2PGwhdGTnxh0bYO0br7FcF7/TF4Foj4pS75Qm2j5YYbmZkTF6ZlYEJAu9c3F3iuJc982ejxjaLr1bdLbYvCGEUn6HrZobavj6BlkeJ4LWsGL4/+m10I31idKAXQeLtj+Ib4dIIOuHRtm2yuPljt7Een+s4Wvpo7Y40DdQrhsrV9PYDnpMWp+Ri1iy6M41wfQ9e2bF4c6OYUvK8/p3up7evKpAucgxSU+rapbdngQovGF4zgOkrc6nzxzxfWYeW1vvN8r3Xic5AxD2bZJKplodx4UqBB57saQB0R432D8Fk46/J9fIqfx4+Rx+eIoxyf/DP63xejhG9luvqN4Cxc23jrbyxCpNOpbaeOaqzT9dR2zjPfbDtkCJ3ajjJWlw0LlYKntjqfswL1O0zN2rqBUqezwdXX4M2WNWv7uqJILhD6bKru4YKNVeebqki6ntoKHwKo820wo+t6ywfQ/2oYdPG8s6m2VZ0LFyknKDob17YsXqgQPLUdtbbecBE8te3kLwAAAP//AwCPRII/c8YW9AAAAABJRU5ErkJggg==';
//新建行政区域
const CreateMapUI_DistrictCluster =  (map)=>{
  return new Promise((resolve,reject) => {
      if(!window.AMapUI){
        alert('未加载到AMapUI！');
        reject();
        return;
      }
      window.AMapUI.load(['ui/geo/DistrictCluster',
      'lib/utils',
      'lib/dom.utils',
      'ui/geo/DistrictCluster/lib/DistMgr',
    ],(DistrictCluster,utils, domUtils, DistMgr)=> {
           //<------------获取某个地点的Marker----------------
           const defaultgetClusterMarker = (feature, dataItems, recycledMarker)=> {
               //行政区域
               try{
                //  console.log(feature);
                 const datainfo = getdata(feature.properties.adcode);
                //  console.log(datainfo);
                 let isshow = !!datainfo;
                 if(isshow){
                   if(datainfo['totalcount'] === 0){
                     isshow = false;
                   }
                 }
                 if(isshow){
                   let container, title, body;
                   const nodeClassNames = {
                				// title: 'amap-ui-district-cluster-marker-title',
                				// body: 'amap-ui-district-cluster-marker-body',
                				// container: 'amap-ui-district-cluster-marker'
                         title: 'amap-ui-district-cluster-marker-title1',
                         title_curr: 'amap-ui-district-cluster-marker-title1-curr',
                         body: 'marker-body-customer-body',
                         body_curr: 'marker-body-customer-body-curr',
                         container: 'amap-ui-district-cluster-marker1'
                			};
                			if (!!recycledMarker) {
                				container = recycledMarker.getContent();
                				title = domUtils.getElementsByClassName(nodeClassNames.title, 'span', container)[0];
                				body = domUtils.getElementsByClassName(nodeClassNames.body, 'span', container)[0];
                			} else {
                        container = document.createElement('div');
                				title = document.createElement('span');
                				title.className = nodeClassNames.title;
                				body = document.createElement('span');
                				body.className = nodeClassNames.body;
                				container.appendChild(title);
                				container.appendChild(body);
                			}

                			const props = feature.properties,
                			routeNames = [];
                			const classNameList = [nodeClassNames.container, 'level_' + props.level, 'adcode_' + props.adcode];
                			if (props.acroutes) {
                				const acroutes = props.acroutes;
                				for (let i = 0, len = acroutes.length; i < len; i++) {
                					classNameList.push('descendant_of_' + acroutes[i]);
                					if (i === len - 1) {
                						classNameList.push('child_of_' + acroutes[i]);
                					}
                					if (i > 0) {
                						routeNames.push(DistMgr.getNodeByAdcode(acroutes[i]).name);
                					}
                				}
                			}
                			container.className = classNameList.join(' ');
                			if (routeNames.length > 0) {
                				routeNames.push(props.name);
                				container.setAttribute('title', routeNames.join('>'));
                			} else {
                				container.removeAttribute('title');
                			}
                      if(!!title){
                        title.innerHTML = utils.escapeHtml(props.name);
                      }
                			if(!!body){
                        const zoomlevel = window.amapmain.getZoom();
                        console.log(`>------当前zoomlevel:${zoomlevel},如果是4,5则不显示图标弹框------`);

                         let info = `${datainfo['totalcount']}`;

                        //  if(zoomlevel !== 4 && zoomlevel !== 5){//太挤了
                        //   //  debugger
                        //    info += `<br /><div style="background: #317093;border: 1px solid #8e8e8e;text-align: left;padding:0 5px;margin-left: -7px;margin-right: -8px"><img width="16px" src="`+car+`"> ${datainfo['CAR']}`;
                        //    info += `<br /><img width="16px" src="`+bus+`"> ${datainfo['BUS']}`;
                        //    info += `<br /><img width="16px" src="`+containerImg+`"> ${datainfo['CONTAINERTRUCK']}`;
                        //    info += `<br /><img width="16px" src="`+energy+`"> ${datainfo['ENERGYTRUCK']}</div>`;
                        //  }
                         body.innerHTML = info;
                      }


                			const resultMarker = recycledMarker || new window.AMap.Marker({
                				topWhenClick: true,
                				offset: new window.AMap.Pixel(-20, -30),
                        zIndex: 10,
                				content: container
                			});
                      if(feature.properties.adcode !== 100000){
                        resultMarker.on('mouseover', ()=> {
                             let text = `${datainfo['totalcount']}`;
                             text += `<br /><div style="opacity: 1;z-index: 999;background: #03a9f4;border: 1px solid #8e8e8e;text-align: left;padding:0 5px;margin-left: -7px;margin-right: -8px"><img width="16px" src="`+car+`"> ${datainfo['CAR']}`;
                             text += `<br /><img width="16px" src="`+bus+`"> ${datainfo['BUS']}`;
                             text += `<br /><img width="16px" src="`+containerImg+`"> ${datainfo['CONTAINERTRUCK']}`;
                             text += `<br /><img width="16px" src="`+energy+`"> ${datainfo['ENERGYTRUCK']}</div>`;
                             console.log(`鼠标移入${props.name}:${text}`);
                             try {
                               body.innerHTML = text;
                               resultMarker.setzIndex(999);
                               title.className = nodeClassNames.title_curr;
                               body.className = nodeClassNames.body_curr;
                               resultMarker.setContent(container)
                             } catch (e) { }

                        });
                        resultMarker.on('mouseout', ()=> {
                            let text = `${datainfo['totalcount']}`;
                            console.log(`鼠标移出${props.name}:${text}`);
                            try {
                              body.innerHTML = text;
                              resultMarker.setzIndex(10);
                              title.className = nodeClassNames.title;
                              body.className = nodeClassNames.body;
                              resultMarker.setContent(container)
                            } catch (e) { }
                        });
                      }
                      else{
                        resultMarker.off('mouseover', ()=> {
                        });
                        resultMarker.off('mouseout', ()=> {
                        });
                      }

                			return resultMarker;
                    }
               }
               catch(e){

               }
          	   return null;
        		}
            distCluster = new DistrictCluster({
                 zIndex: 100,
                 map: map, //所属的地图实例
                 autoSetFitView:true,
                 getPosition: (deviceitem)=> {
                     if(!!deviceitem.locz){
                       return deviceitem.locz;
                     }
                     console.log(`err----->=====>======>${JSON.stringify(deviceitem)}`);
                     return deviceitem.locz;
                 },
                 renderOptions:{
                   featureStyleByLevel:{
                       country: {
                           fillStyle: 'rgba(3, 52, 71, 1)'
                       },
                       province: {
                           fillStyle: 'rgba(3, 52, 71, 1)'
                       },
                       city: {
                           fillStyle: 'rgba(3, 52, 71, 1)'
                       },
                       district: {
                           fillStyle: 'rgba(3, 52, 71, 1)'
                       }
                  },
                   clusterMarkerClickToShowSub:false,
                   featureClickToShowSub:false,
                   clusterMarkerRecycleLimit:100000,
                   clusterMarkerKeepConsistent:true,
                   getClusterMarker : (feature, dataItems, recycledMarker)=> {
                      // if(dataItems.length > 0){
                      // debugger;
                      return defaultgetClusterMarker(feature, dataItems, recycledMarker);
                      // }
                      // return null;
                    }
                 }
             });
             distCluster.setData(null);

             distCluster.on('featureClick clusterMarkerClick', function(e, feature) {
                console.log(`click....`);
                map.zoomIn();
             });
             resolve(distCluster);
       });

   });
}

//新建地图
let CreateMap =({mapcenterlocation,zoomlevel})=> {

  return new Promise((resolve,reject) => {
    if(!mapcenterlocation.equals(loczero) && !window.amapmain ){
      let center = new window.AMap.LngLat(mapcenterlocation.lng,mapcenterlocation.lat);
      window.amapmain = new window.AMap.Map(divmapid_mapmain, {
            center: center,
            zoom:zoomlevel,
            zooms:[3,8],
            lang:"zh-cn",
            dragEnable:true,
            zoomEnable:true,
            touchZoom:true,
            mapStyle: 'amap://styles/blue'//样式URL
        });
        // http://lbs.amap.com/api/javascript-api/example/personalized-map/set-theme-style
        // http://lbs.amap.com/api/javascript-api/guide/create-map/mapstye/
        window.AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],
        ()=>{
          const scale = new window.AMap.Scale({
                visible: true
            });
          const  toolBar = new window.AMap.ToolBar({
                visible: true
            });
          const  overView = new window.AMap.OverView({
                visible: true
            });
            window.amapmain.addControl(scale);
            window.amapmain.addControl(toolBar);
            window.amapmain.addControl(overView);
            resolve(window.amapmain);
        });

      }
      else{
        if(!!window.amapmain){
          resolve(window.amapmain);
          return;
        }
        reject(`地图参数${mapcenterlocation.lng},${mapcenterlocation.lat},amap:${!!window.amapmain}`);
      }
  });
}

//监听地图事件
const listenmapevent = (eventname)=>{
  return new Promise(resolve => {
      if(!window.amapmain){
        resolve();
        return;
      }

      window.amapmain.on(eventname, (e)=> {
          resolve(eventname);
      });

  });
}

//地图主流程
export function* createmapmainflow(){
    if(config.softmode === 'fullpc'){
      yield takeLatest(`${querydevicealarm_result}`, function*(action) {
        const {payload:{counttotal}} = action;
        setcounttotal(counttotal);
        yield put(querymapstat_request({}));
      });

      yield takeLatest(`${querymapstat_result}`, function*(action) {
        const {payload} = action;
        setdata(payload);
        if(!!distCluster){
          distCluster.setData(null);
        }
      });
    }

    //创建地图
    yield takeEvery(`${carmapshow_createmap}`, function*(action_createmap) {
      try{
        let {payload:{divmapid}} = action_createmap;
        if(divmapid === divmapid_mapmain){
          //wait js script loaded
          // while(!window.AMap){
          //   //console.log(`wait here...${!!window.AMap},ui:${!!window.AMapUI}`);
          //   yield call(delay,500);
          // }
          //console.log(`js script init`);
          //take
          let mapcarprops = yield select((state) => {
            const {carmap} = state;
            return {...carmap};
          });
          if(!mapcarprops.isMapInited){//仅在第一次加载页面初始化时进入
            //等待地图初始化
            //console.log(`wait for mapcarprops.isMapInited`);
            yield take(`${map_setmapinited}`);
          }

          //console.log(`start create map`);
          let {mapcenterlocation,zoomlevel} = mapcarprops;
          if(mapcenterlocation.equals(loczero)){//仅在第一次加载页面初始化时进入
            const centerpos = yield call(getcurrentpos);
            mapcenterlocation = L.latLng(centerpos.lat, centerpos.lng);
          }
          yield call(CreateMap,{mapcenterlocation,zoomlevel});//创建地图

          // yield call(CreateMapUI_PointSimplifier,window.amapmain);
          // yield call(CreateMapUI_MarkCluster,window.amapmain);
          yield call(CreateMapUI_DistrictCluster,window.amapmain);

          let task_dragend =  yield fork(function*(eventname){
            while(true){
              yield call(listenmapevent,eventname);
              let centerlocation = window.amapmain.getCenter();
              let centerlatlng = L.latLng(centerlocation.lat, centerlocation.lng);
              yield put(mapmain_setmapcenter(centerlatlng));
            }
          },'dragend');

          let task_zoomend =  yield fork(function*(eventname){
            while(true){
              yield call(listenmapevent,eventname);
              // let centerlocation = window.amapmain.getCenter();
              // let centerlatlng = L.latLng(centerlocation.lat, centerlocation.lng);
              // yield put(md_mapmain_setzoomlevel(window.amapmain.getZoom()));
              const zoomlevel = window.amapmain.getZoom();
              console.log(`>------${zoomlevel},start render-----<`)
              if(!!distCluster){
                distCluster.setData(null);
                // distCluster.renderLater();
              }

            }
          },'zoomend');

          yield cancel(task_dragend);
        }
      }
      catch(e){
        console.log(e);
      }

    });


    //销毁地图
    yield takeEvery(`${carmapshow_destorymap}`, function*(action_destorymap) {
      let {payload:{divmapid}} = action_destorymap;
      const destorymap = (divmapid)=>{
        return new Promise((resolve) => {
          if(divmapid === divmapid_mapmain){
            window.amapmain = null;
            infoWindow=null;
            distCluster=null;
          }
          resolve();
        });
      }
      yield call(destorymap,divmapid);

    });


}
