importScripts("lzma-d.js");


function base64ToByteArray(base64) {
  var raw = atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));
  for(i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

self.onmessage = function (e) {

//the message here is a url hash


const array = base64ToByteArray(e.data.replace("#",""))

 LZMA.decompress(array, function(result, error) {
   if (!(typeof result === 'string')) result = new Uint8Array(result);
   if (error) console.error(error);
   console.log("Decoded result is:" + result);
   self.postMessage(result);
 });



}
