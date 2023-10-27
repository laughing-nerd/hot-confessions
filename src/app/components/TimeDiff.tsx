const TimeDiff = (props: { createdAt: string })=> {
  const creationDate = new Date(props.createdAt)
  const now = new Date();

  // @ts-ignore
  const diffInMilliseconds = now - creationDate;

  const minutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) {
    return "Just now";
  } else if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (days < 7) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else {
    // Format creationDate as "DD/MM/YYYY" or in a desired format
    const day = creationDate.getDate();
    const month = creationDate.getMonth() + 1;
    const year = creationDate.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

export default TimeDiff

