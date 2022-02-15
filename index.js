//users array for all users informations.
var users = []

// add function for add new users.
var add = function (){
    // getting new username, balance informations.
    const addusername = document.getElementById("inputusername").value
    const addbalance = document.getElementById("inputbalance").value
    const newid = users.length+1
    const spacecontrol = addusername.split(" ");
    const balancecontrol = addbalance.split(" ");
    // space control on new username.
    if (spacecontrol.includes("")) {
        //if there is some spaces in username input, information writing on history panel.
        let lihistory = document.createElement('li');
        lihistory.textContent = "Invalid username.";
        const usershistorylist = document.querySelector('#usershistory');
        usershistorylist.appendChild(lihistory);
    }
    else {
        //space control on new balance input.
        if (balancecontrol.includes("")) {
            //if there is some spaces in balance input, information writing on history panel.
            let lihistory = document.createElement('li');
            lihistory.textContent = "Invalid balance.";
            const usershistorylist = document.querySelector('#usershistory');
            usershistorylist.appendChild(lihistory);
        }
        else {
            // balance input only can be a number.
            if (isNaN(addbalance)) {
                //if balance is not a number, information writing on history panel.
                let lihistory = document.createElement('li');
                lihistory.textContent = addbalance+" is not a number.";
                const usershistorylist = document.querySelector('#usershistory');
                usershistorylist.appendChild(lihistory);
                
            }
            else {
                let control = 0;
                // control all users for equal usernames.
                for (var i=0; i< users.length; i++) {
                    //we must check all users for equal username.
                    if ((users[i].name).toUpperCase() === (addusername).toUpperCase()) {
                        // if there is equal username, information writing on history panel.
                        let lihistory = document.createElement('li');
                        lihistory.textContent = addusername+' user is already exist.';
                        const usershistorylist = document.querySelector('#usershistory');
                        usershistorylist.appendChild(lihistory);
                        control=1;
            
                    }   
                    else {
                        control= 0;
                    }
                }
                // if every control is true, new user will added.
                if (control===0){
                    // adding new user on users array.
                    users.push({
                        name:addusername,
                        balance:addbalance,
                        id:newid
                    })
                    //adding new user name and new user balance on users panel.
                    let li = document.createElement('li');
                    li.setAttribute("id", newid);
                    const usernamelength = 50-addusername.length
                    li.textContent = addusername+('\xa0\xa0\xa0\xa0'+addbalance+'₺');
                    const userslist = document.querySelector('#userslist');
                    userslist.appendChild(li);
                    
                    //adding new history 'li' with user name and user balance.
                    let lihistory = document.createElement('li');
                    lihistory.textContent = addusername+' user added with '+addbalance+'₺';
                    const usershistorylist = document.querySelector('#usershistory');
                    usershistorylist.appendChild(lihistory);
            
                    //adding new section on sender list.
                    let senderoption = document.createElement('option');
                    senderoption.textContent = addusername;
                    const optionlist = document.querySelector('#senderlist');
                    optionlist.appendChild(senderoption);
            
                    //adding new section on reveiver list.
                    let receiveroption = document.createElement('option');
                    receiveroption.textContent = addusername;
                    const receiveroptionlist = document.querySelector('#receiverlist');
                    receiveroptionlist.appendChild(receiveroption);
                }
            }
        }
    }
}

//send function for transfer money from one user to another one.
var send = function () {
    const sender =  document.getElementById("senderlist").value
    const receiver = document.getElementById("receiverlist").value
    const amount =  document.getElementById("inputamount").value
    const amountcontrol = amount.split(" ");
    //if there is some spaces in amount, write information on history.
    if (amountcontrol.includes("")) {
        let lihistory = document.createElement('li');
        lihistory.textContent = "Invalid amount.";
        const usershistorylist = document.querySelector('#usershistory');
        usershistorylist.appendChild(lihistory);
    }
    else {
        if (isNaN(amount)) {
            // amount input only can be a number.
            let lihistory = document.createElement('li');
            lihistory.textContent = amount+" is not a number.";
            const usershistorylist = document.querySelector('#usershistory');
            usershistorylist.appendChild(lihistory);
        }
        else {
            //sender must be differrent receiver.
            if (sender===receiver){
                let lihistory = document.createElement('li');
                lihistory.textContent = "You can not send money to same account.";
                const usershistorylist = document.querySelector('#usershistory');
                usershistorylist.appendChild(lihistory);
            }
            else {
                //getting sender and receiver balances.
                let senderbalance = 0;
                let receiverbalance = 0;
                let senderindex = 0;
                let receiverindex = 0;
                // finding sender id.
                for (var i=0; i< users.length; i++) {
                    if (users[i].name === sender) {
                        senderbalance = users[i].balance;
                        senderindex = i
                    }    
                
                }
                //finding receiver id.
                for (var z=0; z< users.length; z++) {
                    if (users[z].name=== receiver) {
                        receiverbalance= users[z].balance;
                        receiverindex = z
            
                    }
                }
                //amount and balance check. Sender balance must be higher than amount.
                if (Number(amount)<=Number(senderbalance)) {
                    users[senderindex].balance=Number(senderbalance)-Number(amount)
                    users[receiverindex].balance=Number(receiverbalance)+Number(amount)
                    
                    //check li id for change innerHTML.
                    const liid = String(senderindex+1)
                    const liidtwo = String(receiverindex+1)
                    document.getElementById(liid).innerHTML = sender+'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+users[senderindex].balance+'₺'
                    document.getElementById(liidtwo).innerHTML = receiver+'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+users[receiverindex].balance+'₺'
                    
                    //new histoy 'li' for changes.
                    let lihistory = document.createElement('li');
                    lihistory.textContent = sender+' sent '+amount+'₺ to '+receiver;
                    const usershistorylist = document.querySelector('#usershistory');
                    usershistorylist.appendChild(lihistory);
                
                }
                else {
                    // if balance is not enough for transfer, writing information on history.
                    let lihistory = document.createElement('li');
                    lihistory.textContent = sender+"'s balance is not enough for transfer.";
                    const usershistorylist = document.querySelector('#usershistory');
                    usershistorylist.appendChild(lihistory);
                }
            }
        }
    }
}