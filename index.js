// Function to create a single employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create multiple employee records
function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

// Function to record time in
function createTimeInEvent(employeeRecord, timestamp) {
    let [date, hour] = timestamp.split(" ");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return employeeRecord;
}

// Function to record time out
function createTimeOutEvent(employeeRecord, timestamp) {
    let [date, hour] = timestamp.split(" ");
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return employeeRecord;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find(e => e.date === date).hour;
    let timeOut = employeeRecord.timeOutEvents.find(e => e.date === date).hour;
    return (timeOut - timeIn) / 100;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
}

// Function to calculate all wages for an employee
function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.reduce((total, timeInEvent) => {
        return total + wagesEarnedOnDate(employeeRecord, timeInEvent.date);
    }, 0);
}

// Function to calculate payroll for multiple employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => {
        return total + allWagesFor(record);
    }, 0);
}
