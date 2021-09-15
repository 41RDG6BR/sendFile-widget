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

      var object = { 
        validateImage:function () {
          var file = imageFileEl.files[0];
          var allowedFiles = [".zip", ".rar"];
          var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$")

          if (!regex.test(file.name)) {
              lblErrorEl.innerHTML = "Please upload files having extensions: <b>" + allowedFiles.join(', ') + "</b> only."
              imageFileEl.value = '';
              return false;
          }
          
          var fsize = (file.size / 1024 / 1024).toFixed(2);  

          if (fsize > 2) {
            lblErrorEl.innerHTML = 'Max Upload size is 2MB only'
              imageFileEl.value = '';
              return false;
          }
          lblErrorEl.innerHTML = ''
          return true;
        }
      };
    
      var isValid = object.validateImage.bind(object)

      on(imageFileEl, 'change', function() {
        if(isValid(imageFileEl)) {
          customBtnEl.disabled = false
          fileToUploadEl.innerHTML = imageFileEl.value
        } else {
          fileToUploadEl.innerHTML = "No file chosen, yet"
        }
      })
    },

    onClose: function(){
      var lblErrorEl = this.lblError
      var formEl = this.form
      var fileToUploadEl = this.fileToUpload
      var customBtnEl = this.customBtn

      formEl.reset()
      customBtnEl.disabled = true
      lblErrorEl.innerHTML = ""
      fileToUploadEl.innerHTML = ""
    },
  });
});
