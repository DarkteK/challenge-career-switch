export async function getToken() {
  // Variables.
  const tokenURL = new URL("https://rooftop-career-switch.herokuapp.com/token");
  const mailToken = "cs.gamegonzalo@gmail.com";
  tokenURL.searchParams.set('email', mailToken);

  // Fetch token from the endpoint.
  return await fetch(tokenURL)
    .then(function(response) {
      if (response.status === 200) {
        return response.json();
      }
    }).then(function(data) {
      return data.token;
    })
    .catch(function(error) {
      console.log('There was an issue obtaining the Token');
      return "Error";
    });
}
