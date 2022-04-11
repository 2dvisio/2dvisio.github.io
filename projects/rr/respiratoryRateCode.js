/*************************************************************
                        Demo breathing rate code
*************************************************************/

var arrayResp = []
var isFirstTime = true

var btnRespCount = document.getElementById('btnRespCount')
var mainCounter = document.getElementById('mainCounter')
var mainResult = document.getElementById('mainResult')

var mainCounterVal = 60
var intervalID = 0

function median(values) {
  values.sort( function(a,b) {return a - b} )

  var half = Math.floor(values.length/2)

  if(values.length % 2) {
    return values[half]
  } else {
    return (values[half-1] + values[half]) / 2.0
  }
}



function startMainCounter() {
  mainCounterVal = 60
  mainCounter.innerHTML = mainCounterVal

  intervalID = setInterval(function(){
    mainCounterVal--
    mainCounter.innerHTML = mainCounterVal

    if (mainCounterVal == 0) {
      btnRespCount.disabled = true
      mainCounter.innerHTML = "--"
      clearInterval(intervalID)
      mainResult.innerHTML = "Result: " + computeBreathingRate().toFixed(1) + " bpm"
    }
  }, 1000)

}


function computeBreathingRate(intervNew) {

  var intervals = []

  if (intervNew == null) {
    for (var i=1; i < arrayResp.length; i++) {
      intervals.push(Math.abs(arrayResp[i] - arrayResp[i-1]))
    }
  } else {
    intervals = intervNew
  }


  var medianB = median(intervals)
  var compliances = intervals.map(function(n) {return (Math.abs(n-medianB)/medianB)}) // compute the compliance
  var maxCompliance = Math.max.apply(null, compliances) // Return the MAX compliance

  if (maxCompliance >= 0.5) {
    // This means that we should re-compute
    // We recompute discarding the MAX one

    var goodBGs = []

    for (var i=0; i < compliances.length; i++) {
      if ( compliances[i] != maxCompliance) {
        goodBGs.push(intervals[i])
      }
    }

    return computeBreathingRate(goodBGs)
  } else {
    // This means that we have good data
    return 60 / (intervals.reduce(function(t,n){return t+n}, 0) / intervals.length / 1000)
  }

  return -1
}


function countRespiration() {

  if (isFirstTime) {
    isFirstTime = false
    startMainCounter()
  }


  btnRespCount.disabled = true

  setTimeout(function(){
    btnRespCount.disabled = false
  }, 300)


  var time = (new Date()).getTime()

  console.log(time)
  arrayResp.push(time)

  console.log(arrayResp)

}
