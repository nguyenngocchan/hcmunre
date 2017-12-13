function ExportToTable() {  
     var regex = /^([a-zA-Z0-9\-'àđĐÀâÂäÄáÁéÉèÈêÊëËìÌîÎïÏòóÒôÔöÖùúÙûÛüÜçÇ’ñß\s_\\.\-:])+(.xlsx|.xls)$/;  
     /*Checks whether the file is a valid excel file*/  
     if (regex.test($("#excelfile").val().toLowerCase())) {  
         var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/  
         if ($("#excelfile").val().toLowerCase().indexOf(".xlsx") > 0) {  
             xlsxflag = true;  
         }  
         /*Checks whether the browser supports HTML5*/  
         if (typeof (FileReader) != "undefined") {  
             var reader = new FileReader();  
             reader.onload = function (e) {  
                 var data = e.target.result;  
                 /*Converts the excel data in to object*/  
                 if (xlsxflag) {  
                     var workbook = XLSX.read(data, { type: 'binary' });  
                 }  
                 else {  
                     var workbook = XLS.read(data, { type: 'binary' });  
                 }  
                 /*Gets all the sheetnames of excel in to a variable*/  
                 var sheet_name_list = workbook.SheetNames;  
  
                 var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/  
                 sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/  
                     /*Convert the cell value to Json*/  
                     if (xlsxflag) {  
                         var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);  
                     }  
                     else {  
                         var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);  
                     }  
                     if (exceljson.length > 0 && cnt == 0) {  
                         ImportData(exceljson);  
                         cnt++;  
                     }  
                 });  
                 $('#exceltable').show();  
             }  
             if (xlsxflag) {/*If excel file is .xlsx extension than creates a Array Buffer from excel*/  
                 reader.readAsArrayBuffer($("#excelfile")[0].files[0]);  
             }  
             else {  
                 reader.readAsBinaryString($("#excelfile")[0].files[0]);  
             }  
         }  
         else {  
             alert("Sorry! Your browser does not support HTML5!");  
         }  
     }  
     else {  
         alert("Please upload a valid Excel file!");  
     }  
 }  
 
 function ImportData(jsonData)
 {
    var log = $("#log");
    log.append("<div>Start to import...</div>");
    ImportLopHoc(jsonData);
     getItem("Lop").done(function(lstName){
       ImportSinhVien(jsonData,lstName);
    })
    log.append("<div>Importing to Sinhvien list</div>");
    
 }
 
 function GetSheetColumns(jsondata) {/*Function used to get all column names from JSON and bind the html table header*/  
     var columnSet = [];   
     for (var i = 0 ; i < jsondata.length; i++) {  
         var rowHash = jsondata[i];  
         for (var key in rowHash) {  
             if (rowHash.hasOwnProperty(key)) {  
                 if ($.inArray(key, columnSet) == -1) {/*Adding each unique column names to a variable array*/  
                     columnSet.push(key);   
                 }  
             }  
         }  
     }    
     return columnSet;  
 }
  function ImportSinhVien(jsonData,lstName) 
 {
    var path=document.getElementById('excelfile').value;
    var file = path.replace(/^.*[\\\/]/, '');
    var filename = file.substring(0,file.lastIndexOf("."));
    var lop=filename.slice(0,2)+'_'+filename.slice(2,4)+'_'+filename.slice(4,filename.length);
    var columns = GetSheetColumns(jsonData);
    var idlop=GetLookup(lstName,lop);    
    var clientContext = SP.ClientContext.get_current();  
    var oList = clientContext.get_web().get_lists().getByTitle('Sinhvien');
    for(var i = 1; i <jsonData.length; i++) {
        var itemCreateInfo = new SP.ListItemCreationInformation(); 
        var oListItem = oList.addItem(itemCreateInfo);
        var ho_ten=jsonData[i][columns[4]]+" "+jsonData[i][columns[5]]
        oListItem.set_item('Title', ho_ten); 
        oListItem.set_item('Lop',idlop); 
        oListItem.set_item('Masinhvien', jsonData[i][columns[3]]);   
        oListItem.update(); 
        clientContext.load(oListItem);  
    }
    
    clientContext.executeQueryAsync(function()  {
        $("#log").append("<div>" + jsonData.length + " items are added.</div>");
    } , function(e, a) {
        $("#log").append("<div>ERROR: " + JSON.stringify(a.get_message()) + "</div>");
    });
 }
 
function getItem(lstName) {
    var defer = $.Deferred(function () {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+lstName+"')/items",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                defer.resolve(data);
            },
            error: function (err) {
                console.log(err)
                defer.reject(err);
            }
        });
    });
    return defer.promise();
}
function GetLookup(lstName, val)
{
    var id = "";
    for(var itm in lstName.d.results) {
        if (lstName.d.results[itm].Title == val)
        {
            id = lstName.d.results[itm].Id;
        }
    };
    
    return id;
}
 function ImportLopHoc(jsonData) 
 {
    var columns = GetSheetColumns(jsonData); 
    var path=document.getElementById('excelfile').value;
    var file = path.replace(/^.*[\\\/]/, '');
    var filename = file.substring(0,file.lastIndexOf("."));
    var tenlop=filename.slice(0,2)+'_'+filename.slice(2,4)+'_'+filename.slice(4,filename.length);
    var nienkhoa=tenlop.split('_')[0];
    var resultnienkhoa;
    if(nienkhoa==="02"){
        resultnienkhoa="2013-2017";
    }
    if(nienkhoa==="03"){
        resultnienkhoa="2014-2018";
    }
    if(nienkhoa==="04"){
        resultnienkhoa="2015-2019";
    }
    if(nienkhoa==="05"){
        resultnienkhoa="2016-2020";
    }
    if(nienkhoa==="07"){
        resultnienkhoa="2017-2021";
    } 
    
    var clientContext = SP.ClientContext.get_current();  
    var oList = clientContext.get_web().get_lists().getByTitle('Lop');
        var itemCreateInfo = new SP.ListItemCreationInformation(); 
        var oListItem = oList.addItem(itemCreateInfo);
        oListItem.set_item('Title', tenlop);  
        oListItem.set_item('Nienkhoa', resultnienkhoa);   
        oListItem.update(); 
        clientContext.load(oListItem);  
    clientContext.executeQueryAsync(function()  {
        $("#log").append("<div>" + items.length + " items are added.</div>");
    } , function(e, a) {
        $("#log").append("<div>ERROR: " + JSON.stringify(a.get_message()) + "</div>");
    });
 }


