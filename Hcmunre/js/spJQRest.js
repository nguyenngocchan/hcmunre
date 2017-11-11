(function ($) {
    /*https://www.plusconsulting.com/blog/2013/05/crud-on-list-items-using-rest-services-jquery/*/
    /* Getting the item type for the list */
    function getListItemType(name) {
        return "SP.Data." + name[0].toUpperCase() + name.substring(1) + "ListItem";
    }
    $.t5_sp_jq = function (option) {
        $.t5_sp_jq.settings = $.extend({
            url: _spPageContextInfo.webAbsoluteUrl,
            REQUESTDIGEST: $("#__REQUESTDIGEST").val(),
        }, option);
    }
    
    $.t5_sp_jq.prototype = {
    	getCurrentUser: function() {    
			var dfd = new $.Deferred();
		    $.ajax({
		        url: $.t5_sp_jq.settings.url + "/_api/web/currentUser?$expand=groups",
		       	headers: { "Accept": "application/json; odata=verbose" },
		        success: function (data) {
		            dfd.resolve(data);
		        },
		        error: function (data) {
		            dfd.reject(data);
		        }
		    });
		    return dfd.promise();
		},
		
		 
   
		getValuesOfChoice: function (listname, fieldName) {
            var dfd = new $.Deferred();
            $.ajax({
                url: $.t5_sp_jq.settings.url + "/_api/web/lists/getbytitle('" + listname + "')/fields?$filter=EntityPropertyName eq '" + fieldName + "'",
                method: "GET",
                headers: { "Accept": "application/json; odata=verbose" },
                success: function (data) {
                    dfd.resolve(data);
                },
                error: function (data) {
                    dfd.reject(data);
                }
            });
            return dfd.promise();
        },
        
        
        getTotalItems: function (listname, filter) {
            var dfd = new $.Deferred();            
            var url = ''; 
            //?$filter=SubjectsID eq' + itemid
            if(filter === undefined && filter == null){
            	url = $.t5_sp_jq.settings.url + "/_api/web/lists/getbytitle('" + listname + "')/itemcount";
            }else{
            	url = $.t5_sp_jq.settings.url + "/_api/web/lists/getbytitle('" + listname + "')/itemcount"+ filter;
            }
            $.ajax({
                url: url ,
                method: "GET",
                headers: { "Accept": "application/json; odata=verbose" },
                success: function (data) {
                    dfd.resolve(data);
                },
                error: function (data) {
                    dfd.reject(data);
                }
            });
            return dfd.promise();
        },
        /*Get a Single List Item*/
        getListItem: function (listname, id) {
            var dfd = new $.Deferred();
            $.ajax({
                url: $.t5_sp_jq.settings.url + "/_api/web/lists/getbytitle('" + listname + "')/items(" + id + ")",
                method: "GET",
                headers: { "Accept": "application/json; odata=verbose" },
                success: function (data) {
                    dfd.resolve(data);
                },
                error: function (data) {
                    dfd.reject(data);
                }
            });
            return dfd.promise();
        },
        /*Getting list items based on ODATA Query*/
        getListItems: function(listname, query) {
            var dfd = new $.Deferred();
            $.ajax({
                url: $.t5_sp_jq.settings.url + "/_api/web/lists/getbytitle('" + listname + "')/items" + query,
                method: "GET",
                headers: { "Accept": "application/json; odata=verbose" },
                success: function (data) {
                    dfd.resolve(data);
                },
                error: function (data) {
                    dfd.reject(data);
                }
            });
            return dfd.promise();
        },
        // Adding a list item with the metadata provided
        addListItem: function(url, listname, metadata) {
            var dfd = new $.Deferred();
            var item = $.extend({
                "__metadata": { "type": getListItemType(listname)}
            }, metadata);

            $.ajax({
                url: $.t5_sp_jq.settings.url + "/_api/web/lists/getbytitle('" + listname + "')/items",
                type: "POST",
                contentType: "application/json;odata=verbose",
                data: JSON.stringify(item),
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "X-RequestDigest": $.t5_sp_jq.settings.REQUESTDIGEST
                },
                success: function (data) {
                    dfd.resolve(data);
                },
                error: function (data) {
                    dfd.reject(data);
                }
            });
            return dfd.promise();
        },
        updateListItem: function (listname, id, metadata) {
            var obj = this;
            var dfd = new $.Deferred();
            var item = $.extend({
                "__metadata": { "type": getListItemType(listname) }
            }, metadata);

            obj.getListItem(listname, id).then(function (data) {
                $.ajax({
                    url: data.d.__metadata.uri,
                    type: "POST",
                    contentType: "application/json;odata=verbose",
                    data: JSON.stringify(item),
                    headers: {
                        "Accept": "application/json;odata=verbose",
                        "X-RequestDigest": $.t5_sp_jq.settings.REQUESTDIGEST,
                        "X-HTTP-Method": "MERGE",
                        "If-Match": data.d.__metadata.etag
                    },
                    success: function (data) {
                        dfd.resolve(data);
                    },
                    error: function (data) {
                        dfd.reject(data);
                    }
                });
            }, function (data) {
                dfd.reject(data);
            });
            return dfd.promise();
        },
        // Deleting a List Item based on the ID
        deleteListItem: function (listname, id, success, failure) {
            var obj = this;
            var dfd = new $.Deferred();
            obj.getListItem(listname, id).then(function (data) {
                $.ajax({
                    url: data.d.__metadata.uri,
                    type: "POST",
                    headers: {
                        "Accept": "application/json;odata=verbose",
                        "X-Http-Method": "DELETE",
                        "X-RequestDigest": $.t5_sp_jq.settings.REQUESTDIGEST,
                        "If-Match": data.d.__metadata.etag
                    },
                    success: function (data) {
                        dfd.resolve(data);
                    },
                    error: function (data) {
                        dfd.reject(data);
                    }
                });
            });
            return dfd.promise();
        },
    }
}(jQuery));
