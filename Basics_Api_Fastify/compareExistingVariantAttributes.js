const axios = require("axios");
function checkForDifferencesOfAttributes(manipulatedData) {
  axios
    .get(
      `https://services-dev.ibo.com/catalog/v1/categories/merchandising/101011?catalog_version=ONLINE&include_attribute_lovs=true`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkFBcU9GbzVILUhSek9VRl9ENVhZVyJ9.eyJpc3MiOiJodHRwczovL2Vib21hcnQudXMuYXV0aDAuY29tLyIsInN1YiI6IkREUVdTQ0FIQ0s0NjE3amhtRmthaUFLMlVsaGZrMDBsQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3NlcnZpY2VzLWRldi5pYm8uY29tIiwiaWF0IjoxNjYzNzYxNjEyLCJleHAiOjE2NjYzNTM2MTIsImF6cCI6IkREUVdTQ0FIQ0s0NjE3amhtRmthaUFLMlVsaGZrMDBsIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.qnWlE9Wpsp7N5nApqir3d5oKaO_z1PSyEgCn1dgAPZwVRufk5nuZu2AQhUv-QaF_miLMkES0EpBGCbT_Y46FaT4NyVfBNP5NqaLkEYzX6EB4Bv7lkySX_w3nrautsEwvDzCr6SUuBZ5yP7lW1TC7gPlfzhQcn_i1yEyUyWzK7liMWmXUN74KuWTTm8yN1XhrNsezvmFC7ye4MAD0Mj3c1COGgL6WFPoL--ue86f8Bie0vaaMa_Z3EO_x9tYyBDhTB-iszFui6R0RWbzJ3nxgUrWtAPUS41nk3fVjXIe9vU3Ji52xtVnnmnnKuShmvFpqdRX5Yn8KIcrgCIBHzUh1UA",
        },
      }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch((err) => console.log(err));
}

checkForDifferencesOfAttributes();
