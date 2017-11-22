jQuery(document).ready(function(){
  try{
    getTenGiangVien();
  } 
  catch(error){
  
  };
  $("#select_id").change(function () {
    $( $(this).val() ).modal('show');
});


});
function getTenGiangVien() {
    // Getting our list items
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Thời khóa biểu')/items?$select=UserLogin/Title,UserLogin/ID&$expand=UserLogin",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            var items = [];
            var item=[];
            for (var i in data.d.results) {
                var tengiangvien = (data.d.results[i].UserLogin.Title)?data.d.results[i].UserLogin.Title:'';
                var arrgiangvien={TGV:tengiangvien};
                var existed=false;
                $.each(items,function(idx,val){
                        var currentItem=items[idx];
                        if(currentItem.TGV===tengiangvien){
                            existed=true;
                        }               
                    }
                );  
                if(!existed){
                    items.push(arrgiangvien);
                }
            }
            for(var idx = 0; idx < items.length; idx++) {
                var tengiangvien = items[idx].TGV;
                var html=('<option value="#myModal" >'+tengiangvien+'</option>');
                item.push(html); 
            }
            jQuery('#select_id').append(item.join(''));
        },
        error: function (data) {
            
        }
    });
}
