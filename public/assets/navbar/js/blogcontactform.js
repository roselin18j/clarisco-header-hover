
document.addEventListener("DOMContentLoaded", function () {
  var phoneInput = document.querySelector("#mob_phone_portfolio");
  var hiddenInput = document.querySelector("#mob");

  var phoneIti = window.intlTelInput(phoneInput, {
    initialCountry: "IN",
    separateDialCode: true,
    hiddenInput: "phone",
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
  });



  phoneInput.addEventListener('blur', function () {
    var fullNumber = phoneIti.getNumber();
    hiddenInput.value = fullNumber;
    console.log("Full Number:", fullNumber);
  });


  $.validator.addMethod("validIntlPhone", function (value, element) {

    const iti = window.intlTelInputGlobals.getInstance(element);

    if (!value.trim()) return false;

    // Remove all formatting characters
    const cleaned = value.replace(/[^\d+]/g, "");

    return iti.isValidNumber();

  }, "Enter valid mobile number");

  phoneInput.addEventListener("paste", function () {

    setTimeout(function () {

      // Remove everything except digits
      let cleaned = phoneInput.value.replace(/\D/g, "");

      // Remove leading country code if duplicated
      const countryCode = phoneIti.getSelectedCountryData().dialCode;

      if (cleaned.startsWith(countryCode)) {
        cleaned = cleaned.slice(countryCode.length);
      }

      // Set cleaned value back to input
      phoneInput.value = cleaned;

      // Trigger intl-tel-input to reformat properly
      phoneIti.setNumber("+" + countryCode + cleaned);

      console.log("Full Number:", phoneIti.getNumber());

    }, 0);

  });

  // --- Country selector input ---
  var countryInput = document.querySelector("#country_selector_portfolio");

  var countryIti = window.intlTelInput(countryInput, {
    initialCountry: "IN",
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
    separateDialCode: false,
  });

  // Set initial country name
  countryInput.value = countryIti.getSelectedCountryData().name;

  // When country changes, update mobile phone input country
  countryInput.addEventListener('countrychange', function () {
    var selectedCountry = countryIti.getSelectedCountryData();
    countryInput.value = selectedCountry.name;

    // Update phone input country
    // phoneIti.setCountry(selectedCountry.iso2);
    // console.log("Phone input country set to:", selectedCountry.iso2);
  });

})





$(document).ready(function () {
  $("#blogcreate").validate({
    rules: {
      name: {
        required: true,
        normalizer: function (value) {
          return $.trim(value); // removes leading & trailing spaces
        },
        pattern: /^[a-zA-Z\s]+$/ // only letters and spaces
      },
      email: {
        required: true,
      },
      mob_phone: {
        required: true,
        validIntlPhone: true
      },
      country: {
        required: true,
      }

    },
    messages: {
      name: {
        required: "Enter name",
      },
      email: {
        required: "Enter email",
      },
      mob_phone: {
        required: "Enter phone",
      },
      country: {
        required: "Enter country",
      }
    },
    submitHandler: function (form, e) {
      var selectedcountrydetails = $(".iti__selected-flag").attr("title");
      var formData = $("#blogcreate").serialize();
      formData += "&current_path=" + encodeURIComponent(window.location.pathname);

      $.ajax({
        type: 'POST',
        url: window.location.origin + '/blog-small-form',
        data: formData,
        dataType: "json",
        success: function (result) {
          console.log(result.status)
          if (result.status === true) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: "generate_lead",
              eventCallback: function () {
                window.location.href = "/thankyou"; // redirects AFTER GTM fires the tag
              },
              eventTimeout: 2000 // fallback: redirect after 2 seconds even if GTM fails
            });
          }
          else {
            alert("Please Verify")
            res.status(404).render('common/404', { title: " Sorry, page not found" });
          }
        },
        error: function (error) {
          console.log(error)
        }
      });
    },
  });
}); 