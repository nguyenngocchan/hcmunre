
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
        var stringStartDate = "2017-11-17T03:00:00Z";
        var stringEndDate = "2017-12-01T11:00:00Z";
        var reccurenceString = "<recurrence><rule><firstDayOfWeek>su</firstDayOfWeek><repeat><weekly we='TRUE' weekFrequency='1' /></repeat><repeatForever>FALSE</repeatForever></rule></recurrence>";
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