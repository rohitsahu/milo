const cookie = "rtFa=4wgtX+B7KiadX ...."; // replace with your actual cookie
const requestDigest = "0x085C998768F4FEB45B548DCA0FB8FF15954AAA728921616180AA006E9D20A6D562565CF422F83C5DAD8E265434313B83C02C668B4031FBE7A09063895678BE0E,05 Jul 2024 08:05:17 -0000"; // replace with your actual request digest

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

const updateDoc = async (docxContent) => {
  const url = "https://adobe-my.sharepoint.com/personal/ambsingh_adobe_com/_api/web/GetFolderByServerRelativeUrl('Documents')/Files('InnovateX3.docx')/$value";
  const options = {
    method: 'PUT',
    headers: {
      'Cookie': cookie,
      'X-RequestDigest': requestDigest,
      'Content-Type': 'application/octet-stream',
      'Content-Range': `bytes 0-${content.length-1}/${content.length}`
    },
    body: docxContent
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log('Document updated successfully');
  } catch (error) {
    console.error(`Fetch error: ${error}`);
  }
};


export default {
  updateDoc,
  getDoc
};