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
    log.append("<div>Đang cập nhật...</div>");
    //ImportMonHoc(jsonData);
    //log.append("<div>Cập nhật danh sách môn học</div>");
    //ImportLopHoc(jsonData);
    //log.append("<div>Cập nhật danh sách lớp học</div>");
    //ImportPH(jsonData);
    //log.append("<div>Cập nhật danh sách phòng học</div>");
    getUser().done(function(lstUsers){
        importThoiKhoaBieu(jsonData,lstUsers);
    })
    
    log.append("<div>Cập nhật danh sách thời khóa biểu</div>");
    
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
function getUserLogin(userTitle,lstUsers){
    var userId;

    for(var itm in lstUsers.d.results)
    {
        if (lstUsers.d.results[itm].Title == userTitle)
        {
            userId = lstUsers.d.results[itm].Id;
        }
    }
    //var userCurrentField = new SP.FieldLookupValue();
    //userCurrentField.set_lookupId(userId);
    //return userCurrentField;
    return userId ;
}
function importThoiKhoaBieu(jsonData,lstUsers) 
{   
    //var stringStartDate ="2017-11-17T03:00:00Z";
    //var stringEndDate ="2017-12-01T11:00:00Z";
    var path=document.getElementById('excelfile').value;
    var file = path.replace(/^.*[\\\/]/, '');
    var filename = file.substring(0,file.lastIndexOf("."));
    var arrNamHoc=filename.split("_");
    var hocKi=arrNamHoc[1]+arrNamHoc[2];
    var namHoc=arrNamHoc[3]+'-'+arrNamHoc[4];
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
        var tiethoc=jsonData[i][columns[8]];
        var gettiet=tiethoc.replace(/[^0-9]/g,'');
        var resultStartTime;
        var resultEndTime;
        if(gettiet==="123"){
            resultStartTime="06:30am";
            resultEndTime="09:00am";
        }
        if(gettiet==="456"){
            resultStartTime="09:05am";
            resultEndTime="11:35am";
        }
        if(gettiet==="789"){
            resultStartTime="12:30pm";
            resultEndTime="03:00pm";
        }
        if(gettiet==="012"){
            resultStartTime="03:05pm";
            resultEndTime="05:35pm";
        }
        var getDate=jsonData[i][columns[10]];
        var splitGetDate=getDate.split(" - ");
        var resultStartDate=splitGetDate[0];
        var resultEndDate=splitGetDate[1];
        var user = getUserLogin(jsonData[i][columns[2]],lstUsers);
        var stringStartDate=moment(`${resultStartDate} ${resultStartTime}`,'DD/MM/YYYY h:mma').utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]');
        var stringEndDate=moment(`${resultEndDate} ${resultEndTime}`,'DD/MM/YYYY h:mma').utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]');
        var ngay= `<recurrence><rule><firstDayOfWeek>su</firstDayOfWeek><repeat><weekly ${resultday}='TRUE' weekFrequency='1' /></repeat><repeatForever>FALSE</repeatForever></rule></recurrence>`;            
        var data = {
            '__metadata': {
                'type': 'SP.Data.TKListItem'
            },
            'Title':jsonData[i][columns[1]],
            'UserLoginId': user,
            'Tenmonhoc':jsonData[i][columns[4]],
            'Sotinchi':jsonData[i][columns[5]],
            'Mamonhoc':jsonData[i][columns[3]],
            'Siso':jsonData[i][columns[6]],
            'Phong':jsonData[i][columns[9]],
            'Buoi':jsonData[i][columns[11]],
            'EventDate': stringStartDate,
            'EndDate': stringEndDate,
            'Hocki':hocKi,
            'Namhoc':namHoc,
            'fRecurrence': true,
            'fAllDayEvent': false,
            'RecurrenceData': ngay,
            'UID': guid,
            'EventType': 1
        };

        //create a string that has the events
        var recReq =
                {
            url: _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('Thời khóa biểu')/items",
            type: "POST",
            data: JSON.stringify(data),
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            }
        };
    
        jQuery.ajax(recReq).success(function(s) {
            console.log("ok");
        }).error(function(e) {console.log(i); console.log(e) });
    }
}
function getUser() {
    var defer = $.Deferred(function () {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('User%20Information%20List')/items",
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
function ImportMonHoc(jsonData) 
 {
    var items = [];
    var listitemcollection = [];
    
    var columns = GetSheetColumns(jsonData);
        
    for (var i = 0; i < jsonData.length; i++) {  
        var tenmonhoc = (jsonData[i][columns[4]] != null ? jsonData[i][columns[4]] : "");
        var mamonhoc =  (jsonData[i][columns[3]] != null ? jsonData[i][columns[3]] : "");
        var tctemp = (jsonData[i][columns[5]] != null ? jsonData[i][columns[5]] : "");
        var tclt = 0;
        var tcth = 0;
        if (tctemp.indexOf("LT") >= 0)
            tclt = tctemp.replace("(LT)", "");
        else if (tctemp.indexOf("(TH)") >= 0)
            tcth = tctemp.replace("(TH)", "");
        
        var item = { MMH: mamonhoc, TMH: tenmonhoc, TCLT: tclt, TCTH: tcth }
        
        var existed = false;
        $.each(items, function(idx, val) {
            var currentItem = items[idx];
            if (currentItem.MMH === mamonhoc && currentItem.TMH === tenmonhoc)
            {
                existed = true;
                if (currentItem.TCLT === 0)
                    currentItem.TCLT =  tclt;
                if (currentItem.TCTH === 0)
                    currentItem.TCTH =  tcth;
            }
        });
        
        if (!existed)
        {
            items.push(item);
        }
    }  
    
    var clientContext = SP.ClientContext.get_current();  
    var oList = clientContext.get_web().get_lists().getByTitle('Monhoc');
    for(var idx = 0; idx < items.length; idx++) {
        var itemCreateInfo = new SP.ListItemCreationInformation(); 
        var oListItem = oList.addItem(itemCreateInfo);
        oListItem.set_item('Title', items[idx].TMH);  
        oListItem.set_item('Mamonhoc', items[idx].MMH);  
        oListItem.set_item('Sotinchi', items[idx].TCLT);
        oListItem.set_item('Sotinchithuchanh', items[idx].TCTH); 
        oListItem.update(); 
        clientContext.load(oListItem);  
    }
    
    clientContext.executeQueryAsync(function()  {
        $("#log").append("<div>" + items.length + " items are added.</div>");
    } , function(e, a) {
        $("#log").append("<div>ERROR: " + JSON.stringify(a.get_message()) + "</div>");
    });
 }
 function ImportPH(jsonData) 
 {
    var items = [];
    var listitemcollection = [];
    
    var columns = GetSheetColumns(jsonData);
        
    for (var i = 0; i < jsonData.length; i++) {  
        var tenphonghoc = (jsonData[i][columns[9]] != null ? jsonData[i][columns[9]] : "");
        var item = { PH: tenphonghoc }
        
        var existed = false;
        $.each(items, function(idx, val) {
            var currentItem = items[idx];
            if (currentItem.PH === tenphonghoc)
            {
                existed = true;
                
            }
        });
        
        if (!existed)
        {
            items.push(item);
        }
    }  
    
    var clientContext = SP.ClientContext.get_current();  
    var oList = clientContext.get_web().get_lists().getByTitle('Phonghoc');
    for(var idx = 0; idx < items.length; idx++) {
        var itemCreateInfo = new SP.ListItemCreationInformation(); 
        var oListItem = oList.addItem(itemCreateInfo);
        oListItem.set_item('Title', items[idx].PH);   
        oListItem.update(); 
        clientContext.load(oListItem);  
    }
    
    clientContext.executeQueryAsync(function()  {
        $("#log").append("<div>" + items.length + " items are added.</div>");
    } , function(e, a) {
        $("#log").append("<div>ERROR: " + JSON.stringify(a.get_message()) + "</div>");
    });
 }
 function ImportLopHoc(jsonData) 
 {
    var items = [];
    var listitemcollection = [];
    
    var columns = GetSheetColumns(jsonData);
        
    for (var i = 0; i < jsonData.length; i++) {  
        var tenlop = (jsonData[i][columns[1]] != null ? jsonData[i][columns[1]] : "");
        var siso = (jsonData[i][columns[6]] != null ? jsonData[i][columns[6]] : "");
        var item = { TL: tenlop,SS:siso }
        
        var existed = false;
        $.each(items, function(idx, val) {
            var currentItem = items[idx];
            if (currentItem.TL === tenlop && currentItem.SS === siso)
            {
                existed = true;
                
            }
        });
        
        if (!existed)
        {
            items.push(item);
        }
    }  
    
    var clientContext = SP.ClientContext.get_current();  
    var oList = clientContext.get_web().get_lists().getByTitle('Lop');
    for(var idx = 0; idx < items.length; idx++) {
        var itemCreateInfo = new SP.ListItemCreationInformation(); 
        var oListItem = oList.addItem(itemCreateInfo);
        oListItem.set_item('Title', items[idx].TL);  
        oListItem.set_item('Siso', items[idx].SS);   
        oListItem.update(); 
        clientContext.load(oListItem);  
    }
    
    clientContext.executeQueryAsync(function()  {
        $("#log").append("<div>" + items.length + " items are added.</div>");
    } , function(e, a) {
        $("#log").append("<div>ERROR: " + JSON.stringify(a.get_message()) + "</div>");
    });
 }