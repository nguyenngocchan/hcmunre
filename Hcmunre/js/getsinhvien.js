var myAngApp = angular.module('SharePointAngApp', []);  
myAngApp.controller('spsinhvienController',  
    function($scope, $http)  
    {$http(  
        {  
            method: 'GET',  
            url: _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/getByTitle('Sinhvien')/items?$select=Id,Title,Masinhvien,Lop,Tinhtrang",  
            headers:  
            {  
                "Accept": "application/json;odata=verbose"  
            }  
        }).success(function(data, status,  
            headers, config)  
        {  
			$scope.sinhvien = data.d.results; 
			$scope.totalItems = $scope.sinhvien.length;  
			$scope.numPerPage = 5;
			$scope.currentPage = 1; 
			$scope.paginate = function (value) {  
				var begin, end, index;  
	            begin = ($scope.currentPage - 1) * $scope.numPerPage;  
	            end = begin + $scope.numPerPage;  
	            index = $scope.customers.indexOf(value);  
	            return (begin <= index && index < end);  
	        };
	        $scope.getByDataID = function (id) { 
			var sinhvienid= id;
			$.ajax({
			      url: _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/getByTitle('Sinhvien')/items?$select=Id,Title,Masinhvien,Lop,Tinhtrang",  			      type: "GET",
			      headers: 
			      {
			            "Accept": "application/json;odata=verbose",
			            "content-type": "application/json; odata=verbose",
			            "X-RequestDigest": $("#__REQUESTDIGEST").val()
			                    
			       },
				success: function(data){
					$scope.sinhvien=data.d; 
					
				},
				error: function(err){
					alert("Error while fetching list item: " + JSON.stringify(err));
				}
			
			  });
			};
            $scope.Delete= function (id) { 
       		var idSinhvien=id;
       		$.ajax({
              url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Sinhvien')/items('"+idSinhvien+"')",
              type: "POST",
              headers: {
                               "Accept": "application/json;odata=verbose",
                               "content-type": "application/json; odata=verbose",
                               "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                               "X-HTTP-Method": "DELETE",
                               "If-Match": "*"
                            },
              success: function(data){
                  alert("Item deleted successfully!");
                  location.reload();
                },
              error: function(err){
                                  console.log(JSON.stringify(error));                            }

		          });
		    }; 
		    $scope.Update = function (id) {
		    	var idSinhvien=id;
				$.ajax({
				url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Sinhvien')/items("+idSinhvien+")",
				type: "POST",
				data: JSON.stringify({
				       
				       '__metadata': {'type': 'SP.Data.SinhvienListItem' },
				          "Title": document.getElementById('txthoten').value,
				 		"Masinhvien":document.getElementById('txtma').value,
				 		"Lop":document.getElementById('txtlop').value,
				 		"Tinhtrang":document.getElementById('txttingtrang').value
				          }),
				headers: {
				               "Accept": "application/json;odata=verbose",
				               "content-type": "application/json; odata=verbose",
				               "X-RequestDigest": $("#__REQUESTDIGEST").val(),
				               "X-HTTP-Method": "MERGE",
				               "If-Match": "*"
				            },
				success: function(data){
	              alert("Item updated successfully!");
	            	},
				error: function(err){
                	alert("Error while updating item: " + JSON.stringify(err));
	            	}
				});
			
			};  
			$scope.mySortFunction = function(  
                sinhvien)  
            { //Sorting Iteam  
                if (isNaN(sinhvien[$scope.sortExpression]))  
                    return sinhvien[$scope.sortExpression];  
                return parseInt(sinhvien[$scope  
                    .sortExpression]);  
            }  
        }).error(function(data, status,  
            headers, config) {  
        });  
    });    
  
