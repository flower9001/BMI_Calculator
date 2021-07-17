const compute = document.querySelector('.compute');
const list = document.querySelector('.list');
const resultFont = document.querySelector('.resultFont');
const result = document.querySelector('.result');
const iconLoop = document.querySelector('.iconLoop');
const bmiValue = document.querySelector('.bmiValue');
const delAll = document.querySelector('.delAll');
let data = JSON.parse(localStorage.getItem('BMIData')) || [];

compute.addEventListener('click', computeBMI);

// update data
function updateData() {
    let str = '';
    let len = data.length;
    if (len == 0) {
        document.querySelector('.data p').setAttribute('class', 'd-block');
        delAll.setAttribute('class', 'd-none');
    } else {
        document.querySelector('.data p').setAttribute('class', 'd-none');
        delAll.setAttribute('class', 'delAll d-inline');
    }

    for (let i=len-1;i>=0;i--) {
        str += `<li class="border-${data[i].color} border-left-7 bg-white fz-lg"><span>${data[i].result}</span><span><small>BMI</small>${data[i].BMI}</span><span><small>weight</small>${data[i].weight}</span><span><small>height</small>${data[i].height}</span><small class="mr-3">${data[i].date}</small><a href="#" class="mr-2 del"><i class="fas fa-trash-alt" data-index="${i}"></i></a></li>`
    }

    list.innerHTML = str;
}

updateData();

// add data
function computeBMI(e) {
    e.preventDefault();

    // BMI compute
    let h = document.querySelector('.height').value;
    let w = document.querySelector('.weight').value;
    let result = document.querySelector('.result');
    if (h == '' || w == '') {
        return alert('請輸入身高或體重');
    }
    let bmi = (w / ((h / 100) ** 2)).toFixed(2);
    
    // time
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    if (month < 10) {
        month = "0" + month;
    };
    if (day < 10) {
        day = "0" + day;
    };
    let time = `${month}-${day}-${year}`;

    // object
    let obj = {
        result: '',
        BMI: bmi,
        weight: w + 'kg',
        height: h + 'cm',
        date: time,
        color: ''
    };

    // check BMI
    if (bmi < 18.5) {
        obj.result = '過輕';
        obj.color = 'blue';
        data.push(obj);
    } else if (bmi >= 18.5 && bmi < 24) {
        obj.result = '理想';
        obj.color = 'green';
        data.push(obj);
    } else if (bmi >= 24 && bmi < 27) {
        obj.result = '過重';
        obj.color = 'orange';
        data.push(obj);
    } else if (bmi >= 27 && bmi < 30) {
        obj.result = '輕度肥胖';
        obj.color = 'orange600';
        data.push(obj);
    } else if (bmi >= 30 && bmi < 35) {
        obj.result = '中度肥胖';
        obj.color = 'orange600';
        data.push(obj);
    } else if (bmi >= 35) {
        obj.result = '重度肥胖';
        obj.color = 'red';
        data.push(obj);
    }
    resultFont.textContent = obj.result;
    resultFont.setAttribute('class', `resultFont text-${obj.color}`)
    localStorage.setItem('BMIData', JSON.stringify(data));
    updateData();

    if (compute.getAttribute('data-state') == '') {
        compute.setAttribute('data-state', 'none');
        compute.classList.add('d-none');
        bmiValue.classList.add(`text-${obj.color}`, `border-${obj.color}`);
        bmiValue.classList.remove('d-none');
        iconLoop.classList.add(`bg-${obj.color}`);
        iconLoop.classList.remove('d-none');
        bmiValue.innerHTML = `${obj.BMI}<br><small>BMI</small>`
    }
}


iconLoop.addEventListener('click', function(e){
    if (compute.getAttribute('data-state') == 'none') {
        compute.setAttribute('data-state', '');
        compute.classList.remove('d-none');
        bmiValue.classList.add('d-none');
        iconLoop.classList.add('d-none');
        resultFont.textContent = '';
    }
    document.querySelector('.height').value = '';
    document.querySelector('.weight').value = '';
})

// delete data
list.addEventListener('click', deleteData, true);

function deleteData(e) {
    e.preventDefault();
    if (e.target.nodeName != 'I') {
        return;
    }
    let num = e.target.getAttribute('data-index');
    data.splice(num, 1);
    localStorage.setItem('BMIData', JSON.stringify(data));
    updateData();
}

delAll.addEventListener('click', deleteAll);

// delete all data
function deleteAll(e) {
    e.preventDefault();
    data = [];
    localStorage.setItem('BMIData', JSON.stringify(data));
    updateData();
}