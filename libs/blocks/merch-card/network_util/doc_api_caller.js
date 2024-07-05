const cookie = "rtFa=4wgtX+B7KiadX ...."; // replace with your actual cookie


const getDoc = async () => {
  const url = "https://adobe-my.sharepoint.com/personal/ambsingh_adobe_com/_api/web/GetFolderByServerRelativeUrl('Documents')/Files('InnovateX3.docx')/$value";
  const options = {
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
  } catch (error) {
    console.error(`Fetch error: ${error}`);
  }
};



export default getDoc();