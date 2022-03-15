const itemCodeRegEx = /^(I00-)[0-9]{3,4}$/;
const itemNameRegEx = /^[A-z ]{5,20}$/;
const itemPriceRegEx = /^[1-9][0-9]{1,5}(.)[0-9]{2}$/;
const itemQtyRegEx = /^[0-9][0-9]*$/;


$("#btnAddItem").attr('disabled', true);
$("#btnUpdateItem").attr('disabled', true);
$("#btnDeleteItem").attr('disabled', true);


function addItem() {
    let itemCode = $("#txtItemCode").val();
    let itemName = $("#txtItemName").val();
    let itemPrice = $("#txtItemPrice").val();
    let itemQty = $("#txtItemQty").val();

    var itemObject=new ItemDTO(itemCode, itemName, itemPrice, itemQty);

    if(ifItemExists(itemCode)){
        for(var i in itemArray){
            if(itemArray[i].getCode()===itemCode){
                itemArray[i]=itemObject;
            }
        }
    }else{
        itemArray.push(itemObject);
    }

    loadAllItems();
    clearAllItemFields();

    $("#itemTbl>tr").click(function () {
        let itemId = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let itemPrice = $(this).children(":eq(2)").text();
        let itemQty = $(this).children(":eq(3)").text();

        console.log(itemId, itemName, itemPrice, itemQty);

        $("#txtItemCode").val(itemId);
        $("#txtItemName").val(itemName);
        $("#txtItemPrice").val(itemPrice);
        $("#txtItemQty").val(itemQty);

        validateItemCode();
        validateItemName();
        validateItemPrice();
        validateItemQty();

        setItemButtons();


    });

    loadItemIds();
    setItemButtons();

}

function ifItemExists(code){
    for(var i in itemArray){
        if(itemArray[i].getCode()===code){
            return true;
        }
    }
    return false;
}

function updateItem() {
    for (var i in itemArray ){
        if ($("#txtItemCode").val() === itemArray[i].getCode()){
            let itemCode = $("#txtItemCode").val();
            let itemName = $("#txtItemName").val();
            let itemPrice = $("#txtItemPrice").val();
            let itemQty = $("#txtItemQty").val();

            var itemObject = new ItemDTO(itemCode,itemName,itemPrice,itemQty);
            itemArray[i].setName(itemObject.getName());
            itemArray[i].setPrice(itemObject.getPrice());
            itemArray[i].setQty(itemObject.getQty());
        }
    }
    loadAllItems();
    clearAllItemFields();

    $("#itemTbl>tr").click(function () {
        let itemId = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let itemPrice = $(this).children(":eq(2)").text();
        let itemQty = $(this).children(":eq(3)").text();

        console.log(itemId, itemName, itemPrice, itemQty);

        $("#txtItemCode").val(itemId);
        $("#txtItemName").val(itemName);
        $("#txtItemPrice").val(itemPrice);
        $("#txtItemQty").val(itemQty);

        validateItemCode();
        validateItemName();
        validateItemPrice();
        validateItemQty();
        setItemButtons();

    });

    loadItemIds();
    setItemButtons();


}

function searchItem() {
    for (var i in itemArray ){
        if ($("#txtSearchItemId").val() === itemArray[i].getCode()){
            let a = itemArray[i];
            $('#txtItemCode').val(a.getCode());
            $("#txtItemName").val(a.getName());
            $("#txtItemPrice").val(a.getPrice());
            $("#txtItemQty").val(a.getQty());

            validateItemCode();
            validateItemName();
            validateItemPrice();
            validateItemQty();

        }
    }
    loadAllItems();
    clearSearchItemFields();
    setItemButtons();

}


function deleteItem() {
    for(var i in itemArray) {
        if ($("#txtItemCode").val() === itemArray[i].getCode()){
            itemArray.splice(i,1);
        }
    }

    loadAllItems();
    clearAllItemFields();
    setItemButtons();


    $("#itemTbl>tr").click(function () {
        let itemId = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let itemPrice = $(this).children(":eq(2)").text();
        let itemQty = $(this).children(":eq(3)").text();

        console.log(itemId, itemName, itemPrice, itemQty);

        $("#txtItemCode").val(itemId);
        $("#txtItemName").val(itemName);
        $("#txtItemPrice").val(itemPrice);
        $("#txtItemQty").val(itemQty);

        validateItemCode();
        validateItemName();
        validateItemPrice();
        validateItemQty();
        setItemButtons();

    });

    loadItemIds();
    setItemButtons();


}

function loadAllItems() {
    $("#itemTbl").empty();

    for(var i in itemArray){
        let code = itemArray[i].itemCode;
        let name = itemArray[i].itemName;
        let price = itemArray[i].itemPrice;
        let qty = itemArray[i].itemQty;

        let row = `<tr><td>${code}</td><td>${name}</td><td>${price}</td><td>${qty}</td></tr>`;
        $("#itemTbl").append(row);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function clearSearchItemFields() {
    $("#txtSearchItemId").val('');
    $("#txtSearchItemId").css('border','1px solid #ced4da');
}


function clearAllItemFields() {
    $("#txtItemCode").val('');
    $("#txtItemName").val('');
    $("#txtItemPrice").val('');
    $("#txtItemQty").val('');

    $("#txtItemCode").css('border','1px solid #ced4da');
    $("#txtItemName").css('border','1px solid #ced4da');
    $("#txtItemPrice").css('border','1px solid #ced4da');
    $("#txtItemQty").css('border','1px solid #ced4da');
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#btnAddItem").click(function () {
    addItem();
});

$("#btnUpdateItem").click(function () {
    updateItem();
});

$("#btnDeleteItem").click(function () {
    deleteItem();
});

$("#btnSearchItem").click(function () {
    searchItem($("#txtItemCode").val());
});


$("#txtSearchItemId").keyup(function (event) {
    setItemButtons();

    if (itemCodeRegEx.test($("#txtSearchItemId").val())) {
        $("#txtSearchItemId").css('border','3px solid green');
    }else{
        $("#txtSearchItemId").css('border','3px solid red');
    }
});
$("#txtItemCode").keyup(function (event) {

    setItemButtons();

    if (itemCodeRegEx.test($("#txtItemCode").val())) {
        $("#txtItemCode").css('border','3px solid green');
    }else{
        $("#txtItemCode").css('border','3px solid red');
    }

    if (event.key === 'Enter' & itemCodeRegEx.test($("#txtItemCode").val())){
        $("#txtItemName").focus();
    }
});
$("#txtItemPrice").keyup(function (event) {
    setItemButtons();

    if (itemPriceRegEx.test($("#txtItemPrice").val())) {
        $("#txtItemPrice").css('border','3px solid green');
    }else{
        $("#txtItemPrice").css('border','3px solid red');
    }

    if (event.key === 'Enter' & itemPriceRegEx.test($("#txtItemPrice").val())){
        $("#txtItemQty").focus();
    }
});
$("#txtItemName").keyup(function (event) {
    setItemButtons();


    if (itemNameRegEx.test($("#txtItemName").val())) {
        $("#txtItemName").css('border','3px solid green');
    }else{
        $("#txtItemName").css('border','3px solid red');
    }

    if (event.key === 'Enter' & itemNameRegEx.test($("#txtItemName").val())){
        $("#txtItemPrice").focus();
    }
});
$("#txtItemQty").keyup(function (event) {
    setItemButtons();


    if (itemQtyRegEx.test($("#txtItemQty").val())) {
        $("#txtItemQty").css('border','3px solid green');
    }else{
        $("#txtItemQty").css('border','3px solid red');
    }
});


function validateItemCode(){
    if (itemCodeRegEx.test($("#txtItemCode").val())) {
        $("#txtItemCode").css('border','3px solid green');
    }else{
        $("#txtItemCode").css('border','3px solid red');
    }
}
function validateItemName(){
    if (itemNameRegEx.test($("#txtItemName").val())) {
        $("#txtItemName").css('border','3px solid green');
    }else{
        $("#txtItemName").css('border','3px solid red');
    }
}
function validateItemPrice(){
    if (itemPriceRegEx.test($("#txtItemPrice").val())) {
        $("#txtItemPrice").css('border','3px solid green');
    }else{
        $("#txtItemPrice").css('border','3px solid red');
    }
}
function validateItemQty(){
    if (itemQtyRegEx.test($("#txtItemQty").val())) {
        $("#txtItemQty").css('border','3px solid green');
    }else{
        $("#txtItemQty").css('border','3px solid red');
    }
}




function loadItemIds() {
    $("#cmbOrderItemCode").empty();
    $('#cmbOrderItemCode').append(new Option("Item Code", ""));
    for (var i in itemArray){
        let code=itemArray[i].getCode();
        $('#cmbOrderItemCode').append(new Option(code, code));
    }
}

function setItemButtons() {
    let a = isItemExists($("#txtItemCode").val());
    let b = itemCodeRegEx.test($("#txtItemCode").val()) & itemNameRegEx.test($("#txtItemName").val()) & itemPriceRegEx.test($("#txtItemPrice").val()) & itemQtyRegEx.test($("#txtItemQty").val());

    if (a) {
        $("#btnDeleteItem").attr('disabled', false);
        $("#btnUpdateItem").attr('disabled', false);
        $("#btnAddItem").attr('disabled', true);
    } else {
        $("#btnDeleteItem").attr('disabled', true);
        $("#btnUpdateItem").attr('disabled', true);
        $("#btnAddItem").attr('disabled', false);
    }

    if (b) {
        $("#btnDeleteItem").attr('disabled', false);
        $("#btnUpdateItem").attr('disabled', false);
        $("#btnAddItem").attr('disabled', false);
    } else {
        $("#btnDeleteItem").attr('disabled', true);
        $("#btnUpdateItem").attr('disabled', true);
        $("#btnAddItem").attr('disabled', true);
    }
}

function isItemExists(id){
    for(var i in itemArray){
        if(itemArray[i].getCode()===id){
            return true;
        }
    }
    return false;
}




