"use strict";
const timeDisplay = document.getElementById("time");
const minsSpan = document.getElementById("mins");
const secsSpan = document.getElementById("secs");
const msecsSpan = document.getElementById("msecs");
const lapResetBtn = document.getElementById("lap_reset_btn");
const startStopBtn = document.getElementById("start_stop_btn");
const lapsWrapper = document.getElementById("laps_wrapper");
let mins=0;
let secs=0;
let msecs=0;
let timerInterval;
function toggleTimer()
{
    if(startStopBtn.innerText === "Start") 
    {
        timerInterval = setInterval(updateTime, 10);
        startStopBtn.innerText = "Stop";
        startStopBtn.classList.add("stop");
        lapResetBtn.innerText = "Lap";
    }
    else
    {
        clearInterval(timerInterval);
        startStopBtn.innerText = "Start";
        startStopBtn.classList.remove("stop");
        lapResetBtn.innerText = "Reset";
    }
}
function updateTime()
{
    msecs++;
    if(msecs === 100) 
    {
        msecs = 0;
        secs++;
    }
    if(secs === 60)
    {
        secs = 0;
        mins++;
    }
    if(mins === 60)
    {
        mins = 0;
    }
    msecsSpan.innerText = msecs < 10 ? `0${msecs}` : msecs;
    secsSpan.innerText = secs < 10 ? `0${secs}` : secs;
    minsSpan.innerText = mins < 10 ? `0${mins}` : mins;
}
function createLapOrReset()
{
    if(lapResetBtn.innerText === "Lap") 
    {
        createLap();
    } 
    else 
    {
        resetTimer();
    }
}
function createLap()
{
    const lapTime = timeDisplay.innerText;
    const lap = document.createElement("div");
    lap.className = "lap";
    lapsWrapper.prepend(lap);
    const lapNum = document.createElement("span");
    lapNum.className = "lap_num";
    lapNum.innerText = `Lap ${lapsWrapper.childElementCount}`;
    lap.appendChild(lapNum);
    const lapTimeDisplay = document.createElement("span");
    lapTimeDisplay.className = "lap_time";
    lapTimeDisplay.innerText = lapTime;
    lap.appendChild(lapTimeDisplay);
}
function resetTimer()
{
    mins = 0;
    secs = 0;
    msecs = 0;
    minsSpan.innerText = "00";
    secsSpan.innerText = "00";
    msecsSpan.innerText = "00";
    lapsWrapper.innerHTML = "";
}
startStopBtn.onclick = toggleTimer;
lapResetBtn.onclick = createLapOrReset;