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

    for (var i = 0; i < blocksData.length; i++) {
      let firstString = blocksData[i];
      stringBlocks.push(await joinBlocksData(firstString, blocksData, validateBlocksURL));
    }

    let stringBlocksOrdered = [stringBlocks[0][0]];

    for(let i = 0; i < stringBlocks.length-1; i++) {
      stringBlocksOrdered.push(orderBlocks(stringBlocks, stringBlocksOrdered.at(-1)));
    }

    return stringBlocksOrdered;

  } else {
    return "Error validating the block data."
  }
}

async function joinBlocksData(stringBlock, arrayBlock, validateBlocksURL) {
  for(let i = 0; i < arrayBlock.length; i++) {

    if(arrayBlock[i] === stringBlock) {
      continue;
    }

    let _data = { blocks: [stringBlock, arrayBlock[i]] }
    let messageValidated = await validateStringBlocks(validateBlocksURL, _data);

    if (messageValidated) {
      return [stringBlock, arrayBlock[i]];
    }

  }
  // If we don't find any match, it means that's the last string.
  return [stringBlock, stringBlock];

}

async function validateStringBlocks(validateBlocksURL, _data) {
  return await fetch(validateBlocksURL, {
    method: "POST",
    body: JSON.stringify(_data),
    headers: {"Content-type": "application/json"}
  })
    .then(response => response.json())
    .then(json => json.message)
    .catch(() => false);
}

function orderBlocks(stringBlocks, string){
  let returnBlocks = '';

  for(let i = 0; i < stringBlocks.length; i++){
    if (stringBlocks[i][0] === string) {
       return returnBlocks = stringBlocks[i][1];
    }
  }
}

async function validateEncodedString(result, tokenKey) {
  let _data = {encoded: result.join('')};
  let validateBlocksURL = new URL("https://rooftop-career-switch.herokuapp.com/check");
  validateBlocksURL.searchParams.set('token', tokenKey);

  let resultCheck = await validateStringBlocks(await validateBlocksURL, _data);
  if (await resultCheck) {
    return "Entire String was validated properly";
  } else {
    return "Entire String was not validated properly";
  }
}

let result = await check(getBlocks, tokenKey);
let checkingMessage = await validateEncodedString(await result, tokenKey);
console.log(checkingMessage);
