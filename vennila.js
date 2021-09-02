function changingOrderOfString(str){
    var splitingStr = str.split("");
    var reversingStr = splitingStr.reverse();
    var reOrderingStr = reversingStr.join("");
    return reOrderingStr;
}
function checkingPalindrom(str){
    if (str === changingOrderOfString(str)){
        return true;
    }else{
        return false;
    }
}
function typeCastingDAte(obj){
    if(obj.day < 10){
        obj.day="0"+obj.day
    }else{obj.day.toString();}
    if(obj.month < 10){
        obj.month="0"+obj.month
    }else{obj.month.toString()}
    obj.year=obj.year.toString();
    return obj;
}
function toDateFormat(obj){
    obj=typeCastingDAte(obj)
    var ddmmyyyy =obj.day+obj.month+obj.year;
    var mmddyyyy=obj.month+obj.day+obj.year;
    var yyyymmdd=obj.year+obj.month+obj.day;
    var ddmmyy=obj.day+obj.month+obj.year.slice(-2);
    var mmddyy= obj.month+obj.day+obj.year.slice(-2);
    var yymmdd=obj.year.slice(-2)+obj.month+obj.day;
    var result =[ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]
    return result;
}
function checkPalindromForAllDateFormat(obj){
    var dateFormatList = toDateFormat(obj)
    for(let i=0;i<dateFormatList.length;i++){
        if (checkingPalindrom(dateFormatList[i])===true){
            return true;
        }
    }
}
function leapYear(year){
    if(year%400===0){
        return true
    } 
    if(year%100===0){
        return false;
    }if(year%4===0){
        return true;
    }
    
}
function nextDays(obj){
    const daysOfMonths =[31,28,31,30,31,30,31,31,30,31,30,31];
    var day=Number(obj.day)+1;
    var month=Number(obj.month);
    var year=Number(obj.year);
    if(month===2){
        if(leapYear(year)===true){
            if(day>29){
                day=1;
                month++
                }
            else{
                if(day>29){
                    day=1;
                    month++;
                }
            }
        }
    }else{
        if(day>daysOfMonths[month-1]){
            day=1;
            month++;
        }
    }
    if(month>12){
        month=1;
        year++
    }
    var result={
        day:day,
        month:month,
        year:year
    }
    return result;
}
function findingPalindromForNextDays(obj){
    var count=0;
    var nextday=nextDays(obj);
    while(1){
        count++;
        if(checkPalindromForAllDateFormat(nextday)==true){
            break;
        }
        nextday=nextDays(nextday);
    }
    return [count,nextday]
}
function previousDays(obj){
    const daysOfMonths =[31,28,31,30,31,30,31,31,30,31,30,31];
    var day=Number(obj.day)-1;
    var month=Number(obj.month);
    var year=Number(obj.year);
    if(month===3){
        if(leapYear(year)===true){
            if(day<1){
                day=29;
                month=month-1;
            }
        }else{
            if(day<1){
                day=daysOfMonths[month-2];
                month=month-1;
            }
        }
    }else{
        if(day<1){
            day=daysOfMonths[month-2];
            month=month-1;
        }
    }
    
    if(month<1){
        month=12;
        day=daysOfMonths[month-1]
        year=year-1; 
    }
    var result={
        day:day,
        month:month,
        year:year
    }
    return result;
}
function findingPalindromForPreviousDays(obj){
    var count=0;
    var previousday=previousDays(obj);
    while(1){
        count++;
        if(checkPalindromForAllDateFormat(previousday)==true){
            break;
        }
        previousday=previousDays(previousday);
    }
    return [count,previousday]
}
function findingShortPalindromDate(obj){
    var nextday =findingPalindromForNextDays(obj);
    var previousday =findingPalindromForPreviousDays(obj);
    if(nextday[0]<previousday[0]){
        return true;
    }else{
        return false;
    }
}
function clickHandler(){
   var userInputList=userInput.value.split('-')
//    console.log(userInputList)
   var date={
    day:Number(userInputList[2]),
    month:Number(userInputList[1]),
    year:Number(userInputList[0])
   }
   var checkBday=checkPalindromForAllDateFormat(date);
   if(checkBday===true){
       outPutDisplay("Your birth day is palindrom🥳🥳🥳");
   }
    else{
       if(findingShortPalindromDate(date)===true){
        var nxtday=findingPalindromForNextDays(date);
        outPutDisplay(nxtday[0]+" days left for next palindrom🤩🤩🔥🔥");
       }else{
           var prevday=findingPalindromForPreviousDays(date);
           outPutDisplay(" You missed "+prevday[0]+" days😕😕 from palindrom date.")
       }
   }
}
function outPutDisplay(msg){
    outPut.innerText=msg
}
const checkBtn=document.querySelector("#button");
const outPut=document.querySelector("#output");
const userInput=document.querySelector("#userinput");
checkBtn.addEventListener("click", ()=>{
    outPutDisplay("procedure⚙️⚙️........");
    setTimeout(mainFunction,2500);
});
function mainFunction(){
        if(userInput.value){
            clickHandler();
        }else{
            outPutDisplay("Enter the Date 1st😑😑......");
        }
}
