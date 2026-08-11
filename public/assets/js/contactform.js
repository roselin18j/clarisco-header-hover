document.addEventListener("DOMContentLoaded", function () {
  // --- Mobile phone input ---
  var phoneInput = document.querySelector("#mob_phone");
  var hiddenInput = document.querySelector("#phone");

  // Initialize phone input
  var phoneIti = window.intlTelInput(phoneInput, {
    initialCountry: "IN",
    separateDialCode: true,
    hiddenInput: "phone",
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
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


  // Disable country flag dropdown — lock it
  // phoneInput.parentNode.querySelector(".iti__flag-container").style.pointerEvents = "none";

  phoneInput.addEventListener('blur', function () {
    var fullNumber = phoneIti.getNumber();
    hiddenInput.value = fullNumber;
    console.log("Full Number:", fullNumber);
  });


  // --- Country selector input ---
  var countryInput = document.querySelector("#country_selector");

  var countryIti = window.intlTelInput(countryInput, {
    initialCountry: "IN",
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
    separateDialCode: false,
  });

  // Set initial country name
  countryInput.value = countryIti.getSelectedCountryData().name;

  // When country changes, sync phone input
  countryInput.addEventListener('countrychange', function () {
    var selectedCountry = countryIti.getSelectedCountryData();
    countryInput.value = selectedCountry.name;

    // Sync phone input country
    // phoneIti.setCountry(selectedCountry.iso2);
    // console.log("Phone input country locked to:", selectedCountry.iso2);
  });

  // Optional: prevent user typing country name directly (use dropdown only)
  countryInput.addEventListener("input", function () {
    this.value = countryIti.getSelectedCountryData().name;
  });


});


// $("#footercontact").validate({
//   rules: {
//     name: {
//       required: true,
//     },
//     email: {
//       required: true,
//     },
//     mob_phone: {
//       required: true,
//       digits: true
//     },
//     requirement: {
//       required: true,
//     },
//     skype: {
//       required: true,
//     },
//     country_selector: {
//       required: true,
//     },
//     message: {
//       required: true,
//     },
//   },
//   messages: {
//     name: {
//       required: "Enter Name",
//     },
//     email: {
//       required: "Enter email",
//     },
//     mob_phone: {
//       required: "Enter phone",
//       digits: "Allowed number only"
//     },
//     skype: {
//       required: "Enter skype",
//     },
//     requirement: {
//       required: "Enter requirement",
//     },
//     country_selector: {
//       required: "Enter Country",
//     },
//     message: {
//       required: "Enter message",
//     },
//   },
//   // errorPlacement: function (error, element) {
//   //   console.log({error})
//   //   console.log(element.attr("name"))
//   //   if (element.attr("name") === "requirement") {
//   //     error.insertAfter(".service-check"); // place error below checkboxes
//   //   } else {
//   //     error.insertAfter(element);
//   //   }
//   // },
//   submitHandler: function (form, e) {
//     console.log({ form }, { errir: e })
//     $("#contact_submit_btn").prop("disabled", true);
//     $("#contact_submit_btn-2").hide();
//     $(".spinner-border").show();
//     $.ajax({
//       type: 'POST',
//       url: window.location.origin + '/contact_submit',
//       data: $("#footercontact").serialize(),
//       dataType: "json",
//       success: function (result) {
//         console.log('result', result)
//         if (result.status == true) {
//           window.location.href = "/thankyou";
//         }
//       },
//       error: function (error) {
//       }
//     }).done((result) => {
//       if (!result.status) {
//         alert("ReCaptcha Error!")
//       };
//     });
//   },
// });





$(document).ready(function () {

  $("#footercontact").validate({
    ignore: [], // ✅ ensures hidden fields & checkboxes are validated too
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
        email: true,
      },
      mob_phone: {
        required: true,
        validIntlPhone: true
      },
      country_selector: {
        required: true,
      },
      requirement: {
        required: true,
      },
      message: {
        required: true,
        normalizer: function (value) {
          return $.trim(value);
        },
        pattern: /^[a-zA-Z0-9\s.,!?@#$%^&*()_+=:'"\/\\[\]|`~-]+$/
        // pattern: /^[a-zA-Z0-9\s.,!?-]+$/ // allow limited safe characters
      },
      // ✅ we’ll handle requirement manually below (for checkbox group)
    },
    messages: {
      name: {
        required: "Enter your name",
      },
      email: {
        required: "Enter your email",
        email: "Please enter a valid email address",
      },
      mob_phone: {
        required: "Enter your mobile number",
        digits: "Only numbers are allowed",
        minlength: "Enter a valid mobile number",
      },
      country_selector: {
        required: "Enter your country",
      },
      requirement: {
        required: "Enter your Service Requirement",
      },
      message: {
        required: "Enter your message",
      },
    },
    errorElement: "small",
    errorClass: "text-danger",

    errorPlacement: function (error, element) {
      if (element.attr("name") === "requirement") {
        error.insertAfter(".service-check");
      } else {
        error.insertAfter(element);
      }
    },
    submitHandler: function (form) {
      $("#contact_submit_btn").prop("disabled", true);
      $(".spinner-border").show();

      $.ajax({
        type: "POST",
        url: window.location.origin + "/contact_submit",
        data: $("#footercontact").serialize(),
        dataType: "json",
        success: function (result) {
          if (result.status === true) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: "generate_lead",
              eventCallback: function () {
                window.location.href = "/thankyou"; // redirects AFTER GTM fires the tag
              },
              eventTimeout: 2000 // fallback: redirect after 2 seconds even if GTM fails
            });
          } else {
            alert("ReCaptcha Error!");
          }
        },
        error: function (error) {
          console.error(error);
        },
        complete: function () {
          $("#contact_submit_btn").prop("disabled", false);
          $(".spinner-border").hide();
        }
      });
    }
  });

  $("#requirement").on("change", function () {
    $(this).valid();
  });

});