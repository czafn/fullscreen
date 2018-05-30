/**
 * Created by wangxiaoqing on 2017/3/27.
 */
// import * as xview from './xview/Common';
let getRandomLocation =  (latitude, longitude, radiusInMeters)=>{

    var getRandomCoordinates =  (radius, uniform)=> {
        // Generate two random numbers
        var a = Math.random(),
            b = Math.random();

        // Flip for more uniformity.
        if (uniform) {
            if (b < a) {
                var c = b;
                b = a;
                a = c;
            }
        }

        // It's all triangles.
        return [
            b * radius * Math.cos(2 * Math.PI * a / b),
            b * radius * Math.sin(2 * Math.PI * a / b)
        ];
    };

    var randomCoordinates = getRandomCoordinates(radiusInMeters, true);

    // Earths radius in meters via WGS 84 model.
    var earth = 6378137;

    // Offsets in meters.
    var northOffset = randomCoordinates[0],
        eastOffset = randomCoordinates[1];

    // Offset coordinates in radians.
    var offsetLatitude = northOffset / earth,
        offsetLongitude = eastOffset / (earth * Math.cos(Math.PI * (latitude / 180)));

    // Offset position in decimal degrees.
    let result = {
        latitude: latitude + (offsetLatitude * (180 / Math.PI)),
        longitude: longitude + (offsetLongitude * (180 / Math.PI))
    }
    return [result.longitude,result.latitude];
};
export {getRandomLocation};
let locationsz =[0,0];
export const getcurrentlocationfn = (fncallback)=> {
    window.setTimeout(()=>{
        // locationsz = getRandomLocation(31.9931551257,118.7294151918,300);
        locationsz = getRandomLocation(32.0429300000,118.7780400000,300);
        fncallback(locationsz);
    },0);
}
//
// export const getcurrentlocationfn = (fncallback)=> {
//
//         try{
//             xview.geographyLocationCallbackMethod((data)=>{
//                 //alert(JSON.stringify(data));
//                 if(typeof data=='string'){
//                   data=JSON.parse(data);
//                 }
//                 if(!!data.longitude){
//                   data.longitude = parseFloat(data.longitude);
//                 }
//                 if(!!data.latitude){
//                   data.latitude = parseFloat(data.latitude);
//                 }
//                 locationsz = [data.longitude,data.latitude];
//                 fncallback(locationsz);
//             })
//         }catch(e){
//           window.alert(`获取地理位置失败(getcurrentlocationfn)
//           ${JSON.stringify(e)}`);
//             fncallback(locationsz);
//         }
//
// }
