function getLop() {
	// Getting our list items
	$.ajax({
		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Sinhvien')/items?$select=Lop",
		method: "GET",
		headers: { "Accept": "application/json; odata=verbose" },
		success: function (data) {
			var items = [];
			
            for (var i in data.d.results) {
				var lop = (data.d.results[i].Lop)?data.d.results[i].Lop:'';
				var arrlop={LOP:lop};
				var existed=false;
				$.each(items,function(idx,val)
					{
						var currentItem=items[idx];
						if(currentItem.LOP===lop){
							existed=true;
						}	
						if(!existed){
							items.push(arrlop);
						}			
					}
				)	
				alert(arrlop);
            }
		},
		error: function (data) {
			
		}
		});
	}