var myAngApp = angular.module('SharePointAngApp',[]);
myAngApp.controller('spSinhvienController', function($scope, $http) {
    $scope.eEditable = -1;
    $http({
        method: 'GET',
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('Sinhvien')/items?$select=ID,Title,Masinhvien,Lop/Title,Lop/Siso,Lop/Nienkhoa,Sodienthoai,Diachi,Ghichu,Tinhtrang&$expand=Lop",
        headers: {
            "Accept": "application/json;odata=verbose"
        }
    }).success(function(data, status, headers, config) {
        $scope.sinhviens = data.d.results;
        // var a= $scope.customers;
    }).error(function(data, status, headers, config) {});
    
    
    
    getStatus();
    //$scope.customers = [];
    $scope.getByDataID = function(sinhvien) {
        var sinhvienId = sinhvien;
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Sinhvien')/items(" + sinhvienId + ")/?$select=ID,Title,Masinhvien,Lop/Title,Lop/Siso,Lop/Nienkhoa,Sodienthoai,Diachi,Ghichu,Tinhtrang&$expand=Lop",
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
                $('#txtlop').val(data.d.Lop.Title);
                $("#drpStatus option[value='" + data.d.Tinhtrang + "']").attr("selected", true);
                $('#txtsdt').val(data.d.Sodienthoai);
                $('#txtdiachi').val(data.d.Diachi);
                $('#txtghichu').val(data.d.Ghichu);
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
        $("#spupdating").show();
        $("#btnupdateval").attr("disabled", "disabled");
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Sinhvien')/items(" + $scope.sinhvien.ID + ")",
            type: "POST",
            data: JSON.stringify({
                '__metadata': {
                    'type': 'SP.Data.SinhvienListItem'
                },
                "Title": $scope.sinhvien.Title,
                "Masinhvien": $scope.sinhvien.Masinhvien,
                "Tinhtrang": $("#drpStatus option:selected").val(),
                "Ghichu": $scope.sinhvien.Ghichu


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
                $("#spupdating").hide();
                $("#btnupdateval").removeAttr("disabled");
                $("#myModal").modal("toggle");
            },
            error: function(err) {
                alert("Error while updating item: " + JSON.stringify(err));
                $("#spupdating").hide();
                $("#btnupdateval").removeAttr("disabled");
                $("#myModal").modal("toggle");
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
jQuery(document).ready(function(){
    try{
        getLop();
    }   
    catch(error){
    
    }

});
function getDropDownStatus() {
    // Getting our list items
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Sinhvien')/items?$select=Lop",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            var items = [];
            var item=[];
            for (var i in data.d.results) {
                var lop = (data.d.results[i].Lop)?data.d.results[i].Lop:'';
                var arrlop={LOP:lop};
                var existed=false;
                $.each(items,function(idx,val){
                        var currentItem=items[idx];
                        if(currentItem.LOP===lop){
                            existed=true;
                        }               
                    }
                );  
                if(!existed){
                    items.push(arrlop);
                }
            }
            for(var idx = 0; idx < items.length; idx++) {
                var tenlop = items[idx].LOP;
                var html=('<option value="'+tenlop+'">'+tenlop+'</option>');
                item.push(html); 
            }
            jQuery('#select_id').append(item.join(''));
        },
        error: function (data) {
            
        }
    });
}
function getStatus(){
 $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Sinhvien')/fields?$filter=EntityPropertyName eq 'Tinhtrang'",
        type: "GET",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data) {
            items=[];
            for(var i in data.d.results[0].Choices.results){
                console.log(data.d.results[0].Choices.results[i]);
                $('#drpStatus').append($('<option>',
                 {
                    value: data.d.results[0].Choices.results[i],
                    text : data.d.results[0].Choices.results[i]
                 }
                 ));
            }
        },
        error: function (error) {
            alert(JSON.stringify(error));
        }

    });
}