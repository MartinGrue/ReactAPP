export const combineDateAndTime = (date: Date, time: Date) => {
  const timeString = time.getHours() + ':' + time.getMinutes() + ':00';
  console.log("timeString");
  console.log(timeString);
  const year = date.getFullYear();
  console.log("year")
  console.log(year);
  const month = date.getMonth() + 1;
  console.log("month")
  console.log(month);
  const day = date.getDate();
  console.log("day")
  console.log(day);
  const DateString = `${year}-${month}-${day}`;
  console.log("DateString")
  console.log(DateString);
  return new Date(DateString + ' ' + timeString);
};
