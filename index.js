import { getToken }  from './getToken';
import getBlocks   from './getBlocks';

const tokenKey = await getToken();
let stringBlocks = [];

/*
* Main function.
* */
async function check(blocksData, token) {
  if (token !== "Error" && blocksData !== "Error") {
    const validateBlocksURL = new URL("https://rooftop-career-switch.herokuapp.com/check");
    validateBlocksURL.searchParams.set('token', token);

    for (var i = 0; i < 1; i++) { //blocksData.length
      let firstString = blocksData[i];
      stringBlocks.push(await joinBlocksData(firstString, blocksData, validateBlocksURL));
    }
    console.log("AQUIIII1");
    console.log(stringBlocks);

    let stringBlocksOrdered = orderBlocks(stringBlocks);
    console.log(stringBlocksOrdered);

    return stringBlocksOrdered;

  } else {
    return "Error validating the block data."
  }
}

async function joinBlocksData(stringBlock, arrayBlock, validateBlocksURL) {
  for(let i = 0; i < arrayBlock.length; i++) {
    /*
    console.log(stringBlock);
    console.log(arrayBlock[i]);
    console.log(i);
*/
    if(arrayBlock[i] === stringBlock) {
      continue;
    }

    let _data = { blocks: [stringBlock, arrayBlock[i]] }
    let messageValidated = await validateStringBlocks(validateBlocksURL, _data);

    if (messageValidated) {
      return {[stringBlock]: arrayBlock[i]};
    }

  }
  // If we don't find any match, it means that's the last string.
  return {[stringBlock]: stringBlock};

}

async function validateStringBlocks(validateBlocksURL, _data) {
  return await fetch(validateBlocksURL, {
    method: "POST",
    body: JSON.stringify(_data),
    headers: {"Content-type": "application/json"}
  })
    .then(response => response.json())
    .then(json => json.message)
    .catch(err => false);
}

function orderBlocks(stringBlocks, string){
  let returnBlocks = [];
  for(var i in stringBlocks){
    console.log(i); // alerts key
    console.log(stringBlocks[i]); // alerts key
  }


  stringBlocks.forEach((element, index) => {
    console.log("canto");
    console.log(element);

    if (!string) {
      returnBlocks.push(index);
      returnBlocks.push(orderBlocks(stringBlocks, element));
    } else {
      if (index === string) {
        returnBlocks.push(index);
        returnBlocks.push(orderBlocks(stringBlocks, element));
      }
    }
  })
  return returnBlocks;
}

console.log(await check(getBlocks, tokenKey));