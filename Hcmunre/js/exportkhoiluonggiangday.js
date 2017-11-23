function getTenGiangVien() {
    // Getting our list items
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Thời khóa biểu')/items?$select=UserLogin/Title,UserLogin/ID&$expand=UserLogin",
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
    var tengiangvien=$("select option:selected").text();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Thời%20khóa%20biểu')/items?$select=Id,Title,EventDate,EndDate,Tenmonhoc,Sotinchi,Mamonhoc,Siso,Phong,Buoi,Hocki,Namhoc,UserLogin/Title,UserLogin/Id&$expand=UserLogin&$filter=UserLogin/Title eq '"+tengiangvien+"'",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            var items = [];
            var item=[];
            for (var i in data.d.results) {       
                var tenmonhoc=(data.d.results[i].Tenmonhoc)?data.d.results[i].Tenmonhoc:'';
                var lop=(data.d.results[i].Title)?data.d.results[i].Title:'';
                var sotiet=(data.d.results[i].Sotinchi)?data.d.results[i].Sotinchi:''; 
                var htmlkekhai=(
                   '<tr class="xl158" height="22" style="height:16.5pt" >'+  
                '<td height="22" class="xl190" style="height:16.5pt;border-top:none">'+tenmonhoc+'</td>'+
                  '<td class="xl151" style="border-top:none;border-left:none">'+lop+'</td>'+
                  '<td class="xl152" style="border-top:none;border-left:none">30</td>'+
                  '<td class="xl154" style="border-top:none;border-left:none">30</td>'+
                  '<td class="xl152" style="border-top:none;border-left:none">8</td>'+
                  '<td class="xl152" style="border-top:none;border-left:none">0</td>'+
                  '<td class="xl153" style="border-top:none;border-left:none">ĐH-TC</td>'+
                  '<td class="xl152" style="border-top:none;border-left:none">TG</td>'+
                  '<td class="xl154" style="border-top:none;border-left:none">1</td>'+
                  '<td class="xl154" style="border-top:none;border-left:none">1</td>'+
                  '<td class="xl154" style="border-top:none;border-left:none">2</td>'+
                  '<td class="xl155" style="border-top:none;border-left:none">1.4</td>'+
                  '<td class="xl154" style="border-top:none;border-left:none">1</td>'+
                  '<td class="xl156" align="right" style="border-top:none;border-left:none">84.00</td>'+
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
                items.push(htmlkekhai);         
            }
            var htmltengiangvien = (data.d.results[i].UserLogin.Title)?data.d.results[i].UserLogin.Title:'';  
            jQuery('#tengiangvien').html(htmltengiangvien);
            //jQuery('#kekhai').html(items.join(''));
            jQuery('#testTable > tbody > tr').eq(jQuery('#dataafter').index()).after(items.join(''));
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
  try{
    getTenGiangVien();
    
  } 
  catch(error){
  
  };
  $("#select_id").change(function () {
    $( $(this).val() ).modal('show');
    getKhoiLuongGiangVien();
    
});
});
