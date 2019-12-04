export const getDurationString = duration => {
  const durationDateObj = new Date(duration * 1000);
  const minutes = durationDateObj.getUTCMinutes();
  const seconds = durationDateObj.getUTCSeconds();

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const getImageFromID3Tag = ({imageBuffer, mime}) => {
    let base64ImageString = "";

    for(let data of imageBuffer.data){
        base64ImageString += String.fromCharCode(data);
    }

    return `data:${mime};base64,${window.btoa(base64ImageString)}`;
}
