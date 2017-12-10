jQuery(document).ready(function(){
		var dm=$("#getdm").text();
	    if(dm==="(13) Bài toàn văn tham gia hội nghị khoa học công bố trên kỷ yếu hội nghị có chỉ số ISBN" || dm==="(12) Bài toàn văn tham gia hội nghị toàn quốc công bố trên kỷ yếu hội nghị có chỉ số ISBN" || dm==="(11) Bài báo cáo (Poster) tham gia hội nghị quốc tế" || dm==="(10) Bài báo cáo (oral) tham gia hội nghị quốc tế" || dm==="(9) Bài toàn văn công bố trên kỷ yếu hội nghị quốc tế" || dm==="(8) Bài toàn văn công bố trên kỷ yếu hội nghị quốc tế được xuất bản bởi nhà xuất bản có uy tín" || dm==="(7) Bài công bố trên tạp chí khoa học trong nước có chỉ số xuất bản ISSN không thuộc danh mục tạp chí  được tính điểm của hội đồng chức danh giáo sư Nhà nước của ngành đó" || dm==="(6) Bài công bố trên tạp chí khoa học trong nước thuộc danh mục tạp chí  được tính điểm của hội đồng chức danh giáo sư Nhà nước có điểm số 0,25" || dm==="(5) Bài công bố trên tạp chí khoa học trong nước thuộc danh mục tạp chí  được tính điểm của hội đồng chức danh giáo sư Nhà nước có điểm số 0,5" || dm==="(4) Bài công bố trên tạp chí khoa học trong nước thuộc danh mục tạp chí  được tính điểm của hội đồng chức danh giáo sư Nhà nước có điểm số 0,75" || dm==="(3) Bài công bố trên tạp chí khoa học trong nước thuộc danh mục tạp chí  được tính điểm của hội đồng chức danh giáo sư Nhà nước có điểm số 1" || dm==="(1) Bài báo công bố trên tạp chí khoa học quốc tế thuộc danh sách ISI, Scopus" || dm==="(2) Bài báo công bố trên tạp chí khoa học quốc tế không thuộc danh sách ISI, Scopus, có chỉ số xuất bạn ISSN"){
	        $('.sotacgia').show();
	        $('.sogio').hide();
			$('.soluong').hide();
			$('.sotrang').hide();

	    }
	    if(dm==="Biên soạn Giáo trình/sách hướng dẫn, TLTK được hội đồng do nhà trường công nhận. Chỉ tính cho chương trình không được cấp phí" || dm==="Biên soạn Giáo trình/sách hướng dẫn, TLTK được hội đồng do nhà trường công nhận. Chỉ tính cho chương trình không được cấp phí"){
	        $('.sotrang').show();
	        $('.sotacgia').hide();
	        $('.sogio').hide();
			$('.soluong').hide();

	    }
	    if(dm==="Giải pháp hữu ích" || dm==="Bằng sáng chế ngoài nước" || dm==="Bằng sáng chế trong nước"){
	        $('.soluong').show();
	        $('.sotacgia').hide();
	        $('.sogio').hide();
			$('.sotrang').hide();

	    }
	    if(dm==="Xây dựng chương trình đào tạo cho một ngành đào tạo (bao gồm cả chủ trì và người tham gia) được phê duyệt. Chỉ tính cho các chương trình không được cấp phí"){
	        $('.sogio').show();
	        $('.sotacgia').hide();
	        $('.soluong').hide();
			$('.sotrang').hide();

	    }
})
