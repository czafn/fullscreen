import config from '../env/config';
// import streamSaver from 'streamsaver';
// import map from 'lodash.map';
const fetchurl =`${config.serverurlrestful}`;

const getForm =(url, target, value, method)=> {

  let form = document.createElement("form");
  form.method = method;
  form.action = url;
  form.target = target;

  let input = document.createElement("input");
  input.type = "hidden";
  input.value = value;
  input.name = 'tokenid';

  form.appendChild(input);

  return form;
};

const statusHelper = (response)=> {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

// const toHex =(str)=> {
//     var result = '';
//     for (var i=0; i<str.length; i++) {
//       result += str.charCodeAt(i).toString(16);
//     }
//     return result;
//   };

const restfulapi = {
  getexcelfile({type,tokenid}){
    return new Promise((resolve,reject) => {
      const form = getForm(`${fetchurl}/${type}`, "_self", tokenid, "post");
      document.body.appendChild(form);
      form.submit();
      form.parentNode.removeChild(form);
      resolve();
      //  fetch(`${fetchurl}/${type}`, {
      //   method  : 'POST',
      // headers: {
      //             "Authorization": "Bearer " + $('#tokenField').val()
      //          },
      //   headers : {
      //     'Content-Type'  : 'application/json'
      //   },
      //   body    : JSON.stringify(query)
      // })
      // .then(res => {
      // 	const fileStream = streamSaver.createWriteStream(`${type}.csv`)
      // 	const writer = fileStream.getWriter()
      // 	// Later you will be able to just simply do
      // 	// res.body.pipeTo(fileStream)
      //
      // 	const reader = res.body.getReader()
      // 	const pump = () => reader.read()
      // 		.then(({ value, done }) => done
      // 			// close the stream so we stop writing
      // 			? writer.close()
      // 			// Write one chunk, then get the next one
      // 			: writer.write(value).then(pump)
      // 		)
      //
      // 	// Start the reader
      // 	pump().then(() =>{
      //     resolve();
      //   });
      // });
    });
  },
  getdevicegeo (userData) {
    return fetch(`${fetchurl}/getdevicegeo`)
    .then(statusHelper)
    .then(response => response.json());
  },
  getdownloadtoken({query,usertoken}){
    // const data = toHex(JSON.stringify(query));
    return fetch(`${fetchurl}/getexporttoken`, {
      method  : 'POST',
      headers : {
        'Accept'        : 'application/json',
        'Content-Type'  : 'application/json',
        'Authorization': "Bearer " +usertoken
      },
      body    :JSON.stringify(query)
    })
    .then(statusHelper)
    .then(response => response.json());

  },
  gethistorytrack (userData) {
    return fetch(`${fetchurl}/gethistorytrack`, {
      method  : 'POST',
      headers : {
        'Accept'        : 'application/json',
        'Content-Type'  : 'application/json'
      },
      body    : JSON.stringify(userData)
    })
    .then(statusHelper)
    .then(response => response.json());
  },
};


export default restfulapi;
