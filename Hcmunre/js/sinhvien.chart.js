function selectValue() {
d = document.getElementById("select_id").value;
return d;}
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
                for(var idx = 0; idx < items.length; idx++) {
                    var s=items[idx].LOP;
                    var html=('<option value="'+s+'">'+s+'</option>')
                    items.push(html);
                }
                jQuery('#select_id').append(items.join(''));
            }
        },
        error: function (data) {
            
        }
        });
    }







$(document).ready(function () {
    var listName = "Duyệt công tác";
    /*https://social.technet.microsoft.com/wiki/contents/articles/35796.sharepoint-2013-using-rest-api-for-selecting-filtering-sorting-and-pagination-in-sharepoint-list.aspx*/
	var query = "?$select=Tr_x1ea1_ng_x0020_th_x00e1_i";
      
 var t5spjq = new $.t5_sp_jq({ url: _spPageContextInfo.webServerRelativeUrl });
    var arrChart = [];
    var arrFn = [t5spjq.getValuesOfChoice(listName, 'Tr_x1ea1_ng_x0020_th_x00e1_i'),
        t5spjq.getListItems(listName, query)
    ];
    $.when.apply($, arrFn).then(function () {
        var allData = arguments;
        var values = allData[0].d.results[0].Choices.results;

        var itms = allData[1].d.results;
        if (itms.length > 0) {
            $.each(values, function (index, value) {
                arrChart.push({ 'name': value, 'y': 0 });
            });
            $.each(itms, function (idx, itm) {
                var n = arrChart.length;
                for (var i = 0; i < n; i++) {
                    if (arrChart[i].name == itm.Tr_x1ea1_ng_x0020_th_x00e1_i) {
                        arrChart[i].y = arrChart[i].y + 1;
                        break;
                    }
                }
            });
            bar_char(arrChart);
        } else
            bar_char([]);
    }, function (mess) {
        console.log(mess);

    });
	function bar_char(data) {
	Highcharts.chart('container', {
            chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Thống kê tình trạng xử lý các yêu cầu duyệt công tác'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: data
        }]
        });
}
});