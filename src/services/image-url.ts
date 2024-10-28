// Optimizing images for the users who have slow internet connection

export default function getCroppedImageUrl( url: string ) {
  if (!url) return null;

  const target = "media/";

  // Finding the index of 'media/'
  const index = url.indexOf(target) + target.length; // output is integer

  /* To insert the crop parameter:
    slice the url from the beginning to the index,
    insert crop parameter,
    add rest of the url, starting from index till the end */
  return url.slice(0, index) + "crop/600/400/" + url.slice(index);
}