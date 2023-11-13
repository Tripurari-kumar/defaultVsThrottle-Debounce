const input = document.querySelector('.text-input');
const defaultText= document.getElementById('default');
const debounceText=document.getElementById('debounce');
const throttleText=document.getElementById('throttle');

console.log(input, defaultText, debounceText, throttleText);

const updateDebounceText = debounce((text)=>{
 debounceText.textContent = text;
}, 1000);

const updateThrottleText = throttle((text)=>{
  throttleText.textContent = text;
 }, 1000);

input.addEventListener('input', (e)=>{
  defaultText.textContent= e.target.value;
  updateDebounceText(e.target.value);
  updateThrottleText(e.target.value);
})


function debounce(cb, delay=1000){
  let timer;
  return ((...args)=> {
     clearTimeout(timer);
     timer = setTimeout(()=>{
       cb(args);
    }, delay);
  })
}

function throttle(cb, delay=1000){
  let shouldWait= false;
  let waitingArgs;
  const timeoutFunc=()=>{
    if(waitingArgs==null){
      shouldWait=false;
    }else{
      cb(...waitingArgs);
      waitingArgs=null;
      setTimeout(timeoutFunc, delay);
    }
  }

  return (...args)=>{
    if(shouldWait){
      waitingArgs= args;
      return;
    }

    cb(...args);
    shouldWait=true;

    setTimeout(timeoutFunc, delay)
  }
}