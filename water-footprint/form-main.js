function sendMail() {
  var products = document.getElementById("products").value;
  var options = document.getElementById("options").value;
  var mail = document.getElementById("mail").value;
  var phone = document.getElementById("phone").value;
  var deliveryAddress = document.getElementById("deliveryAddress").value;
  var sentCheckbox = document.getElementById("sent-checkbox");

  if (!products || !phone || !mail || !options || !deliveryAddress || !sentCheckbox.checked) {
      alert("Please fill out all fields");
      return;
  }


  var params = {
      products: products,
      options: options,
      mail: mail,
      phone: phone,
      deliveryAddress: deliveryAddress
  };

  const serviceID = "service_p73okba";
  const templateID = "template_eoi87hi";

  emailjs
      .send(serviceID, templateID, params)
      .then((res) => {
          document.getElementById("products").value = "";
          document.getElementById("options").value = "";
          document.getElementById("mail").value = "";
          document.getElementById("phone").value = "";
          document.getElementById("deliveryAddress").value = "";
          sentCheckbox.checked = false;
          conditionCheckbox.checked = false;
          console.log(res);
          alert("DreamVerser has successfully received your submission.");
          setTimeout(() => {
              window.location.reload();
          }, 3000);
      })
      .catch((err) => console.log(err));
}