//jshint esversion:6

// listen to UPload a pic
document
  .querySelector('input[type="file"]')
  .addEventListener("change", function () {
    if (this.files && this.files[0]) {
      var img = document.querySelector("img");
      img.onload = () => {
        //procsses the image
        const dataImage = tf.browser
          .fromPixels(img)
          .resizeBilinear([128, 128]);

        const preprocessedInput = dataImage.expandDims();
        const preprocessedInputToArray = preprocessedInput.arraySync();

        console.log(preprocessedInputToArray);
        sendToServer(preprocessedInputToArray);
        //predict(preprocessedInput);
        URL.revokeObjectURL(img.src); // no longer needed, free memory
      };

      img.src = URL.createObjectURL(this.files[0]); // set src to blob url
    }
  });


//function cald from url image

function imgUrl() {
  const form_image = document.getElementById("url");

  var img = new Image();
  img.crossOrigin = "anonymous";
  img.src = form_image.value;
  console.log(img.src);

  img.onload = () => {
    //procsses the image
    document.getElementById("myImg").src = img.src;
    const dataImage = tf.browser
      .fromPixels(img)
      .resizeBilinear([128, 128]);

    const preprocessedInput = dataImage.expandDims();
    const preprocessedInputToArray = preprocessedInput.arraySync();

    sendToServer(preprocessedInputToArray);
    URL.revokeObjectURL(img); // no longer needed, free memory
  };
}


// function that send the image details to the server, then in the server make req to WML API, 
// then response the score
function sendToServer(data) {

  axios({
    method: 'post',
    url: '/api/wml/score',
    data: { data }
  }).then(function (response) {

    const cat = JSON.stringify(response.data.predictions[0].values[0][0]);
    const dog = JSON.stringify(response.data.predictions[0].values[0][1]);
    console.log(cat, dog);

    //update the HTML with the scores
    $("#catScore").html(cat * 100 + "%,");
    $("#dogScore").html(dog * 100 + "%");

  })
    .catch(function (error) {
      console.log("3" + error);

    });
}
