jQuery(document).ready(function(){
  checkUserLogin();
  getThoiGian();
    $("#chonnamhoc").change(function () {
    $( $(this).val() ).modal('show');
    mNCKH();
    }); 
});
function checkUserLogin()
 {
  var userid=_spPageContextInfo.userId;
  $.ajax
  ({
  url: _spPageContextInfo.webAbsoluteUrl+"/_api/web/GetUserById("+userid+")/Groups",
  type: "GET",
  headers: { "Accept": "application/json; odata=verbose" },
  dataType: "json",
  async: true,
   success: function(data){
      var items = [];
      for(var i in data.d.results)
      {   
           var title = (data.d.results[i].Title)?data.d.results[i].Title:'';
           if(title!="Hcmunre Visitors"){
             window.location.replace("/sites/Hcmunre/Lists/Nghiencuukhoahoc/AllItems.aspx");           }
          // else{
           //  window.location.replace("/sites/Hcmunre/Lists/TK/calendar.aspx");
           //}
      }
  }
  });
}
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
function getThoiGian(){
    // Getting our list items
    var userId = _spPageContextInfo.userId; 
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Nghiencuukhoahoc')/items?$select=Th_x1edd_i_x0020_gian,Author/Id&$expand=Author/Id&$filter=(Author/Id eq '"+userId+"')&$top=1000",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            var items = [];
            var item=[];
            for (var i in data.d.results) {
                var namhoc = (data.d.results[i].Th_x1edd_i_x0020_gian)?data.d.results[i].Th_x1edd_i_x0020_gian:'';
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
                var html=('<option value="#myModal" id="'+tennamhoc+'">'+tennamhoc+'</option>');
                item.push(html); 
            }
            jQuery('#chonnamhoc').append(item.join(''));
        },
        error: function (data) {
            
        }
    });
}
function mNCKH(){
  var userId = _spPageContextInfo.userId; 
  var thoigian=$("#chonnamhoc option:selected").text();
    // Getting our list items
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Nghiencuukhoahoc')/items?$select=S_x1ed1__x0020_gi_x1edd__x0020_c,Th_x1edd_i_x0020_gian,Author/Title,Author/Id&$expand=Author/Id&$filter=((Th_x1edd_i_x0020_gian eq '"+thoigian+"') and (Author/Id eq '"+userId+"'))&$top=1000",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            var items = [];
            for (var i in data.d.results) {
              var giodinhmuc = (data.d.results[i].S_x1ed1__x0020_gi_x1edd__x0020_c)?data.d.results[i].S_x1ed1__x0020_gi_x1edd__x0020_c:'';
              var tengiangvien=(data.d.results[i].Author.Title)?data.d.results[i].Author.Title:'';
              var thoigian=(data.d.results[i].Th_x1edd_i_x0020_gian)?data.d.results[i].Th_x1edd_i_x0020_gian:'';
              items.push(giodinhmuc);
            }
            $("#tgv").html(tengiangvien);
            $("#dmg").html(sum(items));
            $("#nh").html(thoigian);

        },
        error: function (data) {
            
        }
    });
}