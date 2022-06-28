import { getToken }  from './getToken';

let blocksURL = new URL("https://rooftop-career-switch.herokuapp.com/blocks");
const tokenKey = await getToken();
blocksURL.searchParams.set('token', tokenKey);

// Fetch blocks data from the endpoint.
let getBlocks =  await fetch(blocksURL)
  .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
  }).then(data => data.data)
  .catch(function() {
    console.log('There was an issue obtaining the blocks data.');
    return "Error";
  });

export default getBlocks;
