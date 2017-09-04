//生成面包屑函数
function createRightNav(data,id){
	var str='';
	data = data.reverse();
	for(var i=0;i<data.length;i++){
		str+=`<li class="${data[i].id === id ? 'active' : ''}" data-id="${data[i].id}" data-p-id="${data[i].pId}">
			<span data-id="${data[i].id}" data-p-id="${data[i].pId}">${data[i].title}</span>
			<i class="btn_ico"></i>`;

		str+=`</li>`;
	}
	return str;
}