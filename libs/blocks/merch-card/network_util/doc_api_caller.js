const cookie = "rtFa=4wgtX+B7KiadXbqhUnLHonr5ciK3x5DpzQOlTcT6WW0mNjU5OTZhYjgtOTUyOS00YTlmLWJjNWMtYzRiZTkxMWVlZWM4IzEzMzY0NjE4NDE3MTA1MDgyNiNiYzJjMzlhMS01MDMxLTUwMDAtZTE3OS02YmY2N2U0NTZiYzcjYW1ic2luZ2glNDBhZG9iZS5jb20jMTkyNjc0I0VQNHVieGJETWZfeVlCOUFtMTBWU2xPQmVTOJnukMN2Z7mJJBhQrEnpnrkTpJsREzf384Th2eJ2WgX4oa4Lp6vUwEY+WML+EpJiv3NbaEouzqMWQ9aOWrFOggPMVi/JHZrWMVS8cADu75Sw3nuBCIwnKjRWe/E3x9GjQ3FxDNhdW0uadgyUPuB+SfFQUaixAKbp0NRBBEQWh/NJXsr4Q6IO9CG8v6MsSsGjIYE500vJ/UHBpYfCHSPy/Muj064hcZy8vwZd1q6tOpijy27/rQ2lk4AMRGwwZJwElY3RyS3qsRjmtOPxIUUym/jmtP5/kNzUwFyBz0yVtddWphGG4cubq6hhWwRKXVYz3kIuIY1EeABU9M/Ji9Q3oHG1AAAA; FedAuth=77u/PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48U1A+VjEzLDBoLmZ8bWVtYmVyc2hpcHwxMDAzMjAwMGE2MGM4OTY1QGxpdmUuY29tLDAjLmZ8bWVtYmVyc2hpcHxhbWJzaW5naEBhZG9iZS5jb20sMTMzNjQ1NDEyMTQwMDAwMDAwLDEzMzYxNDM3MTE2MDAwMDAwMCwxMzM2NTA1MDQxNzEwNTA3ODUsMjQwNToyMDE6NTAwMDo4MDcwOjk4YzU6NTlhNDpkZjJhOjkyY2EsNjcsNjU5OTZhYjgtOTUyOS00YTlmLWJjNWMtYzRiZTkxMWVlZWM4LCw0ZWViYjQ4Yy05YzFmLTRjMjEtOGEwMi1lZDAyNWU4NjVmNGQsYmMyYzM5YTEtNTAzMS01MDAwLWUxNzktNmJmNjdlNDU2YmM3LGJjMmMzOWExLTUwMzEtNTAwMC1lMTc5LTZiZjY3ZTQ1NmJjNywsMCwxMzM2NDYyMjAxNjk0ODgzNDAsMTMzNjQ4Nzc2MTY5NDg4MzQwLCwsZXlKNGJYTmZZMk1pT2lKYlhDSkRVREZjSWwwaUxDSjRiWE5mYzNOdElqb2lNU0lzSW5CeVpXWmxjbkpsWkY5MWMyVnlibUZ0WlNJNkltRnRZbk5wYm1kb1FHRmtiMkpsTG1OdmJTSXNJblYwYVNJNklsQnBjM053WnpGdVJ6QlRWMmhaU0V0aVNrVTVRVUVpZlE9PSwyNjUwNDY3NzQzOTk5OTk5OTk5LDEzMzY0NjE4NDE2MDAwMDAwMCxmZjFiM2NkOS1iYzY0LTRlM2ItOGMyOC0zYmJjNWE0YTMwOGEsLCwsLCwxMTUyOTIxNTA0NjA2ODQ2OTc2LCwxOTI2NzQsRGFEQWZqUVFtcHlPWHgyUnJLX1c1bHZvTFo0LHJZNHN4YVpYR09kMTd4VXR0bjNNVk5zSWE1SGdVK2dJT0M2VS9mc2FyNjhDUTJnRzhGekdyUG9Tb1RxWFlXVUVHM29ucDNjcVFEQVpLY290T2t2WVVWemFBbmpRUjhHc0F4dVZXNmxnWTNTdUVCNlBrZklja0ltd2VUb0I0Smo3OCt1d0xLRlNBeTJKb1RadlByNU5uMEg5TWFYb3JjS0JKdFdxMk5XdTE2VFc5eldYZGNaRGtCVGhocE4xZkxyaUFDOFRKVVRVNy8wamRMcVV3WVBIczZCZmRUS0RYbEgvZlJqRVF6NWVlN0J5Q25MYmV3RVdmNm92Y2doejJZM3VOL2JoVUJXdzFta0R5SlB2OG1uZjVKM2cvUmFvOVFWTnpYSzhld291dU5UZmd3UnkxYzZjM0hTbGN4RUVRM2FOamZzQTM2SWtxbXE2ZEl5RnZjT3UxUT09PC9TUD4=;"; // replace with your actual cookie
const filename = "InnovateX4.docx";//TODO replace this with the actual file name
const folder = "Documents";//replace this with the folder
const site = "ambsingh_adobe_com";
let requestDigest = "";
export const getDoc = async () => {
  const url = "https://adobe-my.sharepoint.com/personal/"+ site +"/_api/web/GetFolderByServerRelativeUrl('"+ folder +"')/Files('" + filename + "')/$value";

  //const url = "https://adobe-my.sharepoint.com/personal/ambsingh_adobe_com/_api/web/GetFolderByServerRelativeUrl('Documents')/Files('InnovateX3.docx')/$value";
  const options = {
    method:"GET",
    credentials: 'include',
    headers: {
      'Cookie': cookie
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text(); // or response.json() if the response is JSON
    console.log(data);
    return data;
  } catch (error) {
    console.error(`Fetch error: ${error}`);
  }
};

const getContext = async () => {
  const url = "https://adobe-my.sharepoint.com/personal/" + site + "/_api/contextinfo";
  const options = {
    method:"GET",
    headers: {
    'Cookie' : cookie,
    'Accept': "application/json;odata=verbose"
    }
  }

  try {
    const response = await fetch(url, options);
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const jsonData = JSON.parse(data);
    console.log(jsonData.d.GetContextWebInformation.FormDigestValue);
    requestDigest = jsonData.d.GetContextWebInformation.FormDigestValue;
    return jsonData.d.GetContextWebInformation.FormDigestValue;
  } catch(error) {
    console.error(`Fetch error: ${error}`);
  }
};

/**
 * curl --location --request PUT 'https://adobe-my.sharepoint.com/personal/ambsingh_adobe_com/_api/web/GetFolderByServerRelativeUrl('\''Documents'\'')/Files('\''InnovateX3.docx'\'')/$value' \
--header 'Cookie: rtFa=4wgtX+B7KiadXbqhUnLHonr5ciK3x5DpzQOlTcT6WW0mNjU5OTZhYjgtOTUyOS00YTlmLWJjNWMtYzRiZTkxMWVlZWM4IzEzMzY0NjE4NDE3MTA1MDgyNiNiYzJjMzlhMS01MDMxLTUwMDAtZTE3OS02YmY2N2U0NTZiYzcjYW1ic2luZ2glNDBhZG9iZS5jb20jMTkyNjc0I0VQNHVieGJETWZfeVlCOUFtMTBWU2xPQmVTOJnukMN2Z7mJJBhQrEnpnrkTpJsREzf384Th2eJ2WgX4oa4Lp6vUwEY+WML+EpJiv3NbaEouzqMWQ9aOWrFOggPMVi/JHZrWMVS8cADu75Sw3nuBCIwnKjRWe/E3x9GjQ3FxDNhdW0uadgyUPuB+SfFQUaixAKbp0NRBBEQWh/NJXsr4Q6IO9CG8v6MsSsGjIYE500vJ/UHBpYfCHSPy/Muj064hcZy8vwZd1q6tOpijy27/rQ2lk4AMRGwwZJwElY3RyS3qsRjmtOPxIUUym/jmtP5/kNzUwFyBz0yVtddWphGG4cubq6hhWwRKXVYz3kIuIY1EeABU9M/Ji9Q3oHG1AAAA; FedAuth=77u/PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48U1A+VjEzLDBoLmZ8bWVtYmVyc2hpcHwxMDAzMjAwMGE2MGM4OTY1QGxpdmUuY29tLDAjLmZ8bWVtYmVyc2hpcHxhbWJzaW5naEBhZG9iZS5jb20sMTMzNjQ1NDEyMTQwMDAwMDAwLDEzMzYxNDM3MTE2MDAwMDAwMCwxMzM2NTA1MDQxNzEwNTA3ODUsMjQwNToyMDE6NTAwMDo4MDcwOjk4YzU6NTlhNDpkZjJhOjkyY2EsNjcsNjU5OTZhYjgtOTUyOS00YTlmLWJjNWMtYzRiZTkxMWVlZWM4LCw0ZWViYjQ4Yy05YzFmLTRjMjEtOGEwMi1lZDAyNWU4NjVmNGQsYmMyYzM5YTEtNTAzMS01MDAwLWUxNzktNmJmNjdlNDU2YmM3LGJjMmMzOWExLTUwMzEtNTAwMC1lMTc5LTZiZjY3ZTQ1NmJjNywsMCwxMzM2NDYyMjAxNjk0ODgzNDAsMTMzNjQ4Nzc2MTY5NDg4MzQwLCwsZXlKNGJYTmZZMk1pT2lKYlhDSkRVREZjSWwwaUxDSjRiWE5mYzNOdElqb2lNU0lzSW5CeVpXWmxjbkpsWkY5MWMyVnlibUZ0WlNJNkltRnRZbk5wYm1kb1FHRmtiMkpsTG1OdmJTSXNJblYwYVNJNklsQnBjM053WnpGdVJ6QlRWMmhaU0V0aVNrVTVRVUVpZlE9PSwyNjUwNDY3NzQzOTk5OTk5OTk5LDEzMzY0NjE4NDE2MDAwMDAwMCxmZjFiM2NkOS1iYzY0LTRlM2ItOGMyOC0zYmJjNWE0YTMwOGEsLCwsLCwxMTUyOTIxNTA0NjA2ODQ2OTc2LCwxOTI2NzQsRGFEQWZqUVFtcHlPWHgyUnJLX1c1bHZvTFo0LHJZNHN4YVpYR09kMTd4VXR0bjNNVk5zSWE1SGdVK2dJT0M2VS9mc2FyNjhDUTJnRzhGekdyUG9Tb1RxWFlXVUVHM29ucDNjcVFEQVpLY290T2t2WVVWemFBbmpRUjhHc0F4dVZXNmxnWTNTdUVCNlBrZklja0ltd2VUb0I0Smo3OCt1d0xLRlNBeTJKb1RadlByNU5uMEg5TWFYb3JjS0JKdFdxMk5XdTE2VFc5eldYZGNaRGtCVGhocE4xZkxyaUFDOFRKVVRVNy8wamRMcVV3WVBIczZCZmRUS0RYbEgvZlJqRVF6NWVlN0J5Q25MYmV3RVdmNm92Y2doejJZM3VOL2JoVUJXdzFta0R5SlB2OG1uZjVKM2cvUmFvOVFWTnpYSzhld291dU5UZmd3UnkxYzZjM0hTbGN4RUVRM2FOamZzQTM2SWtxbXE2ZEl5RnZjT3UxUT09PC9TUD4=;; rtFa=4wgtX+B7KiadXbqhUnLHonr5ciK3x5DpzQOlTcT6WW0mNjU5OTZhYjgtOTUyOS00YTlmLWJjNWMtYzRiZTkxMWVlZWM4IzEzMzY0NjE4NDE3MTA1MDgyNiNiYzJjMzlhMS01MDMxLTUwMDAtZTE3OS02YmY2N2U0NTZiYzcjYW1ic2luZ2glNDBhZG9iZS5jb20jMTkyNjc0I0VQNHVieGJETWZfeVlCOUFtMTBWU2xPQmVTOJnukMN2Z7mJJBhQrEnpnrkTpJsREzf384Th2eJ2WgX4oa4Lp6vUwEY+WML+EpJiv3NbaEouzqMWQ9aOWrFOggPMVi/JHZrWMVS8cADu75Sw3nuBCIwnKjRWe/E3x9GjQ3FxDNhdW0uadgyUPuB+SfFQUaixAKbp0NRBBEQWh/NJXsr4Q6IO9CG8v6MsSsGjIYE500vJ/UHBpYfCHSPy/Muj064hcZy8vwZd1q6tOpijy27/rQ2lk4AMRGwwZJwElY3RyS3qsRjmtOPxIUUym/jmtP5/kNzUwFyBz0yVtddWphGG4cubq6hhWwRKXVYz3kIuIY1EeABU9M/Ji9Q3oHG1AAAA; FedAuth=77u/PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48U1A+VjEzLDBoLmZ8bWVtYmVyc2hpcHwxMDAzMjAwMGE2MGM4OTY1QGxpdmUuY29tLDAjLmZ8bWVtYmVyc2hpcHxhbWJzaW5naEBhZG9iZS5jb20sMTMzNjQ1NDEyMTQwMDAwMDAwLDEzMzYxNDM3MTE2MDAwMDAwMCwxMzM2NTE1Mzc2MTEyMjYwMTcsMjQwNToyMDE6NTAwMDo4MDcwOjk4YzU6NTlhNDpkZjJhOjkyY2EsNjcsNjU5OTZhYjgtOTUyOS00YTlmLWJjNWMtYzRiZTkxMWVlZWM4LCw0ZWViYjQ4Yy05YzFmLTRjMjEtOGEwMi1lZDAyNWU4NjVmNGQsYmMyYzM5YTEtNTAzMS01MDAwLWUxNzktNmJmNjdlNDU2YmM3LDRhOGYzOWExLTIwYjYtNTAwMC1kYTc4LTZjMTI5YzEzZmMwZiwsMCwxMzM2NDcyNDMzNDI0NzI3NjQsMTMzNjQ5Nzk5MzQyNDcyNzY0LCwsZXlKNGJYTmZZMk1pT2lKYlhDSkRVREZjSWwwaUxDSjRiWE5mYzNOdElqb2lNU0lzSW5CeVpXWmxjbkpsWkY5MWMyVnlibUZ0WlNJNkltRnRZbk5wYm1kb1FHRmtiMkpsTG1OdmJTSXNJblYwYVNJNklsQnBjM053WnpGdVJ6QlRWMmhaU0V0aVNrVTVRVUVpZlE9PSwyNjUwNDY3NzQzOTk5OTk5OTk5LDEzMzY0NjE4NDE2MDAwMDAwMCxmZjFiM2NkOS1iYzY0LTRlM2ItOGMyOC0zYmJjNWE0YTMwOGEsLCwsLCwxMTUyOTIxNTA0NjA2ODQ2OTc2LCwxOTI2NzQsRGFEQWZqUVFtcHlPWHgyUnJLX1c1bHZvTFo0LFU2YS9iZUQxWWVySkx3TDZXc3lFTlJWRERiQUJRNHI5Qk9jeFpQQi9YdjdUREhsSFkvNVFOc0grZWw1aUVvZnJnK2wyYkF2ZkNYM3VhYWRRekwyeEpNQ25wK3I1L3RmZlhQWEM3am5kTkIyNlQ3R1Zha3g2RCtabnNTVGFydjFsY2VhbTNJdFZxdEJKUFltdnRhUk1tMjdyVkEweTRRTkNjaW1ZTFJxL2ZSQVRHc3NWU2h5K2xjRVBFZVVqNW9aL3RIamFJdWg4ZHEvSVhlTXJYZFV3NWkwVWV3WG40dEc1eENxazdoSXBDdlp4eGx5bHI4M0hiZkZPTEx2UTl5aWpJaFdJSjNudWN0ODRXaDdPZm1Fd3pEdjNuakViRkNNVCtBcDJlY0NGaVhXRTJqbkxmeFpyeU9JQ2h1a0pFUTMvOU1XTzBPUHY2Q2R3czVrYWEwVm5Jdz09PC9TUD4=' \
--header 'X-RequestDigest: 0x89B09B094E32A4B6B568DCDADB5BA96F7D5DAB11FB2B7557D33ECF14CF08FF4A4AB6A97F197F9F46CBF8CE2AE40B0971756A11DF43A81DEE1CF39364E9FBBE86,06 Jul 2024 06:26:13 -0000' \
--header 'Content-Type: application/octet-stream' \
--header 'Content-Range: bytes 0-1277951/1277952' \
--data '@/Users/ambsingh/Downloads/response4.docx'
 */
let retryCount = 0;
export const updateDoc =  async (file) => {
  const url = "https://adobe-my.sharepoint.com/personal/" + site + "/_api/web/GetFolderByServerRelativeUrl("+ folder +")/Files("+ file +")/$value";
  const formdata = new FormData();
  formdata.append("file", file, file.name);
  const options = {
    method:"PUT",
    headers: {
      'Cookie' : cookie,
      'X-RequestDigest' :requestDigest,
      'Content-Type': "application/octet-stream",
      'Content-Range': `bytes 0-${content.length-1}/${content.length}`
    },
    body: formdata
  }

  try {
    const response = await fetch(url, options);
    if(!response.ok) {
      if(response.status === 403 && retryCount===0) {
        console.log("Retry with new digest token");
        retryCount++;
        getContext();
        updateDoc(file);
      } else {
        throw new Error(`HTTP error for update Doc! status: ${response.status}`);
      }
    }
  } catch(error) {
    console.error(`Fetch error while updating document: ${error}`);
  }
}
