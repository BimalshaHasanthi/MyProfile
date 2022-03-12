const customerIdRegEx = /^(C0)[0-9]{3,4}$/;
const customerNameRegEx = /^[A-z ]{2,20}$/;
const customerAddressRegEx = /^[A-z0-9/,. ]*$/;
const customerSalaryRegEx = /^[0-9]*(.)[0-9]{2}$/;

function addCustomer() {
    let customerId = $("#txtCustomerId").val();
    let customerName = $("#txtCustomerName").val();
    let customerAddress = $("#txtCustomerAddress").val();
    let customerSalary = $("#txtCustomerSalary").val();

    var customerObject=new CustomerDTO(customerId, customerName, customerAddress, customerSalary);

    if(ifCustomerExists(customerId)){
        for(var i in customerArray){
            if(customerArray[i].getId()===customerId){
                customerArray[i]=customerObject;
            }
        }
    }else{
        customerArray.push(customerObject);
    }


    loadAllCustomers();
    clearAllCustomerFields();

    $("#customerTbl>tr").click(function () {
        let customerId = $(this).children(":eq(0)").text();
        let customerName = $(this).children(":eq(1)").text();
        let customerAddress = $(this).children(":eq(2)").text();
        let customerSalary = $(this).children(":eq(3)").text();

        console.log(customerId, customerName, customerAddress, customerSalary);

        $("#txtCustomerId").val(customerId);
        $("#txtCustomerName").val(customerName);
        $("#txtCustomerAddress").val(customerAddress);
        $("#txtCustomerSalary").val(customerSalary);

        validateCustomerId();
        validateCustomerName();
        validateCustomerAddress();
        validateCustomerSalary();

    });
    loadCustomerIds();
}

function ifCustomerExists(id){
    for(var i in customerArray){
        if(customerArray[i].getId()===id){
            return true;
        }
    }
    return false;
}

function updateCustomer() {
    for (var i in customerArray ){
        if ($("#txtCustomerId").val() === customerArray[i].getId()){
            let customerId = $("#txtCustomerId").val();
            let customerName = $("#txtCustomerName").val();
            let customerAddress = $("#txtCustomerAddress").val();
            let customerSalary = $("#txtCustomerSalary").val();

            var customerObject = new CustomerDTO(customerId,customerName,customerAddress,customerSalary);
            customerArray[i].setName(customerObject.getName());
            customerArray[i].setAddress(customerObject.getAddress());
            customerArray[i].setSalary(customerObject.getSalary());

        }
    }
    loadAllCustomers();
    clearAllCustomerFields();


    $("#customerTbl>tr").click(function () {
        let customerId = $(this).children(":eq(0)").text();
        let customerName = $(this).children(":eq(1)").text();
        let customerAddress = $(this).children(":eq(2)").text();
        let customerSalary = $(this).children(":eq(3)").text();

        console.log(customerId, customerName, customerAddress, customerSalary);

        $("#txtCustomerId").val(customerId);
        $("#txtCustomerName").val(customerName);
        $("#txtCustomerAddress").val(customerAddress);
        $("#txtCustomerSalary").val(customerSalary);

        validateCustomerId();
        validateCustomerName();
        validateCustomerAddress();
        validateCustomerSalary();

    });
    loadCustomerIds();



}

function searchCustomer() {
    for (var i in customerArray ){
        if ($("#txtSearchCustomerId").val() === customerArray[i].getId()){
            let a = customerArray[i];
            $('#txtCustomerId').val(a.getId());
            $("#txtCustomerName").val(a.getName());
            $("#txtCustomerAddress").val(a.getAddress());
            $("#txtCustomerSalary").val(a.getSalary());

            validateCustomerId();
            validateCustomerName();
            validateCustomerAddress();
            validateCustomerSalary();

        }
    }
    loadAllCustomers();
    clearSearchCustomerFields();

}

function deleteCustomer() {
    for(var i in customerArray) {
        if ($("#txtCustomerId").val() === customerArray[i].getId()){
            customerArray.splice(i,1);
        }
    }

    clearAllCustomerFields();
    loadAllCustomers();

    $("#customerTbl>tr").click(function () {
        let customerId = $(this).children(":eq(0)").text();
        let customerName = $(this).children(":eq(1)").text();
        let customerAddress = $(this).children(":eq(2)").text();
        let customerSalary = $(this).children(":eq(3)").text();

        console.log(customerId, customerName, customerAddress, customerSalary);

        $("#txtCustomerId").val(customerId);
        $("#txtCustomerName").val(customerName);
        $("#txtCustomerAddress").val(customerAddress);
        $("#txtCustomerSalary").val(customerSalary);

        validateCustomerId();
        validateCustomerName();
        validateCustomerAddress();
        validateCustomerSalary();
    });

    loadCustomerIds();

}

function loadAllCustomers() {
    $("#customerTbl").empty();

    for(var i in customerArray){
        let id = customerArray[i].customerId;
        let name = customerArray[i].customerName;
        let address = customerArray[i].customerAddress;
        let salary = customerArray[i].customerSalary;

        let row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td></tr>`;
        $("#customerTbl").append(row);
    }
}

function clearSearchCustomerFields() {
    $("#txtSearchItemId").val('');
    $("#txtSearchItemId").css('border','1px solid #ced4da');
}

function clearAllCustomerFields() {
    $("#txtCustomerId").val('');
    $("#txtCustomerName").val('');
    $("#txtCustomerAddress").val('');
    $("#txtCustomerSalary").val('');

    $("#txtCustomerId").css('border','1px solid #ced4da');
    $("#txtCustomerName").css('border','1px solid #ced4da');
    $("#txtCustomerAddress").css('border','1px solid #ced4da');
    $("#txtCustomerSalary").css('border','1px solid #ced4da');
}



$("#btnAddCustomer").click(function () {
    addCustomer();
});

$("#btnUpdateCustomer").click(function () {
    updateCustomer();
});

$("#btnDeleteCustomer").click(function () {
    deleteCustomer();
});

$("#btnSearchCustomer").click(function () {
    searchCustomer($("#txtSearchCustomerId").val());
});



$("#txtSearchCustomerId").keyup(function (event) {
    if (customerIdRegEx.test($("#txtSearchCustomerId").val())) {
        $("#txtSearchCustomerId").css('border','3px solid green');
    }else{
        $("#txtSearchCustomerId").css('border','3px solid red');
    }
});
$("#txtCustomerId").keyup(function (event) {
    if (customerIdRegEx.test($("#txtCustomerId").val())) {
        $("#txtCustomerId").css('border','3px solid green');
    }else{
        $("#txtCustomerId").css('border','3px solid red');
    }

    if (event.key === 'Enter' & customerIdRegEx.test($("#txtCustomerId").val())){
        $("#txtCustomerName").focus();
    }
});
$("#txtCustomerName").keyup(function (event) {
    if (customerNameRegEx.test($("#txtCustomerName").val())) {
        $("#txtCustomerName").css('border','3px solid green');
    }else{
        $("#txtCustomerName").css('border','3px solid red');
    }

    if (event.key === 'Enter' & customerNameRegEx.test($("#txtCustomerName").val())){
        $("#txtCustomerAddress").focus();
    }
});
$("#txtCustomerAddress").keyup(function (event) {
    if (customerAddressRegEx.test($("#txtCustomerAddress").val())) {
        $("#txtCustomerAddress").css('border','3px solid green');
    }else{
        $("#txtCustomerAddress").css('border','3px solid red');
    }

    if (event.key === 'Enter' & customerAddressRegEx.test($("#txtCustomerAddress").val())){
        $("#txtCustomerSalary").focus();
    }
});
$("#txtCustomerSalary").keyup(function (event) {
    if (customerSalaryRegEx.test($("#txtCustomerSalary").val())) {
        $("#txtCustomerSalary").css('border','3px solid green');
    }else{
        $("#txtCustomerSalary").css('border','3px solid red');
    }
});


//////////////////////////////////////////////////////////////////

function validateCustomerId(){
    if (customerIdRegEx.test($("#txtCustomerId").val())) {
        $("#txtCustomerId").css('border','3px solid green');
    }else{
        $("#txtCustomerId").css('border','3px solid red');
    }
}
function validateCustomerName(){
    if (customerNameRegEx.test($("#txtCustomerName").val())) {
        $("#txtCustomerName").css('border','3px solid green');
    }else{
        $("#txtCustomerName").css('border','3px solid red');
    }
}
function validateCustomerAddress(){
    if (customerAddressRegEx.test($("#txtCustomerAddress").val())) {
        $("#txtCustomerAddress").css('border','3px solid green');
    }else{
        $("#txtCustomerAddress").css('border','3px solid red');
    }
}
function validateCustomerSalary(){
    if (customerSalaryRegEx.test($("#txtCustomerSalary").val())) {
        $("#txtCustomerSalary").css('border','3px solid green');
    }else{
        $("#txtCustomerSalary").css('border','3px solid red');
    }
}


function loadCustomerIds() {
    $("#cmbOrderCustId").empty();
    $('#cmbOrderCustId').append(new Option("Customer ID", ""));
    for (var i in customerArray){
        let id=customerArray[i].getId();
        $('#cmbOrderCustId').append(new Option(id, id));
    }
}




