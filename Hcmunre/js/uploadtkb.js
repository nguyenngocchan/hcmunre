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
    importThoiKhoaBieu(jsonData);
    log.append("<div>Importing to TKB</div>");
    
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
function createGuid()  
{  
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);  
      return v.toString(16);  
   });  
}  
var guid = createGuid();
function importThoiKhoaBieu(jsonData) 
{   
    var stringStartDate ="2017-11-17T03:00:00Z";
    var stringEndDate ="2017-12-01T11:00:00Z";
    var columns = GetSheetColumns(jsonData);          
    for(var i = 0; i < jsonData.length; i++){
        var day=jsonData[i][columns[7]];
        var resultday;
        if(day==2){
            resultday="mo";
        }
        if(day==3){
            resultday="tu";
        }
        if(day==4){
            resultday="we";
        }
        if(day==5){
            resultday="th";
        }
        if(day==6){
            resultday="fr";
        }
        var ngay= `<recurrence><rule><firstDayOfWeek>su</firstDayOfWeek><repeat><weekly ${resultday}='TRUE' weekFrequency='1' /></repeat><repeatForever>FALSE</repeatForever></rule></recurrence>`;            
        var data = {
            '__metadata': {
                'type': 'SP.Data.TKListItem'
            },
            'Title':jsonData[i][columns[1]],
            'Tengiangvien':jsonData[i][columns[2]],
            'Lop':jsonData[i][columns[1]],
            'EventDate': stringStartDate,
            'EndDate': stringEndDate,
            'Location': 'Seattle',
            'Description': 'Daily 5',
            'fRecurrence': true,
            'fAllDayEvent': false,
            'RecurrenceData': ngay,
            'UID': guid,
            'EventType': 1
        };
        //create a string that has the events
        var recReq =
                {
            url: _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('TK')/items",
            type: "POST",
            data: JSON.stringify(data),
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            }
        };
    
        jQuery.ajax(recReq)
    }
    function success(){
            alert("Event data saved.");             
        }
    function error(err) {
        alert("Error occurred while saving question data.");
        console.log("ERROR", err);
    }
}