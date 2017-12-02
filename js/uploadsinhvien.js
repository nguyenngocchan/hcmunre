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
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Thời khóa biểu')/items(1681)",
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
            jQuery('#select_hocki').append(item.join(''));
        },
        error: function (data) {
            
        }
    });
}
function getTenGiangVien() {
    // Getting our list items
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Thời khóa biểu')/items?$select=UserLogin/Title,UserLogin/ID&$expand=UserLogin&$top=1000",
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
            jQuery('#select_id').append(item.join(''));
        },
        error: function (data) {
            
        }
    });
}
function getKhoiLuongGiangVien() {
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
                var tenmonhoc=(data.d.results[i].Ten_x0020_mon_x0020_hoc.Title)?data.d.results[i].Ten_x0020_mon_x0020_hoc.Title:'';
                var lop=(data.d.results[i].Tenlop.Title)?data.d.results[i].Tenlop.Title:'';
                var siso=(data.d.results[i].Tenlop.Siso)?data.d.results[i].Tenlop.Siso:'';
                //var tctemp=(data.d.results[i].Sotinchi)?data.d.results[i].Sotinchi:''; 
                var htmlhocvi=(data.d.results[i].UserLogin.JobTitle)?data.d.results[i].UserLogin.JobTitle:'';
                var tclt=0;
                var tcth=0;
                if (tctemp.indexOf("LT") >= 0)
                tclt = tctemp.replace("(LT)", "");
                else if (tctemp.indexOf("(TH)") >= 0)
                tcth = tctemp.replace("(TH)", "");
                item={TMH: tenmonhoc,LOP:lop,TCLT: tclt, TCTH: tcth,SS:siso};
                var existed = false;
                $.each(items, function(idx, val) {
                    var currentItem = items[idx];
                    if (currentItem.TMH === tenmonhoc && currentItem.LOP === lop)
                    {
                        existed = true;
                        currentItem.TMH=tenmonhoc;
                        currentItem.LOP=lop;
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
                  '<td class="xl154" style="border-top:none;border-left:none">1</td>'+
                  '<td class="xl154" style="border-top:none;border-left:none">'+ldth+'</td>'+
                  '<td class="xl154" style="border-top:none;border-left:none">'+dtkc+'</td>'+
                  '<td class="xl155" style="border-top:none;border-left:none">'+hocvikh+'</td>'+
                  '<td class="xl154" style="border-top:none;border-left:none">'+ngoaigio+'</td>'+
                  '<td class="xl156" align="right" style="border-top:none;border-left:none">'+(((items[idx].TCLT*15)+((items[idx].TCTH*30)*0.75)))*ldth*dtkc*ngoaigio+'</td>'+
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
jQuery(document).ready(function(){
    getNamHoc();
   // getHocKi();
    getTenGiangVien();
    $("#select_id").change(function () {
    $( $(this).val() ).modal('show');
    getKhoiLuongGiangVien();
    }); 
    
});
var a=new Array(1,2,3,4,5,6,7,8,9,10,15);
for(var i=0;i<a.length;i++){
    switch(a[i]){
        case a[i]%3===0:
            a[i]="ba";
            break;
        case a[i]%5===0:
            a[i]="ba";
            break;
        case a[i]%5===0 && a[i]%3===0:
            a[i]="ba";
            break;        
    }
    console.log(a[i]);
    }
}
    