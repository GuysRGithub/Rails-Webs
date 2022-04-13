document.addEventListener("turbolinks:load", function () {
  var instrumentImage = document.querySelector(".job-avatar");

  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    if (files == null) return
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; (f = files[i]); i++) {
      console.log(files.length);

      // Only process image files.
      if (!f.type.match("image.*")) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function (theFile) {
        return function (e) {
          var spanPreview = document.querySelector(
            ".avatar-preview-thumb.border-light"
          );

          console.log("Not Null", spanPreview == null);

          if (spanPreview != null) {
            spanPreview.setAttribute("src", e.target.result);
            spanPreview.setAttribute("title", escape(theFile.name));
            
          } else {
            // Render thumbnail.
            var span = document.createElement("span");
            span.innerHTML = [
              '<img class="avatar-preview-thumb border-light" src="',
              e.target.result,
              '" title="',
              escape(theFile.name),
              '"/>',
            ].join("");
            document.getElementById("list").insertBefore(span, null);
          }
        };
      })(f);
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  if (instrumentImage) {
    this.addEventListener("change", handleFileSelect, false);
  }
});
