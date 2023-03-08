let outputScreen = document.getElementById('outputScreen')
const display = (num) => {
  outputScreen.value += num
}
function calculate() {
  try{
  outputScreen.value = eval(outputScreen.value)
  }

  catch(err){
  alert('Invalid')
  }
}

const Clear = () => {
  outputScreen.value = "";
}

const del = () => {
  outputScreen.value = outputScreen.value.slice(0, -1)
}