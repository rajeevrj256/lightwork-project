const formatDate = (date) => {
  // Check if the input is a valid Date object and not an "Invalid Date"
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.error('Invalid date provided:', date);
    return '';
  }

  // Extract day, month, and year from the Date object
  const day = (`0${date.getDate()}`).slice(-2);
  const month = (`0${date.getMonth() + 1}`).slice(-2); // getMonth is zero-based; add 1
  const year = date.getFullYear();

  // Log the formatted date for debugging
  console.log(`Formatted date: ${day}/${month}/${year}`);

  // Return the formatted date
  return `${day}/${month}/${year}`;
};

export default formatDate;
