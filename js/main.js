var signupName = document.getElementById('signupName')
var signupEmail = document.getElementById('signupEmail')
var signupPassword = document.getElementById('signupPassword')
var signinEmail = document.getElementById('signinEmail')
var signinPassword = document.getElementById('signinPassword')
var emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
var passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
var signUpArray = []

if (localStorage.getItem("users")){

    signUpArray = JSON.parse(localStorage.getItem("users"))
}

function signUp(){
if (isEmpty() == false) {
    document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
    return false
}

var signUp = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
}

if (isEmailExist()== false){
    document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'
 } else if(isEmailValid()== true && isPasswordValid()==true ) {
    signUpArray.push(signUp)
    localStorage.setItem("users",JSON.stringify(signUpArray))
    document.getElementById('exist').innerHTML='<span class="text-success m-3">Success</span>';
    } else if (isEmailValid()== true && isPasswordValid()== false) {
    document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Try Another Password</span>'
    }
     else if (isEmailValid()== false && isPasswordValid()== true) {
    document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Try Another Email</span>'
    }
     else if ( isEmailValid()== false && isPasswordValid()== false) {
    document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Try Again</span>'
    }
    else {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">somthing wrong</span>'
    }
}


function isLoginEmpty(){
    if (signinPassword.value == "" || signinEmail.value == ""){
        return false
    } else {
        return true
    }
}

function check(i){
    if (signUpArray[i].email== signinEmail.value && signUpArray[i].password == signinPassword.value){
        return true
    } else {
        return false
    }
}


function isEmailValid(){
    if (emailRegex.test(signupEmail.value)){
        return true
    } else {
        return false
    }
}
function isPasswordValid(){
    if (passwordRegex.test(signupPassword.value)){
        return true
    } else {
        return false
    }
}








function login(){
    if (isLoginEmpty() == false){
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    for (var i = 0; i < signUpArray.length; i++ ){



        if (check(i)== true){
            localStorage.setItem("sUsername",signUpArray[i].name)
            location.replace('home.html')
        }
        else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }
       
    
}

var username = localStorage.getItem("sUsername")
if (username){
    document.getElementById('username').innerHTML="PLATEFORME NUMÉRIQUE"
}


function isEmpty()
{
    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false
        }
        else {
            return true
     }
}

function isEmailExist() {
    for (var i =0;i<signUpArray.length; i++){
        if (signUpArray[i].email==signupEmail.value){
            return false
        }
    }
}

function logout(){
    localStorage.removeItem("sUsername")
}










//////////////////////////////////////////////////////////////////


document.addEventListener("DOMContentLoaded", function () {
    initChart();
});

function initChart() {
    // قراءة المتغيرات من CSS
    const documentStyle = getComputedStyle(document.documentElement);
    
    const textColor = documentStyle.getPropertyValue('rgba(21, 174, 205, 1)');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('rgba(174, 92, 36, 1)');

    // بيانات الرسم
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                tension: 0.4,
                borderColor: '#15aecdff',
                backgroundColor: 'rgba(32, 23, 23, 0.56)'
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderDash: [5, 5],
                tension: 0.4,
                borderColor: 'hsla(24, 66%, 41%, 1.00)',
                backgroundColor: 'rgba(32, 23, 23, 0.56)'

            },
            {
                label: 'Third Dataset',
                data: [12, 51, 62, 33, 21, 62, 45],
                fill: true,
                tension: 0.4,
                borderColor:'rgba(166, 17, 17, 0.99)',
                backgroundColor: 'rgba(32, 23, 23, 0.56)'
            }
        ]
    };

    // خيارات الرسم
    const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: 'rgba(0, 0, 0, 1)',
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'rgba(0, 0, 0, 1)',
                },
                grid: {
                    color: 'rgba(52, 24, 24, 0.26)',
                }
            },
            y: {
                ticks: {
                    color: 'rgba(0, 0, 0, 1)',
                },
                grid: {
                    color: 'rgba(52, 24, 24, 0.26)',
                }
            }
        }
    };

    // إنشاء الرسم
    const ctx = document.getElementById("myChart");

    new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}



// القيمة الافتراضية
let value = 60;

window.addEventListener("DOMContentLoaded", () => {
    const knob = new Knob({
        value: value,
        min: 0,
        max: 100,
        angleOffset: 180,
        angleArc: 360,
        thickness: 0.2,
        width: 200,
        height: 200,
        displayInput: true,
        fgColor: "#0099ff",
        bgColor: "#e0e0e0",
        readOnly: false,
        onChange: (v) => {
            value = v;
            console.log("Current Value:", value);
        }
    });

    document.getElementById("knobContainer").appendChild(knob.node);
});







const chartConfig = {
  series: [
    {
      name: "Sales",
      data: [10,25,40],
    },
  ],
  chart: {
    type: "bar",
    height: 240,
    toolbar: {
      show: false,
    },
  },
  title: {
    show: "",
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["#020617"],
  plotOptions: {
    bar: {
      columnWidth: "40%",
      borderRadius: 2,
    },
  },
  xaxis: {
    axisTicks: { show: false },
    axisBorder: { show: false },
    labels: {
      style: {
        colors: "#000000ff",
        fontSize: "12px",
        fontFamily: "inherit",
        fontWeight: 400,
      },
    },
    categories: [
      "Semaine 1", "Semaine 4", "Semaine 8"
    ],
  },
  yaxis: {
    axisTicks: { show: false },
    axisBorder: { show: false },
    labels: {
      style: {
        colors: "#000000ff",
        fontSize: "12px",
        fontFamily: "inherit",
        fontWeight: 400,
      },
    },
    categories: [
    "10", "20", "20", "40", "30", "40", "400"
    ],
  },
  grid: {
    show: true,
    borderColor: "#dddddd",
    strokeDashArray: 5,
    xaxis: { lines: { show: true } },
    padding: { top: 5, right: 20 },
  },
  fill: { opacity: 0.8 },
  tooltip: { theme: "dark" },
};

const chart = new ApexCharts(document.querySelector("#bar-chart"), chartConfig);
chart.render();