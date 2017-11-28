function getCurrentUserGroup()
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
             window.location.replace("/sites/Hcmunre/Lists/TK/admin.aspx");           }
           else{
           	 window.location.replace("/sites/Hcmunre/Lists/TK/calendar.aspx");
           }
      }
  }
  });
}
$(document).ready(function() {
   		ExecuteOrDelayUntilScriptLoaded( getCurrentUserGroup, 'sp.js')
   });