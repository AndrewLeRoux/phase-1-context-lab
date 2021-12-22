function createEmployeeRecord(array){
    return {
        'firstName': array[0],
        'familyName': array[1],
        'title': array[2],
        'payPerHour': array[3],
        'timeInEvents': [],
        'timeOutEvents': []
    }
}

function createEmployeeRecords(array) {
    const newArray = []
for (const arr of array) {
    newArray.push(createEmployeeRecord(arr))
}
return newArray
}


function createTimeInEvent(dateStamp){
    
    this.timeInEvents.push({
        'type': "TimeIn",
        'hour': parseInt(dateStamp.slice(11)),
        'date': dateStamp.slice(0,10)
    })

    return this
}

function createTimeOutEvent(dateStamp){

    this.timeOutEvents.push({
        'type': "TimeOut",
        'hour': parseInt(dateStamp.slice(11)),
        'date': dateStamp.slice(0,10)
    })

    return this
}

function hoursWorkedOnDate(inputDate){
    let timeInHour = 0
    let timeOutHour = 0
    for (const obj of this.timeInEvents){
        if (obj.date === inputDate) {
            timeInHour = obj.hour / 100
        }
    }
    for (const obj of this.timeOutEvents){
        if (obj.date === inputDate) {
            timeOutHour = obj.hour / 100
        }
    }
    return timeOutHour - timeInHour

}

function wagesEarnedOnDate(inputDate){
return hoursWorkedOnDate.call(this, inputDate) * this.payPerHour
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName){
    for (const arr of srcArray){
        if (arr.firstName === firstName){
            return arr
        }
    }
}


function calculatePayroll(array){
    let totalPayrollValue = 0
    for (let i = 0; i < array.length; i++){
        totalPayrollValue = totalPayrollValue + allWagesFor.call(array[i])
    }
    return totalPayrollValue
}
