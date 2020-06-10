import RNFetchBlob from 'rn-fetch-blob';

export const clearCache = async () => {
  try {
    const {unlink, dirs} = RNFetchBlob.fs;
    await unlink(dirs.DocumentDir + '/.mplay');
  } catch (e) {
    console.log(e);
  }
};
