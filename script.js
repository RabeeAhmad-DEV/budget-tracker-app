class transaction {
    constructor(titleparam,amountparam,typeparam){
        this.title = titleparam;
        this.amount  = amountparam;
        this.type = typeparam;
    }
}
let alltransactinos = [];
let saveddata = localStorage.getItem('mybudgetdata');
if (saveddata){
    alltransactinos = JSON.parse(saveddata);
    updatebudget();
    const listcontainer = document.querySelector('.container3');
    for (let t of alltransactinos ){
        let transactioncard = `<div class="transaction-item"><span>${t.title}</span><span>${t.amount}$</span></div>`;
        listcontainer.insertAdjacentHTML('beforeend',transactioncard);
    }
}
const userproc = document.querySelector('input[type="text"]');
const userprocamount = document.querySelector(
    'input[type="number"]');
const select = document.querySelector('select');
const addprocbtn = document.querySelector('.add-proc');



addprocbtn.addEventListener('click',function(event){
    event.preventDefault();
    let titlevalue = userproc.value;
    let amountvalue = userprocamount.value;
    let typevalue = select.value;
    
    let newobj = new transaction(titlevalue,amountvalue,
        typevalue);
    alltransactinos.push(newobj);
    localStorage.setItem('mybudgetdata', JSON.stringify(alltransactinos));
    updatebudget();
    const listcontainer = document.querySelector('.hestory-list');
    let transactioncard = `<div class="transaction-item"><span>${titlevalue}</span><span>${amountvalue}$</span></div>`;
    listcontainer.insertAdjacentHTML('beforeend',transactioncard)
    userproc.value = "";
    userprocamount.value = "";
});

function updatebudget(){
    let totalincome =0;
    let totalexpenses =0;

    for (let t of alltransactinos) {
        let currentamount = Number(t .amount);
        if (t.type == "Income"){
            totalincome = totalincome + currentamount;
        } else if(t.type == "Expense"){
            totalexpenses = totalexpenses + currentamount;
        }
    }
    let remainingbalance = totalincome - totalexpenses;

    document.querySelector('.rem-bal-p').textContent 
    = remainingbalance + "$";
    document.querySelector('.tot-in-p').textContent 
    = totalincome + "$";
    document.querySelector('.tot-exp-p').textContent 
    = totalexpenses + "$";

 
};

const clearbtn = document.querySelector('.clr-all-btn');
clearbtn.addEventListener('click', function(){
    alltransactinos = [];
    localStorage.removeItem('mybudgetdata');
    
    updatebudget();
    document.querySelector('.hestory-list').innerHTML = "";
});





