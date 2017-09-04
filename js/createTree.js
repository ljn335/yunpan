//生成树状菜单函数
function createTree(data,id){
	var str='';
	for(var i=0;i<data.length;i++){
		if(data[i].checked){
			// console.log(wy.getParentsById(data,data[i].id));
			continue;
		}
		str += `<li>
			<div class="${data[i].id === id ? 'active' : ''}" data-id="${data[i].id}" data-p-id="${data[i].pId}">
	            <a class="${data[i].child?'active2':''}" href="javascript:;" data-id="${data[i].id}" data-p-id="${data[i].pId}"></a>
	            <i class="active1" data-id="${data[i].id}" data-p-id="${data[i].pId}"></i>
	            ${data[i].title}
            </div>`;
	  	if(data[i].child){
			str += `<ul>${createTree(data[i].child,id)}</ul>`;
		}
	    str += `</li>`;
	}
	return str;
}