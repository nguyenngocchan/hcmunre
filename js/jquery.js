
 setTimeout(function () {
  $(function () {
    $('#example1').DataTable();
  });
}, 3000);

function getSinhVien() {
    var getSinhVienUrl = "/_api/web/lists/getByTitle('Sinhvien')/items?$select=ID,Title,Masinhvien,Lop/Title,Lop/Siso,Tinhtrang&$expand=Lop";
    var items = [];
    jQuery.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + getSinhVienUrl,
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
                    items.push();
                }
                jQuery('.get_survey').append(items.join(''));
            }
        },
        error: function (error) {
        }
    });
}