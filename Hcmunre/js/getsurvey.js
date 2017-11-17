  function im() 
 {  
    var clientContext = SP.ClientContext.get_current();  
    var oList = clientContext.get_web().get_lists().getByTitle('TK');
    var itemCreateInfo = new SP.ListItemCreationInformation(); 
    var oListItem = oList.addItem(itemCreateInfo);
    oListItem.set_item('Title',"WAR Room 13"); 
    oListItem.set_item('EventDate', "2017-11-14T17:00:00Z"); 
    oListItem.set_item('EndDate', "2017-11-30T17:00:00Z");
    oListItem.set_item('fRecurrence',true); 
    oListItem.set_item('fAllDayEvent',false); 
    oListItem.set_item('fRecurrence',"<recurrence><rule><firstDayOfWeek>su</firstDayOfWeek><repeat><daily weekday='TRUE' /></repeat><windowEnd>2017-07-27T23:59:00Z</windowEnd></rule></recurrence>");  
    oListItem.set_item('EventType', false);
    oListItem.update(); 
    clientContext.load(oListItem);  
    clientContext.executeQueryAsync(function()  {
        $("#log").append("<div>" + jsonData.length + " items are added.</div>");
    } , function(e, a) {
        console.log(JSON.stringify(a.get_message()));
    });
 }



jQuery(document).ready(function () {
    //Get survey
    getSurvey()
});
// Get Survey
function getSurvey() {
    var getSurveyUrl = "/_api/web/lists/GetByTitle('Survey')/items?$select=Id,Title,Thumbnail,Link,Created,Color&$top=5&$orderby=Created desc";
    var items = [];
    jQuery.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + getSurveyUrl,
        type: "GET",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data) {
    
            if (data && data.d && data.d.results) {
                var results = data.d.results;
                for (var i in results) {
                    var result = results[i];
                    var id = result.Id;
                    var title = result.Title;
                    var link = result.Link ? result.Link.Url : '#';
                    var thumbnail = result.Thumbnail ? result.Thumbnail.Url : '#';
                    var created = moment(result.Created).format('DD/MM/YYYY');  
                    var color = result.Color;
                    items.push('<div class="col-md-4 col-sm-8 col-xs-8 col-no-padding">' +
                                '<div class="tile">' +
                                  '<a href="' + link + '" class="a-image-tile">' +
                                      '<img src="' + thumbnail + '" class="img-responsive img-tile" alt=""/>' +
                                      '<div class="conta-tile " style="background:' + color + '">' +
                                        '<div class="label-title">' + created + '</div>' +
                                        '<div class="para-tile">' + title + '</div>' +
    
                                '</div></a></div></div>');
                }
                jQuery('.get_survey').append(items.join(''));
            }
        },
        error: function (error) {
        }
    });
}




function createGuid()  
    {  
       return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
          var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);  
          return v.toString(16);  
       });  
    }  
    var guid = createGuid();
    function CreateDailyRecurringEvent() 
    {
        //create a string that has the events
        var stringStartDate = "2017-11-13T08:00:00Z";
        var stringEndDate = "2017-07-30T23:59:00Z";
        var reccurenceString = "<recurrence><rule><firstDayOfWeek>su</firstDayOfWeek><repeat><weekly tu='TRUE'" +
    " weekFrequency='1' /></repeat><repeatInstances>2</repeatInstances></rule></recurrence>";
        var recReq =
                {
            url: _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('TK')/items",
            type: "POST",
            data: JSON.stringify({
                '__metadata': {
                    'type': 'SP.Data.TKListItem'
                },
                'Title': 'Daily 5',
                'EventDate': stringStartDate,
                'EndDate': stringEndDate,
                'Location': 'Seattle',
                'Description': 'Daily 5',
                'fRecurrence': true,
                'fAllDayEvent': false,
                'RecurrenceData': reccurenceString,
                'TimeZone': 0,
                'UID': guid,
                'EventType': 1
            }),
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success :function () {
                alert("Event data saved.");             
            },
            error:function (err) {
                alert("Error occurred while saving question data.");
                console.log("ERROR", err);
            }
        };

        jQuery.ajax(recReq);
    }




    function createGuid()  
    {  
       return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
          var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);  
          return v.toString(16);  
       });  
    }  
    var guid = createGuid();
    function CreateDailyRecurringEvent() 
    {
        //create a string that has the events
        var stringStartDate = "2017-11-13T08:00:00Z";
        var stringEndDate = "2017-07-30T23:59:00Z";
        var reccurenceString = "<recurrence><rule><firstDayOfWeek>su</firstDayOfWeek><repeat><weekly tu='TRUE'" +
    " weekFrequency='1' /></repeat><repeatInstances>1</repeatInstances></rule></recurrence>";
        var recReq =
                {
            url: _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('TK')/items",
            type: "POST",
            data: JSON.stringify({
                '__metadata': {
                    'type': 'SP.Data.TKListItem'
                },
                'Title': 'Daily 5',
                'EventDate': stringStartDate,
                'EndDate': stringEndDate,
                'Location': 'Seattle',
                'Description': 'Daily 5',
                'fRecurrence': true,
                'fAllDayEvent': false,
                'RecurrenceData': reccurenceString,
                'TimeZone': 0,
                'UID': guid,
                'EventType': 1
            }),
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success :function () {
                alert("Event data saved.");             
            },
            error:function (err) {
                alert("Error occurred while saving question data.");
                console.log("ERROR", err);
            }
        };

        jQuery.ajax(recReq);
    }
undefined
CreateDailyRecurringEvent() 
undefined