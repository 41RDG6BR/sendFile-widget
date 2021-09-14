define([
  'dojo/_base/declare', 
  'jimu/BaseWidget', 
  'dojo/on',
  './modules/person/Person',
  'dojo/_base/lang'
],
function(
  declare, 
  BaseWidget, 
  on,
) {

  return declare([BaseWidget], {

    baseClass: 'send-file',

    postCreate: function() {
      this.inherited(arguments);
      var imageFileEl = this.imageFile
      var fileToUploadEl = this.fileToUpload
      var lblErrorEl = this.lblError
      var customBtnEl = this.customBtn
      var formEl = this.form

      var object = { 
        validateImage:function () {
          var file = imageFileEl.files[0];
          var allowedFiles = [".zip", ".rar"];

          var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$")

          if (!regex.test(file.name)) {
              lblErrorEl.innerHTML = "Please upload files having extensions: <b>" + allowedFiles.join(', ') + "</b> only."
              // alert('Please select a valid image file');
              imageFileEl.value = '';
              return false;
          }
          
          var fsize = (file.size / 1024 / 1024).toFixed(2);  
          if (fsize > 10) {
            lblErrorEl.innerHTML = 'Max Upload size is 2MB only'
              imageFileEl.value = '';
              // document.getElementById(id).value = '';
              return false;
          }
          lblErrorEl.innerHTML = ''
          return true;
        }
      };
    
      var isValid = object.validateImage.bind(object)

      on(imageFileEl, 'change', function() {
        if(isValid(imageFileEl)) {
          fileToUploadEl.innerHTML = imageFileEl.value
          // .match(/[\/\\]([\w\d\s\.\-\(\)]+)$/[1])
        } else {
          fileToUploadEl.innerHTML = "No file chosen, yet"
        }
      })

      on(customBtnEl, 'click', function(e) {
        if(!isValid(imageFileEl)) {
          formEl.reset()
          e.preventDefault()
          lblErrorEl.innerHTML = "Please select files to upload having extensions: <b>" + allowedFiles.join(', ') + "</b> only.";
        }
      })
    },

    onClose: function(){
      var formEl = this.form
      formEl.reset()
      console.log('SendingFile::onClose');
    },

    // on(imageFileEl, "onProgress", function(data){
    //   console.warn("onProgress", data);
    //   dojo.byId("fileToUpload").value = "";
    //   dojo.forEach(data, function(d){
    //     dojo.byId("fileToUpload").value += "("+d.percent+"%) "+d.name+" \n";
    //   });
    // });
  
    // on(imageFileEl, "onComplete", function(data){
    //   console.warn("onComplete", data);
    //   dojo.forEach(data, function(d){
    //     dojo.byId("uploadedFiles").value += d.file+" \n";
    //     dojo.byId("rgtCol").innerHTML += imageHTML(d);//'<img src="'+d.file+'" />';
    //     rmFiles+=d.file+";";
    //   });
    // });
  });
});
