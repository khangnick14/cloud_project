const totalCasesNum = document.querySelector(".total-cases-num");
const deathsNum = document.querySelector(".deaths-num");
const recoveredNum = document.querySelector(".recovered-num");
const updatedTime = document.querySelector(".stats-update-time");

fetch("https://api.covid19api.com/summary")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data.Countries[76]);
    totalCasesNum.textContent = `${data.Countries[191].TotalConfirmed}`;
    deathsNum.textContent = `${data.Countries[191].TotalDeaths}`;
    recoveredNum.textContent = `${data.Countries[191].TotalRecovered}`;
    updatedTime.textContent = `${data.Countries[191].Date}`;
  });
