function sum(input){             
    if (toString.call(input) !== "[object Array]")
        return false;
    var total =  0;
    for(var i=0;i<input.length;i++)
      {                  
        if(isNaN(input[i])){
        continue;
         }
          total += Number(input[i]);
       }
    return total;
}
function getItems(){
    // Getting our list items
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Thời%20khóa%20biểu')/items?$select=Id,Title,EventDate,EndDate,Ten_x0020_mon_x0020_hoc/Sotinchithuchanh,Ten_x0020_mon_x0020_hoc/Sotinchi,Ten_x0020_mon_x0020_hoc/Id,Ten_x0020_mon_x0020_hoc/Title,Ten_x0020_mon_x0020_hoc/Mamonhoc,Tenlop/Siso,Tenlop/Title,Phonghoc/Title,Buoi,Hocki,Namhoc,UserLogin/Title,UserLogin/JobTitle,UserLogin/Id&$expand=UserLogin,Tenlop,Phonghoc,Ten_x0020_mon_x0020_hoc&$filter=((UserLogin/Title%20eq%20%27Hà%20Thanh%20Vân%27)%20and%20(Namhoc%20eq%20%272017-2018%27)%20and%20(Hocki%20eq%20%27HKI%27))&$top=1000",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            var items = [];
            for (var i in data.d.results) {
            }
        },
        error: function (data) {
            
        }
    });
}
function getNamHoc(){
    // Getting our list items
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Thời khóa biểu')/items?$select=Namhoc&$top=1000",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            var items = [];
            var item=[];
            for (var i in data.d.results) {
                var namhoc = (data.d.results[i].Namhoc)?data.d.results[i].Namhoc:'';
                var arrnamhoc={NH:namhoc};
                var existed=false;
                $.each(items,function(idx,val){
                        var currentItem=items[idx];
                        if(currentItem.NH===namhoc){
                            existed=true;
                        }               
                    }
                );  
                if(!existed){
                    items.push(arrnamhoc);
                }
            }
            for(var idx = 0; idx < items.length; idx++) {
                var tennamhoc = items[idx].NH;
                var html=('<option value="'+tennamhoc+'">'+tennamhoc+'</option>');
                item.push(html); 
            }
            jQuery('#select_namhoc').append(item.join(''));
        },
        error: function (data) {
            
        }
    });
}
function getHocKi(){
    var namhoc=$("#select_namhoc option:selected").text();
    // Getting our list items
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Thời khóa biểu')/items?$select=Namhoc,Hocki&$filter=Namhoc eq '"+namhoc+"'&$top=1000",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            var items = [];
            var item=[];
            for (var i in data.d.results) {
                var hocki = (data.d.results[i].Hocki)?data.d.results[i].Hocki:'';
                var arrhocki={HK:hocki};
                var existed=false;
                $.each(items,function(idx,val){
                        var currentItem=items[idx];
                        if(currentItem.HK===hocki){
                            existed=true;
                        }               
                    }
                );  
                if(!existed){
                    items.push(arrhocki);
                }
            }
            for(var idx = 0; idx < items.length; idx++) {
                var tenhocki = items[idx].HK;
                var html=('<option value="'+tenhocki+'">'+tenhocki+'</option>');
                item.push(html); 
            }
            jQuery('#select_hocki').html(item.join(''));
        },
        error: function (data) {
            
        }
    });
}
function getTenGiangVien() {
    // Getting our list items
    var hocki=$("#select_hocki option:selected").text();
    var namhoc=$("#select_namhoc option:selected").text();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Thời khóa biểu')/items?$select=UserLogin/Title,UserLogin/ID&$expand=UserLogin&$filter=((Namhoc eq '"+namhoc+"') and (Hocki eq '"+hocki+"'))&$top=1000",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            var items = [];
            var item=[];
            for (var i in data.d.results) {
                var tengiangvien = (data.d.results[i].UserLogin.Title)?data.d.results[i].UserLogin.Title:'';
                var arrgiangvien={TGV:tengiangvien};
                var existed=false;
                $.each(items,function(idx,val){
                        var currentItem=items[idx];
                        if(currentItem.TGV===tengiangvien){
                            existed=true;
                        }               
                    }
                );  
                if(!existed){
                    items.push(arrgiangvien);
                }
            }
            for(var idx = 0; idx < items.length; idx++) {
                var tengiangvien = items[idx].TGV;
                var html=('<option value="#myModal" id="'+tengiangvien+'">'+tengiangvien+'</option>');
                item.push(html); 
            }
            jQuery('#select_id').html(item.join(''));
        },
        error: function (data) {
            
        }
    });
}
function getKhoiLuongGiangVien(lstLookup) {
    // Getting our list items
    var hocki=$("#select_hocki option:selected").text();
    var namhoc=$("#select_namhoc option:selected").text();
    var ten=$("#select_id option:selected").text();
    var query="/_api/web/lists/getbytitle('Thời%20khóa%20biểu')/items?$select=Id,Title,EventDate,EndDate,Ten_x0020_mon_x0020_hoc/Sotinchithuchanh,Ten_x0020_mon_x0020_hoc/Sotinchi,Ten_x0020_mon_x0020_hoc/Id,Ten_x0020_mon_x0020_hoc/Title,Ten_x0020_mon_x0020_hoc/Mamonhoc,Tenlop/Siso,Tenlop/Title,Phonghoc/Title,Buoi,Hocki,Namhoc,UserLogin/Title,UserLogin/JobTitle,UserLogin/Id&$expand=UserLogin,Tenlop,Phonghoc,Ten_x0020_mon_x0020_hoc&$filter=((UserLogin/Title eq '"+ten+"') and (Namhoc eq '"+namhoc+"') and (Hocki eq '"+hocki+"'))&$top=1000";
    //"/_api/web/lists/getbytitle('Thời%20khóa%20biểu')/items?$select=Id,Title,EventDate,EndDate,Tenmonhoc,Sotinchi,Mamonhoc,Siso,Phong,Buoi,Hocki,Namhoc,UserLogin/Title,UserLogin/Id&$expand=UserLogin&$filter=((Namhoc eq '"+namhoc+"') and (Hocki eq '"+hocki+"') and (UserLogin/Title eq '"+ten+"'))&$top=1000";
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + query,   
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            var items = [];
            var arrkekhai=[];
            var arrtong2=[];
            var item=[];
            for (var i in data.d.results) { 
                var parsesiso=0;
                var strLop = "";
                $.each(data.d.results[i].Tenlop.results, function(j,v) {
                    strLop +=  v.Title +"<br/>";
                    parsesiso+=parseInt(v.Siso);
                });
                
                var tenmonhoc=(data.d.results[i].Ten_x0020_mon_x0020_hoc.Title)?data.d.results[i].Ten_x0020_mon_x0020_hoc.Title:'';
                var lop=strLop;
                var siso=parsesiso;
                var tclt=(data.d.results[i].Ten_x0020_mon_x0020_hoc.Sotinchi)?data.d.results[i].Ten_x0020_mon_x0020_hoc.Sotinchi:'';
                var tcth=(data.d.results[i].Ten_x0020_mon_x0020_hoc.Sotinchithuchanh)?data.d.results[i].Ten_x0020_mon_x0020_hoc.Sotinchithuchanh:'';  
                var htmlhocvi=(data.d.results[i].UserLogin.JobTitle)?data.d.results[i].UserLogin.JobTitle:'';
                item={TMH: tenmonhoc,LOP:lop,TCLT: tclt, TCTH: tcth,SS:siso};
                var existed = false;
                $.each(items, function(idx, val) {
                    var currentItem = items[idx];
                    if (currentItem.TMH === tenmonhoc && currentItem.LOP === lop)
                    {
                        existed = true;
                        currentItem.TMH=tenmonhoc;
                        currentItem.LOP=lop;
                    }
                });
                
                if (!existed)
                {
                    items.push(item);
                }      
            }
            for(var idx=0;idx<items.length;idx++){
                var sotietltth=items[idx].TCLT*15+'/'+items[idx].TCTH*30;
                var sotietlt=items[idx].TCLT*15;
                var sotietth=items[idx].TCTH*30;
                var sisolt;
                var sisoth;
                if(sotietlt!=0 && sotietth!=0){
                    sisolt=sisoth=items[idx].SS;                
                }
                if(sotietlt==0 && sotietth!=0){
                    sisolt=0;
                    sisoth=items[idx].SS;
                }
                if(sotietlt!=0 && sotietth==0){
                    sisolt=items[idx].SS;
                    sisoth=0;
                }
                var bacdaotao;
                var splitlop=(items[idx].LOP).split("_");
                if(splitlop[1]==="ĐH"){
                    bacdaotao="ĐH";
                }
                if(splitlop[1]==="TRC"){
                    bacdaotao="TRC";
                }
                if(splitlop[1]==="CĐ"){
                    bacdaotao="CĐ";
                }
                else{
                    bacdaotao="ĐH-TC"
                    }
                var ldth;
                if(sisoth<27){
                    ldth=1;
                }
                if(sisoth>26 && sisoth<39){
                    ldth=1.1;
                }
                if(sisoth>38){
                    ldth=1.2;
                }
                var dtkc=0.95;
                if(bacdaotao==="ĐH" || bacdaotao==="CĐ"){
                    dtkc=1.1;
                }
                if(bacdaotao==="ĐH-TC"){
                    dtkc=2;
                }
                if(bacdaotao==="ĐH-TA"){
                    dtkc=1.2;
                }
                var getngoaigio="TG"
                var ngoaigio=1;
                if(getngoaigio==="NG"){
                    ngoaigio=1.4;
                }
                var hocvikh=0.8;
                if(htmlhocvi==="Thạc sĩ"){
                    hocvikh=1;
                }
                if(htmlhocvi==="Thạc sĩ - Giảng viên chính"){
                    hocvikh=1.2;
                }
                if(htmlhocvi==="Tiến sĩ"){
                    hocvikh=1.4;
                }
                if(htmlhocvi==="Tiến sĩ - Giảng viên chính"){
                    hocvikh=1.5;
                }
                if(htmlhocvi==="Phó Giáo sư - Giảng viên cao cấp"){
                    hocvikh=2.5;
                }
                var getldlt=GetLookup(lstLookup,sisolt);
                var htmlkekhai=(
                  '<tr class="xl158 trdataitem" height="22" style="height:16.5pt" >'+  
                  '<td height="22" class="xl190" style="height:16.5pt;border-top:none">'+items[idx].TMH+'</td>'+
                  '<td class="xl151" style="border-top:none;border-left:none">'+items[idx].LOP+'</td>'+
                  '<td class="xl152" style="border-top:none;border-left:none">'+sotietltth+'</td>'+
                  '<td class="xl154" style="border-top:none;border-left:none">'+((items[idx].TCLT*15)+((items[idx].TCTH*30)*0.75))+'</td>'+
                  '<td class="xl152" style="border-top:none;border-left:none">'+sisolt+'</td>'+
                  '<td class="xl152" style="border-top:none;border-left:none">'+sisoth+'</td>'+
                  '<td class="xl153" style="border-top:none;border-left:none">'+bacdaotao+'</td>'+
                  '<td class="xl152" style="border-top:none;border-left:none">'+getngoaigio+'</td>'+
                  '<td class="xl154" style="border-top:none;border-left:none">'+getldlt+'</td>'+
                  '<td class="xl154" style="border-top:none;border-left:none">'+ldth+'</td>'+
                  '<td class="xl154" style="border-top:none;border-left:none">'+dtkc+'</td>'+
                  '<td class="xl155" style="border-top:none;border-left:none">'+hocvikh+'</td>'+
                  '<td class="xl154" style="border-top:none;border-left:none">'+ngoaigio+'</td>'+
                  '<td class="xl156" align="right" style="border-top:none;border-left:none">'+(((items[idx].TCLT*15)+((items[idx].TCTH*30)*0.75)))*ldth*dtkc*ngoaigio*getldlt+'</td>'+
                  '<td class="xl157" style="border-top:none;border-left:none">&nbsp;</td>'+
                  '<td class="xl158"></td>'+
                  '<td class="xl158"></td>'+
                  '<td class="xl158"></td>'+
                  '<td class="xl158"></td>'+
                  '<td class="xl158"></td>'+
                  '<td class="xl158"></td>'+
                  '<td class="xl158"></td>'+
                  '<td class="xl158"></td>'+
                  '<td class="xl158"></td>'+
                  '<td class="xl158"></td>'+
                  '</tr>'
                    );
               
               var tong2=(((items[idx].TCLT*15)+((items[idx].TCTH*30)*0.75)))*ldth*dtkc*ngoaigio;
               arrtong2.push(tong2);
                arrkekhai.push(htmlkekhai);  
            } 
            var htmltengiangvien = (data.d.results[i].UserLogin.Title)?data.d.results[i].UserLogin.Title:'';  
            jQuery('#tong2').html(sum(arrtong2));
            jQuery('#hocvi').html(htmlhocvi);
            jQuery('#tengiangvien').html(htmltengiangvien);
            //jQuery('#kekhai').html(items.join(''));
            jQuery('#testTable > tbody > tr.trdataitem').each(function() { jQuery(this).remove(); });
            jQuery('#testTable > tbody > tr').eq(jQuery('#dataafter').index()).after(arrkekhai.join(''));
        },
        error: function (data) {
            
        }
    });
}
var tableToExcel = (function() {
          var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
          return function(table, name) {
            if (!table.nodeType) table = document.getElementById(table)
            var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
            window.location.href = uri + base64(format(template, ctx))
          }
        })()
function getItem(lstName) {
    var defer = $.Deferred(function () {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+lstName+"')/items?$top=1000",
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
    var ldlt = 1.5;
    for(var itm in lstName.d.results) {
        if (lstName.d.results[itm].Title == val)
        {
            ldlt = lstName.d.results[itm].Ldlt;
        }
    };
    
    return ldlt;
}
jQuery(document).ready(function(){
    getNamHoc();
   // getHocKi();
    
    $("#select_id").change(function () {
    $( $(this).val() ).modal('show');
    getItem("DK").done(function(lstLookup){
         getKhoiLuongGiangVien(lstLookup);
        });
    }); 

});
