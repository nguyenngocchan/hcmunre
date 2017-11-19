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
    //log.append("<div>Importing to Monhoc list.</div>");
    
    //ImportMonHoc(jsonData);
    
log.append("<div>Importing to Lop list.</div>");
    //Tam thoi de Lop/SiSo trong list Calendar
     ImportLopHoc(jsonData);
    //log.append("<div>Importing to Phonghoc list</div>");
    //ImportPH(jsonData);   
    //log.append("<div>Import to Schedule.</div>");
    
    //ImportSchedule(jsonData);
    
    log.append("Xong!");
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
 
function ImportSchedule(jsonData) 
{
    
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

    

