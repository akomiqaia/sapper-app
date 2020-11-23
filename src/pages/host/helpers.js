const MONTHNAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function zeropad(n) {
  return n < 10 ? "0" + n : n;
}

export function handleTimeFormating(timestamp) {
  const FULLDATE = new Date(timestamp);

  const WD = WEEKDAYS[FULLDATE.getDay()]
  const DD = FULLDATE.getDate();
  const MMM = MONTHNAMES[FULLDATE.getMonth()];
  const YYYY = FULLDATE.getFullYear()

  const HH = FULLDATE.getHours();
  const MM = FULLDATE.getMinutes();

  const DATE = `${zeropad(DD)} ${MMM}`;
  const TIME = `${zeropad(HH)}:${zeropad(MM)}`;

  return { DATE, TIME, WD, YYYY };
}

export function compareDates(prev, next) {
  const PREV = new Date(prev);
  const NEXT = new Date(next);

  const PREVDD = PREV.getDate() + " " + PREV.getMonth();
  const NEXTDD = NEXT.getDate() + " " + NEXT.getMonth();

  if (PREVDD != NEXTDD) {
    // i don't feel good about this comparison since i am comparing strings
    return true;
  }
  return false;
}

export function checkThinkIsLive(startDate, duration) {
  const NOW = new Date().getTime();
  const STARTTIME = new Date(startDate).getTime();
  const ENDTIME = STARTTIME + duration * 60000;
  if (NOW > STARTTIME && NOW < ENDTIME) {
    return true;
  }
  return false;
}

export async function fetchData(url) {
  const res = await fetch(`${process.env.BASE_API_URL}${url}`);
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    throw new Error(data);
  }
}
