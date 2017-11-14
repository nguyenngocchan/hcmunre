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