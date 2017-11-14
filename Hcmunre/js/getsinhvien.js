var myAngApp = angular.module('SharePointAngApp', []);
myAngApp.controller('spSinhvienController', function($scope, $http) {
    $scope.eEditable = -1;
    $http({
        method: 'GET',
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('Sinhvien')/items?$select=ID,Title,Masinhvien,Lop,Tinhtrang",
        headers: {
            "Accept": "application/json;odata=verbose"
        }
    }).success(function(data, status, headers, config) {
        $scope.sinhviens = data.d.results;
        // var a= $scope.customers;
    }).error(function(data, status, headers, config) {});
    //$scope.customers = [];
    $scope.getByDataID = function(sinhvien) {
        var sinhvienId = sinhvien;
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Sinhvien')/getitembyid(" + sinhvienId + ")/?$select=ID,Title,Masinhvien,Lop,Tinhtrang",
            type: "GET",
            headers: {
                "Accept": "application/json;odata=verbose",
                "content-type": "application/json; odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function(data) {
                $("#btnupdateval").prop("disabled", false);
                $scope.sinhvien = data.d;
                $('#txtItemId').val(data.d.Id);
                $('#txttitle').val(data.d.Title);
                $('#txtma').val(data.d.Masinhvien);
                $('#txtlop').val(data.d.Lop);
                $('#txttinhtrang').val(data.d.Tinhtrang);
                $("#btnsave").prop("disabled", true);
            },
            error: function(err) {
                alert("Error while fetching list item: " + JSON.stringify(err));
            }
        });
    };
    $scope.Save = function() {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Sinhvien')/items",
            type: "POST",
            data: JSON.stringify({
                '__metadata': {
                    'type': 'SP.Data.UserTestListItem'
                },
                "Title": $scope.sinhvien.Title,
                "Masinhvien": $scope.sinhvien.Masinhvien,
                "Lop": $scope.sinhvien.Lop
            }),
            headers: {
                "Accept": "application/json;odata=verbose",
                "content-type": "application/json; odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function(data) {
                alert("Item added successfully!");
            },
            error: function(err) {
                alert("Error while adding item: " + JSON.stringify(err));
            }
        });
    };
    $scope.Update = function() {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Sinhvien')/items(" + $scope.sinhvien.ID + ")",
            type: "POST",
            data: JSON.stringify({
                '__metadata': {
                    'type': 'SP.Data.SinhvienListItem'
                },
                "Title": $scope.sinhvien.Title,
                "Masinhvien": $scope.sinhvien.Masinhvien,
                "Lop": $scope.sinhvien.Lop
            }),
            headers: {
                "Accept": "application/json;odata=verbose",
                "content-type": "application/json; odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "X-HTTP-Method": "MERGE",
                "If-Match": "*"
            },
            success: function(data) {
                alert("Item updated successfully!");
            },
            error: function(err) {
                alert("Error while updating item: " + JSON.stringify(err));
            }
        });
    };
    $scope.Delete = function(sinhvien) {
        var sinhvienId = sinhvien;
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Sinhvien')/items(" + sinhvienId + ")",
            type: "POST",
            headers: {
                "Accept": "application/json;odata=verbose",
                "content-type": "application/json; odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "X-HTTP-Method": "DELETE",
                "If-Match": "*"
            },
            success: function(data) {
                alert("Item deleted successfully!");
            },
            error: function(err) {
                alert("Error while deleting item: " + JSON.stringify(err));
            }
        });
    };
    $scope.ClearFields = function() {
        $("#btnsave").prop("disabled", false);
        $scope.customer = "";
    };
    // Sorting For 
	$scope.mySortFunction = function(sinhvien)  
	{ //Sorting Iteam  
		if (isNaN(sinhvien[$scope.sortExpression]))  
		    return sinhvien[$scope.sortExpression];  
		return parseInt(sinhvien[$scope  
		    .sortExpression]);  
	}  
});