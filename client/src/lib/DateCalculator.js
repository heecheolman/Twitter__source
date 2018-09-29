function calculateSince(datetime) {
  const tTime = new Date(datetime);
  const cTime = new Date();
  let sinceMin = Math.round((cTime - tTime) / 60000);
  let since = '';
  if(sinceMin === 0) {
    let sinceSec = Math.round((cTime - tTime) / 1000);
    if(sinceSec<10)
      since = '10초 전';
    else if(sinceSec<20)
      since = '20초 전';
    else
      since = '방금 전';
  }
  else if(sinceMin === 1) {
    let sinceSec = Math.round((cTime - tTime) / 1000);
    if(sinceSec === 30)
      since = '방금 전';
    else if(sinceSec < 60)
      since = '1분 전';
    else
      since = '약 1분 전';
  }
  else if(sinceMin < 45)
    since = sinceMin + '분 전';
  else if(sinceMin > 44 && sinceMin < 60)
    since = '약 1시간 전';
  else if(sinceMin < 1440){
    let sinceHr = Math.round(sinceMin / 60);
    if(sinceHr === 1)
      since = '약 1시간 전';
    else
      since = '약 ' + sinceHr + '시간 전';
  }
  else if(1439 < sinceMin && sinceMin < 2880)
    since = '1일 전';
  else {
    let sinceDay = Math.round(sinceMin / 1440);
    since = sinceDay + ' 일 전';
  }
  return since;
};

export default calculateSince;
