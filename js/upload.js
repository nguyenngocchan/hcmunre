function ExportToTable() {  
     var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;  
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
    
    //Import Mon hoc
    log.append("<div>Importing to Monhoc list.</div>");
    
    ImportMonHoc(jsonData).done(function(lstMH) {
        log.append("<div>Importing to Phonghoc list.</div>");
        ImportPH(jsonData).done(function(lstPH) {
            log.append("<div>Importing to Schedule list.</div>");
            ImportSchedule(jsonData, lstMH, lstPH);
        });
    });
    
 }
 
 function GetSheetColumns(jsondata) {/*Function used to get all column names from JSON and bind the html table header*/  
     var columnSet = [];   
     for (var i = 0; i < jsondata.length; i++) {  
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

function GetLookup(lstLK, val)
{
    var id = 0;
    $.each(lstLK, function(idx, v) {
        if (v.$2_0.$1g_0.$m_dict.Title == val)
        {
            id = v.$2_0.$1g_0.$m_dict.Id;
        }
    });
    
    return id;
}

function FormatDateTime(dt, i, t)
{
    dt = dt.trim();
    var timeparts = dt.split("/");
    var h = 0, m = 0;
    if (t.indexOf("123") >= 0)
    {
        if (i == 0)
        {
            h = 6; m = 30;
        }
        else
        {
            h = 9; m = 0;
        }
    }
    else if (t.indexOf("456") >= 0)
    {
        if (i == 0)
        {
            h = 9; m = 30;
        }
        else
        {
            h = 12; m = 0;
        }
    }
    else if (t.indexOf("789") >= 0)
    {
        if (i == 0)
        {
            h = 12; m = 30;
        }
        else
        {
            h = 15; m = 0;
        }
    }
    else if (t.indexOf("012") >= 0)
    {
        if (i == 0)
        {
            h = 15; m = 30;
        }
        else
        {
            h = 18; m = 0;
        }
    }
    
    return (new Date(Date.UTC(parseInt(timeparts[2]), parseInt(timeparts[1])-1, parseInt(timeparts[0]), h, m, 0)));
}


function GetRepeat(t)
{
    var r = "";
    switch(parseInt(t))
    {
        case 2: r = "mo=\"true\""; break;
        case 3: r = "tu=\"true\""; break;
        case 4: r = "we=\"true\""; break;
        case 5: r = "th=\"true\""; break;
        case 6: r = "fr=\"true\""; break;
        case 7: r = "sa=\"true\""; break;
        case 0:
        default: r = "su=\"true\""; break;
    }
    return r;
}

function ImportSchedule(jsonData, lstMH, lstPH) 
{
    $("#log").append("<div>Importing the schedule list.</div>");
    
    var clientContext = SP.ClientContext.get_current(); 
    var oList = clientContext.get_web().get_lists().getByTitle('Thoikhoabieu');
    
    var columns = GetSheetColumns(jsonData);
    
    var uncount = 0;
    var count = 0;
    
    for (var i = 0; i < jsonData.length; i++) {  
        var malop = (jsonData[i][columns[1]] != null ? jsonData[i][columns[1]] : "");
        var gv = (jsonData[i][columns[2]] != null ? jsonData[i][columns[2]] : "");
        var siso =  (jsonData[i][columns[6]] != null ? jsonData[i][columns[6]] : "");       
        var mamh = (jsonData[i][columns[3]] != null ? jsonData[i][columns[3]] : "");
        var tc = (jsonData[i][columns[5]] != null ? jsonData[i][columns[5]] : "");
        var thu = (jsonData[i][columns[7]] != null ? jsonData[i][columns[7]] : "");
        var tiet = (jsonData[i][columns[8]] != null ? jsonData[i][columns[8]] : "");
        var phong = (jsonData[i][columns[9]] != null ? jsonData[i][columns[9]] : "");
        var thoigian = (jsonData[i][columns[10]] != null ? jsonData[i][columns[10]] : "");
        var timeparts = thoigian.split("-");
        var starttime = FormatDateTime(timeparts[0], 0, tiet);
        var endtime  = FormatDateTime(timeparts[1], 1, tiet);
        
        console.log(starttime);
        console.log(endtime);
        console.log("---");
        
        
        if (phong == "")
        {
            $("#log").append("<div>Phong is empty</div>");
            uncount++;
        }
        else
        {
            //get Monhoc lookup
            var monhocid = GetLookup(lstMH, mamh);
            var phongid = GetLookup(lstPH, phong);
                    
            var clientContext = SP.ClientContext.get_current(); 
            var oList = clientContext.get_web().get_lists().getByTitle('Thoikhoabieu');
            var itemCreateInfo = new SP.ListItemCreationInformation();  
            oListItem = oList.addItem(itemCreateInfo); 
        
            oListItem.set_item('Title',gv);
            oListItem.set_item('RecurrenceData',"<recurrence><rule><firstDayOfWeek>su</firstDayOfWeek><repeat><weekly " + GetRepeat(thu) + " weekFrequency=\"1\" /></repeat><windowEnd>" + endtime.toISOString()  + "</windowEnd></rule></recurrence>"); 
            oListItem.set_item('fRecurrence', true);
            oListItem.set_item('EventType', 1);
            oListItem.set_item('UID', Guid());
            oListItem.set_item('fAllDayEvent', false);
            oListItem.set_item('EventDate', starttime.toISOString());
            oListItem.set_item('EndDate', endtime.toISOString());
            //oListItem.set_item('Phonghoc', phongid + ";#" + phongid);
            //oListItem.set_item('MonHoc', monhocid + ";#" + monhocid);
            //oListItem.set_item('LoaiMonHoc', (tc.indexOf("LT") >= 0 ? "LT" : "TH"));
            //oListItem.set_item('LopHoc', malop);
            //oListItem.set_item('Siso', siso);
            oListItem.update();
                        
            count++;
            clientContext.load(oListItem);
        }
        
        //End if
    } 
    //end for
    
   clientContext.executeQueryAsync(function()  {
        $("#log").append("<div>" + count + " items are added to Thoikhoabieu list. " + uncount + " items are not added to Thoikhoabieu list.</div>");
    } , function(e, a) {
        console.log(a);
        $("#log").append("<div>ERROR: " + a.get_message() + "</div>");
    });
}

function Guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

function ExportToTable2()
{
    var today = new Date();
    var t = Date.UTC(today.getFullYear(), today.getMonth(), today.getDay(), today.getHours(), today.getMinutes(), today.getSeconds());
    var t3 = Date.UTC(today.getFullYear(), today.getMonth() + 5, today.getDay(), today.getHours() + 3, today.getMinutes(), today.getSeconds());
    
    var clientContext = SP.ClientContext.get_current(); 
    var oList = clientContext.get_web().get_lists().getByTitle('Thoikhoabieu');
    var itemCreateInfo = new SP.ListItemCreationInformation();  
    oListItem = oList.addItem(itemCreateInfo); 

    oListItem.set_item('Title','X Items 6');
    oListItem.set_item('RecurrenceData',"<recurrence><rule><firstDayOfWeek>su</firstDayOfWeek><repeat><weekly mo=\"true\" weekFrequency=\"1\" /></repeat><windowEnd>2017-11-30T17:00:00Z</windowEnd></rule></recurrence>"); 
    oListItem.set_item('fRecurrence', true);
    oListItem.set_item('EventType', 1);
    oListItem.set_item('UID', Guid());
    oListItem.set_item('fAllDayEvent', false);
    oListItem.set_item('EventDate', "2017-10-31T13:00:00Z");
    oListItem.set_item('EndDate', "2017-11-27T17:00:00Z");
    oListItem.update();
    clientContext.load(oListItem);
    clientContext.executeQueryAsync(function()  {
        $("#log").append("<div>items are added to Thoikhoabieu list.</div>");
    } , function(e, a) {
    console.log(a);
        $("#log").append("<div>ERROR: " + a + "</div>");
    });
}
 
function ImportLop(jsonData)
{

    var items = [];
    var tmpitems = [];
    
    var columns = GetSheetColumns(jsonData);
        
    for (var i = 0; i < jsonData.length; i++) {  
        var malop = (jsonData[i][columns[1]] != null ? jsonData[i][columns[1]] : "");
        var siso =  (jsonData[i][columns[6]] != null ? jsonData[i][columns[6]] : "");
        if (malop.indexOf("\r") > 0)
        {
            tmpitems.push({ ML: malop, SS: siso });
        }
        else
        {
            var existed = false;
            $.each(items, function(idx, val) {
                var currentItem = items[idx];
                if (currentItem.ML === malop)
                {
                    existed = true;
                }
            });
            if (!existed)
            {
                items.push({ ML: malop, SS: siso });
            }
        }
    } 
    
    //XU LY LOP HOC GHEP
    
    for(var idx = 0; idx < tmpitems.length; idx++) 
    {
        var tmp = tmpitems[idx];
        var parts = tmp.ML.split("\r");
        // if parts.0 is not existed => Count
        // if parts
    } 
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
        listitemcollection.push(oListItem);
        clientContext.load(oListItem);  
    }
    
    var defer = jQuery.Deferred(function () {
        clientContext.executeQueryAsync(function()  {
            $("#log").append("<div>" + items.length + " items are added to Monhoc list.</div>");
            defer.resolve(listitemcollection);
        } , function(e, a) {
            $("#log").append("<div>ERROR: " + JSON.stringify(a.get_message()) + "</div>");
            defer.resolve(listitemcollection);
        });
    });
    
    return defer.promise();
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
        listitemcollection.push(oListItem);
        clientContext.load(oListItem);  
    }
    
    var defer = jQuery.Deferred(function () {
        clientContext.executeQueryAsync(function()  {
            $("#log").append("<div>" + items.length + " items are added to Phonghoc list.</div>");
            defer.resolve(listitemcollection);
        } , function(e, a) {
            $("#log").append("<div>ERROR: " + JSON.stringify(a.get_message()) + "</div>");
            defer.resolve(listitemcollection);
        });
    });
    
    return defer.promise();
 }

 function BindTable(jsondata, tableid) {/*Function used to convert the JSON array to Html Table*/  
     var columns = BindTableHeader(jsondata, tableid); /*Gets all the column headings of Excel*/  
     for (var i = 0; i < jsondata.length; i++) {  
         var row$ = $('<tr/>');  
         for (var colIndex = 0; colIndex < columns.length; colIndex++) {  
             var cellValue = jsondata[i][columns[colIndex]];  
             
             if (cellValue == null)  
                 cellValue = "";  
             row$.append($('<td/>').html(cellValue));  
         }  
         $(tableid).append(row$);  
     }  
 }  
 function BindTableHeader(jsondata, tableid) {/*Function used to get all column names from JSON and bind the html table header*/  
     var columnSet = [];  
     var headerTr$ = $('<tr/>');  
     for (var i = 0; i < jsondata.length; i++) {  
         var rowHash = jsondata[i];  
         for (var key in rowHash) {  
             if (rowHash.hasOwnProperty(key)) {  
                 if ($.inArray(key, columnSet) == -1) {/*Adding each unique column names to a variable array*/  
                     columnSet.push(key);  
                     headerTr$.append($('<th/>').html(key));  
                 }  
             }  
         }  
     }  
     $(tableid).append(headerTr$);  
     return columnSet;  
 }
    
    