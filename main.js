
var ArrOfJson = [];
var count = 0;
var calculationArray = [[undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined]];
function calcJacobian() {
    var myArr = document.forms.inputField;
    var myControls = myArr.elements;
    for (var i = 0; i < myControls.length; i++) {
        var aControl = myControls[i].getAttribute("name");;
        ArrOfJson.push({ "name": aControl, "status": true });
    }
    // for firsrt time call
    getRandomNumber().then((newValue) => {
        document.getElementsByName(newValue.name)[0].value = 2;
        var updateStatus = ArrOfJson.filter((obj) => {
            return obj.name === newValue.name;
        });
        var column = parseInt(newValue.name) % 10;
        var row = (Math.floor(parseInt(newValue.name) / 10));
        calculationArray[row][column] = 2;
        updateStatus[0].status = false;
    });
}

var getRandomNumber = () => {
    return new Promise((resolve, reject) => {
        count++;
        var emptyBox = ArrOfJson.filter((obj) => {
            return obj.status == true;
        });
        if (emptyBox.length === 0) {
            return resolve("null");
        } else {
            var random = getRandomInt(0, emptyBox.length - 1);
            return resolve({ "name": emptyBox[Math.floor(random)].name, "value": count % 8 === 0 ? 4 : 2 });
        }
    });
}

document.addEventListener("keydown", (event) => {
    switch (event.keyCode) {
        case 37:
            var shiftStatusArr = leftAdditionStart();
            if (shiftStatusArr.indexOf('false') !== -1) {
                common();
            }
            break;
        case 39:
            var shiftStatusArr = rightAdditionStart();
            if (shiftStatusArr.indexOf('false') !== -1) {
                common();
            }
            break;
        case 38:
            var shiftStatusArr = upAdditionStart();
            if (shiftStatusArr.indexOf('false') !== -1) {
                common();
            }
            break;
        case 40:
            var shiftStatusArr = downAdditionStart();
            if (shiftStatusArr.indexOf('false') !== -1) {
                common();
            }
            break;
    }
});

var leftAdditionStart = () => {
    var trueArr = [];
    for (var i = 0; i < 4; i++) {
        var cal = [];
        var cal = cal.concat(calculationArray[i]);
        var shiftedArr = leftShift(calculationArray[i]);
        var addedArray = leftAddition(shiftedArr);
        var addedShiftedArr = leftShift(addedArray);
        if ((cal.join() === shiftedArr.join()) && (addedArray.join() === shiftedArr.join())) {
            trueArr.push('true');
        } else {
            trueArr.push('false');
        }
        calculationArray[i] = addedShiftedArr;
        var cal = [];
    }
    return trueArr;
}

var upAdditionStart = () => {
    var trueArr = [];
    for (var i = 0; i < 4; i++) {
        var arr = [];
        for (var j = 0; j < 4; j++) {
            arr.push(calculationArray[j][i]);
        }
        var cal = [];
        var cal = cal.concat(arr);
        var shiftedArr = leftShift(arr);
        var addedArray = leftAddition(shiftedArr);
        var addedShiftedArr = leftShift(addedArray);
        if ((cal.join() === shiftedArr.join()) && (addedArray.join() === shiftedArr.join())) {
            trueArr.push('true');
        } else {
            trueArr.push('false');
        }
        for (var j = 0; j < 4; j++) {
            calculationArray[j][i] = arr[j];
        }
        var cal = [];
    }
    return trueArr;
}

var rightAdditionStart = () => {
    var trueArr = [];
    for (var i = 0; i < 4; i++) {
        var cal = [];
        var cal = cal.concat(calculationArray[i]);
        var shiftedArr = rightShift(calculationArray[i]);
        var addedArray = rightAddition(shiftedArr);
        var addedShiftedArr = rightShift(addedArray);
        if ((cal.join() === shiftedArr.join()) && (addedArray.join() === shiftedArr.join())) {
            trueArr.push('true');
        } else {
            trueArr.push('false');
        }
        calculationArray[i] = addedShiftedArr;
        var cal = [];
    }
    return trueArr;
}

var downAdditionStart = () => {
    var trueArr = [];
    for (var i = 0; i < 4; i++) {
        var arr = [];
        for (var j = 0; j < 4; j++) {
            arr.push(calculationArray[j][i]);
        }
        var cal = [];
        var cal = cal.concat(arr);
        var shiftedArr = rightShift(arr);
        var addedArray = rightAddition(shiftedArr);
        var addedShiftedArr = rightShift(addedArray);
        if ((cal.join() === shiftedArr.join()) && (addedArray.join() === shiftedArr.join())) {
            trueArr.push('true');
        } else {
            trueArr.push('false');
        }
        var cal = [];
        for (var j = 0; j < 4; j++) {
            calculationArray[j][i] = arr[j];
        }
    }
    return trueArr;
}

var leftShift = (arr) => {
    for (var i = 1; i <= arr.length; i++) {
        var j = i - 1;
        if (arr[i]) {
            while (j >= 0) {
                if (!arr[j]) {
                    // shift
                    arr[j] = arr[j + 1];
                    arr[j + 1] = undefined;
                    // update the value and status
                }
                j--;
            }
        }
    }
    return arr;
}

var leftAddition = (arr) => {
    for (var i = 0; i < 3; i++) {
        if (arr[i] === arr[i + 1] && arr[i] && arr[i + 1]) {
            arr[i] = arr[i] + arr[i + 1];
            arr[i + 1] = undefined;
        }
    }
    return arr;
}

var rightShift = (arr) => {
    for (var i = 2; i >= 0; i--) {
        var j = i + 1;
        if (arr[i]) {
            while (j <= 3) {
                if (!arr[j]) {
                    arr[j] = arr[j - 1];
                    arr[j - 1] = undefined;
                    // update the value and status
                }
                j++;
            }
        }
    }
    return arr;
}

var rightAddition = (arr) => {
    for (var i = 3; i > 0; i--) {
        if (arr[i] === arr[i - 1] && arr[i] && arr[i - 1]) {
            arr[i] = arr[i] + arr[i - 1];
            arr[i - 1] = undefined;
        }
    }
    return arr;
}

var updateStatusFunction = () => {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var updateStatus = ArrOfJson.filter((obj) => {
                return obj.name === i + '' + j + 'field';
            });
            if (calculationArray[i][j]) {
                document.getElementsByName(i + '' + j + 'field')[0].value = calculationArray[i][j];
                updateStatus[0].status = false;
            } else {
                document.getElementsByName(i + '' + j + 'field')[0].value = '';
                updateStatus[0].status = true;
            }
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var common = () => {
    updateStatusFunction();
    getRandomNumber().then((newValue) => {
        document.getElementsByName(newValue.name)[0].value = newValue.value;
        var updateStatus = ArrOfJson.filter((obj) => {
            return obj.name === newValue.name;
        });
        var column = parseInt(newValue.name) % 10;
        var row = (Math.floor(parseInt(newValue.name) / 10));
        calculationArray[row][column] = newValue.value;
        updateStatus[0].status = false;
    })
}