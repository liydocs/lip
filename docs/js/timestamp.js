function formatTimestamp(timestamp) {
  let date;
 

  if (timestamp.toString().length === 10) {
    // 10 位数时间戳，单位为秒
    date = new Date(timestamp * 1000);
  } else if (timestamp.toString().length === 13) {
    // 13 位数时间戳，单位为毫秒
    date = new Date(timestamp);
  } else if (timestamp.toString().length === 16) {
    // 16 位数时间戳，单位为微秒
    timestamp = Math.floor(timestamp / 1000);
    date = new Date(timestamp);
  } else {
    // 时间戳格式不正确 
    alert('输入格式有误');
    return '';
  }

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

document.addEventListener("DOMContentLoaded", function() {
  const convertButton = document.querySelector("button[type='submit']");
  const timestampInput = document.getElementById("timestamp");
  const out = document.getElementById("output");

  convertButton.addEventListener("click", (event) => {
    event.preventDefault();
    const timestamp = timestampInput.value;
    const formattedTime = formatTimestamp(timestamp);
    out.value = formattedTime;
  });
});