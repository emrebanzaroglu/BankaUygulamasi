class User{
    constructor(name,surname,age){
        this.Name=name
        this.Surname=surname
        this.Age=age
        this.Accounts=[]
        this.Transactions=[]
    }

    addAccount(Account){
        this.Accounts.push(Account)
    }

    deleteAccount(Account){
        this.Accounts=this.Accounts.filter((account)=>account!==Account)
    }

    addTransaction(Transaction){
        this.Transactions.push(Transaction)
    }
}

class Account{
    constructor(name,balance){
        this.Name=name
        this.Balance=balance
    }
}


class AccountTransaction{
    constructor(accountType,balance,transactionType){
        this.AccountType=accountType
        this.Balance=balance
        this.TransactionType=transactionType
    }
}


const UserList=[]

function addUser() {
    const UserName=document.getElementById("userName").value.trim()
    const UserSurname=document.getElementById("userSurname").value.trim()
    const UserAge=document.getElementById("userAge").value.trim()

    if(UserName==="" || UserSurname==="" || UserAge<18){
        alert("Ad/Soyad boş ya da yaşınız 18'in altında!")
        return
    }

    if(UserList.some((user)=>user.Name+" "+user.Surname==UserName+" "+UserSurname)){
        alert("Bu Kullanıcı Zaten Mevcut!")
        return
    }
    
    const user = new User(UserName,UserSurname,UserAge)
    UserList.push(user)

    accountUpdate()
    document.getElementById("userName").value=""
    document.getElementById("userSurname").value=""
    document.getElementById("userAge").value=""
}


function addAccount() {
    const NameSurnameAccount=document.getElementById("NameSurnameAccount")
    const NameSurnameValue=NameSurnameAccount.options[NameSurnameAccount.selectedIndex].value

    const accountName = document.getElementById("accountName").value.trim()
    const accountBalance = document.getElementById("accountBalance").value

    if(NameSurnameValue==="" || accountName==="" || accountBalance<1){
        alert("Hatalı giriş yaptınız!")
        return
    }

    const user = UserList.find((userfind)=>(userfind.Name+" "+userfind.Surname)===NameSurnameValue)

    const account = new Account(accountName,accountBalance)
    user.addAccount(account)

    // console.log(user)
    // console.log(account)

    accountUpdate()

    document.getElementById("accountName").value=""
    document.getElementById("accountBalance").value=""
}


function UserUpdate(){
    const AfterNameSurname=document.getElementById("NameSurnameUpdate")
    const AfterNameSurnameValue=AfterNameSurname.options[AfterNameSurname.selectedIndex].value
    
    
    const AfterAccountType=document.getElementById("accountTypeUpdate")
    const AfterAccountTypeValue=AfterAccountType.options[AfterAccountType.selectedIndex].value
    
    const NewAccountType=document.getElementById("NewAccountType").value.trim()

    var user = UserList.find((userfind)=>(userfind.Name+" "+userfind.Surname)===AfterNameSurnameValue)
    var account = user.Accounts.find((accountfind)=>accountfind.Name===AfterAccountTypeValue)

    console.log(user)
    console.log(account)
    
    account.Name=NewAccountType

    console.log(user)
    console.log(account)
    
    accountUpdate()
    accountTransaction() 


    document.getElementById("NewAccountType").value=""
}


function addUserOption() {

    const UserName=document.getElementById("NameSurnameAccount")
    UserName.innerHTML="<option disabled value selected> -- Kullanıcı Seçiniz -- </option>"

    const UpdateUserName=document.getElementById("NameSurnameUpdate")
    UpdateUserName.innerHTML="<option disabled value selected> -- Kullanıcı Seçiniz -- </option>"

    const TransactionUserName=document.getElementById("userNameSurname")
    TransactionUserName.innerHTML="<option disabled value selected> -- Kullanıcı Seçiniz -- </option>"
    
    const TransferUserName=document.getElementById("userNameSurnameTransfer")
    TransferUserName.innerHTML="<option disabled value selected> -- Kullanıcı Seçiniz -- </option>"

    UserList.forEach((user)=>{
        const optionUser=document.createElement("option")
        optionUser.value=user.Name+" "+user.Surname
        optionUser.textContent=user.Name+" "+user.Surname
        UserName.appendChild(optionUser)
    })

    UserList.forEach((user)=>{
        const optionUser=document.createElement("option")
        optionUser.value=user.Name+" "+user.Surname
        optionUser.textContent=user.Name+" "+user.Surname
        UpdateUserName.appendChild(optionUser)
    })

    UserList.forEach((user)=>{
        const optionUser=document.createElement("option")
        optionUser.value=user.Name+" "+user.Surname
        optionUser.textContent=user.Name+" "+user.Surname
        TransactionUserName.appendChild(optionUser)
    })

    UserList.forEach((user)=>{
        const optionUser=document.createElement("option")
        optionUser.value=user.Name+" "+user.Surname
        optionUser.textContent=user.Name+" "+user.Surname
        TransferUserName.appendChild(optionUser)
    })
}


function accountUpdate() {
    
    addUserOption()

    const UpdateAccountType=document.getElementById("accountTypeUpdate")
    UpdateAccountType.innerHTML="<option disabled value selected> -- Hesap Türü Seçiniz -- </option>"
    
    const TransactionAccountType=document.getElementById("transactionAccountType")
    TransactionAccountType.innerHTML="<option disabled value selected> -- Hesap Türü Seçiniz -- </option>"
   
    const SendingAccountType=document.getElementById("sendingAccount")
    SendingAccountType.innerHTML="<option disabled value selected> -- Hesap Türü Seçiniz -- </option>"

    const RecipientAccountType=document.getElementById("recipientAccount")
    RecipientAccountType.innerHTML="<option disabled value selected> -- Hesap Türü Seçiniz -- </option>"

    

    const AccountList=document.getElementById("accountList")
    AccountList.innerHTML=""

    UserList.forEach((user)=>{

        const tr=document.createElement("tr")
        const th=document.createElement("th")
        const thbtn=document.createElement("th")

        const deleteUserBtn=document.createElement("button")
        deleteUserBtn.textContent="Kullanıcıyı Sil"
        deleteUserBtn.className="btn btn-danger"

        deleteUserBtn.addEventListener("click",()=>{
            deleteUser(user.Name+" "+user.Surname)
        })

        th.textContent=user.Name+" "+user.Surname
        th.colSpan=3
        tr.appendChild(th)
        thbtn.appendChild(deleteUserBtn)
        tr.appendChild(thbtn)
        AccountList.appendChild(tr)

        var number=0
        var al=[]
        al=user.Accounts

        al.forEach((account)=>{
            number++

            const optionAccountUpdate=document.createElement("option")
            optionAccountUpdate.value=account.Name
            optionAccountUpdate.textContent=account.Name+"/"+user.Name+" "+user.Surname
            UpdateAccountType.appendChild(optionAccountUpdate)
        
            const optionAccountTransaction=document.createElement("option")
            optionAccountTransaction.value=account.Name
            optionAccountTransaction.textContent=account.Name+"/"+user.Name+" "+user.Surname
            TransactionAccountType.appendChild(optionAccountTransaction)
        
            const optionAccountSending=document.createElement("option")
            optionAccountSending.value=account.Name
            optionAccountSending.textContent=account.Name+"/"+user.Name+" "+user.Surname
            SendingAccountType.appendChild(optionAccountSending)
        
            const optionAccountRecipient=document.createElement("option")
            optionAccountRecipient.value=account.Name
            optionAccountRecipient.textContent=account.Name+"/"+user.Name+" "+user.Surname
            RecipientAccountType.appendChild(optionAccountRecipient)

            const AccountTr=document.createElement("tr")
            const NumberTd=document.createElement("td")
            NumberTd.textContent=number

            const AccountNameTd=document.createElement("td")
            AccountNameTd.textContent=account.Name

            const AccountBalanceTd=document.createElement("td")
            AccountBalanceTd.textContent=account.Balance

            const deleteAccountTd=document.createElement("td")
            const deleteAccountBtn=document.createElement("button")
            deleteAccountBtn.textContent="Hesabı Sil"
            deleteAccountBtn.className="btn btn-warning"

            deleteAccountBtn.addEventListener("click",()=>{
                deleteAccount(user.Name+" "+user.Surname,account);
            })

            deleteAccountTd.appendChild(deleteAccountBtn)
            AccountTr.appendChild(NumberTd)
            AccountTr.appendChild(AccountNameTd)
            AccountTr.appendChild(AccountBalanceTd)
            AccountTr.appendChild(deleteAccountTd)

            AccountList.appendChild(AccountTr)

        })
    })
}

function accountTransaction() {
    const accountTransactionList=document.getElementById("accountTransactionList")
    accountTransactionList.innerHTML=""

    UserList.forEach((user)=>{

        const tr=document.createElement("tr")
        const th=document.createElement("th")
        th.textContent=user.Name+" "+user.Surname
        th.colSpan=4
        tr.appendChild(th)
        accountTransactionList.appendChild(tr)

        var numberr=0
        var atl=[]
        atl=user.Transactions

        atl.forEach((transaction)=>{
            numberr++

            const TransactionTr=document.createElement("tr")

            const NumberrTd=document.createElement("td")
            NumberrTd.textContent=numberr

            const AccountTypeTd=document.createElement("td")
            AccountTypeTd.textContent=transaction.AccountType

            const TransactionBalanceTd=document.createElement("td")
            TransactionBalanceTd.textContent=transaction.Balance

            const TransactionTypeTd=document.createElement("td")
            TransactionTypeTd.textContent=transaction.TransactionType
            TransactionTypeTd.className=transaction.TransactionType==="deposit"?"badge rounded-pill bg-success":transaction.TransactionType==="withdraw"?"badge rounded-pill bg-danger"
                                        :transaction.TransactionType==="Para Alındı"?"badge rounded-pill bg-primary":"badge rounded-pill bg-secondary"
            

            TransactionTr.appendChild(NumberrTd)
            TransactionTr.appendChild(AccountTypeTd)
            TransactionTr.appendChild(TransactionBalanceTd)
            TransactionTr.appendChild(TransactionTypeTd)

            accountTransactionList.appendChild(TransactionTr)
        })
    })
}


function transaction() {
    const transactionUserName=document.getElementById("userNameSurname")
    const UserNameValue=transactionUserName.options[transactionUserName.selectedIndex].value
    
    const transactionAccountType=document.getElementById("transactionAccountType")
    const AccountValue=transactionAccountType.options[transactionAccountType.selectedIndex].value
    
    const transactionType=document.getElementById("transactionType")
    const TransactionValue=transactionType.options[transactionType.selectedIndex].value
    
    const transactionBalance=document.getElementById("transactionBalance").value

    var user = UserList.find((userfind)=>(userfind.Name+" "+userfind.Surname)===UserNameValue)
    var account = user.Accounts.find((accountfind)=>accountfind.Name===AccountValue)

    if(TransactionValue==="deposit"){
            account.Balance=Number(account.Balance)+Number(transactionBalance)
    }
    else{
        if(Number(transactionBalance)>Number(account.Balance)){
            alert("Yetersiz bakiye")
        }
        else{
            account.Balance=Number(account.Balance)-Number(transactionBalance)
        }
    }

    const transaction1=new AccountTransaction(AccountValue,transactionBalance,TransactionValue)
    user.addTransaction(transaction1)
    console.log(user)
    console.log(transaction1)
    accountUpdate()
    accountTransaction()

    document.getElementById("transactionBalance").value=""
}


function transfer() {
    const TransferUserName=document.getElementById("userNameSurnameTransfer")
    const TransferUserNameValue=TransferUserName.options[TransferUserName.selectedIndex].value
    
    const SendingAccount=document.getElementById("sendingAccount")
    const SendingAccountValue=SendingAccount.options[SendingAccount.selectedIndex].value
    
    const RecipientAccount=document.getElementById("recipientAccount")
    const RecipientAccountValue=RecipientAccount.options[RecipientAccount.selectedIndex].value

    const TransferBalance=document.getElementById("transferBalance").value

    var user1 = UserList.find((userfind)=>(userfind.Name+" "+userfind.Surname)===TransferUserNameValue)
    var sendAccount = user1.Accounts.find((accountfind)=>accountfind.Name===SendingAccountValue)
    var recipientAccount = user1.Accounts.find((accountfind)=>accountfind.Name===RecipientAccountValue)

    if(Number(sendAccount.Balance)<Number(TransferBalance)){
        alert("Yetersiz Bakiye!")
    }
    else{
        sendAccount.Balance=Number(sendAccount.Balance)-Number(TransferBalance)
        recipientAccount.Balance=Number(recipientAccount.Balance)+Number(TransferBalance)
    }


    const transaction2=new AccountTransaction(SendingAccountValue,TransferBalance,"Para Gönderildi")
    const transaction3=new AccountTransaction(RecipientAccountValue,TransferBalance,"Para Alındı")
    user1.addTransaction(transaction2)
    user1.addTransaction(transaction3)

    accountUpdate()
    accountTransaction()

    document.getElementById("transferBalance").value=""
}




function deleteUser(nameSurname){
    UserList.splice(UserList.findIndex((user)=>(user.Name+" "+user.Surname)===nameSurname),1);
    accountUpdate();
}

function deleteAccount(UserNameSurname,Account){
    const user=UserList.find((userfind)=>(userfind.Name+" "+userfind.Surname)===UserNameSurname);
    user.deleteAccount(Account);
    accountUpdate()
}

document.getElementById("addAccount").addEventListener("click",(e)=>{
    e.preventDefault();
    addAccount();
})

document.getElementById("addUser").addEventListener("click",(e)=>{
    e.preventDefault();
    addUser();
})

document.getElementById("updateUser").addEventListener("click",(e)=>{
    e.preventDefault();
    UserUpdate();
})

document.getElementById("transaction").addEventListener("click",(e)=>{
    e.preventDefault();
    transaction();
})

document.getElementById("transfer").addEventListener("click",(e)=>{
    e.preventDefault();
    transfer();
})