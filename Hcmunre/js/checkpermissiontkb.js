$(document).ready(function(){
    checkPermission();
})
function checkPermission()
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
             window.location="/sites/Hcmunre/Lists/TKB/calendar.aspx";           
          }
          //else{
            // window.location="/sites/Hcmunre/Lists/TKB/Giangvien.aspx";
          //}
      }
  }
  });
}