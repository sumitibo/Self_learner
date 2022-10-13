const axios = require("axios");
function checkForDifferencesOfAttributes(manipulatedData) {
  axios
    .get(
      `https://services-dev.ibo.com/catalog/v1/categories/merchandising/101011?catalog_version=ONLINE&include_attribute_lovs=true`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkFBcU9GbzVILUhSek9VRl9ENVhZVyJ9.eyJpc3MiOiJodHRwczovL2Vib21hcnQudXMuYXV0aDAuY29tLyIsInN1YiI6IlRnM21kc1FITGtUSE1CZUlWb01ReGI4QnUxTjVLWmtFQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3NlcnZpY2VzLmliby5jb20iLCJpYXQiOjE2NjM4NDgwMTIsImV4cCI6MTY2NjQ0MDAxMiwiYXpwIjoiVGczbWRzUUhMa1RITUJlSVZvTVF4YjhCdTFONUtaa0UiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.saDYua0GBGI4puqIjz2mjThScKB5NlRtJ8aOPF3qiagCj9ckBigsJW6r_jt0qgIcbos5qhpV6VaidgJLCAYRZ6Ilr5x4_mPxbE_mMihwAKtAEg-k9j-PqwUSwTQmc9rmE0w5jJAo-ryIP-bnXAg3u3qRU3VmT2E_jjlusD3Fa9gSbU34Vjgt8zZRtt4I_ialobbzTI1Wcx3obL2mVeH-16VqLxeWvsKwukxuW0xZybcN_CxRZGMNhY1jJWjH8dn23xAbfG0vq-2iZ4XbuYn3fWiDeAARHphCfE2hrvMpCI15e1FkOLTVZ0uxx9N_Esz8qpw5PRv08bWuP80DzfiLdA",
        },
      }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch((err) => console.log(err));
}

checkForDifferencesOfAttributes();
