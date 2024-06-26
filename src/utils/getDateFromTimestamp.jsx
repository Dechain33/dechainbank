export const dateAndTimeFromTimeStamp = (timestamp) => {
  const milliseconds = timestamp * 1000;

  const dateObject = new Date(milliseconds);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1; // Months are zero-based, so we add 1
  const day = dateObject.getDate();
  // const hours = dateObject.getHours();
  // const minutes = dateObject.getMinutes();
  // const seconds = dateObject.getSeconds();

  return `${year}/${month}/${day}`;
  // time: `${hours}:${minutes}:${seconds}`,
};
