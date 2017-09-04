//生成文件夹函数
function createFiles(data,id){
	var str='';
	if(!data) return str;
	for(var i=0;i<data.length;i++){
		str+=`<li class="file_item" data-id="${data[i].id}" data-p-id="${data[i].pId}">
				<i  class="file-checkbox" data-checked="${data[i].checked}"></i>
				<img src="img/pic.png" data-id="${data[i].id}" data-p-id="${data[i].pId}"/>
				<div class="file-name">
					<span class="file-show-name active" title="${data[i].title}" data-id="${data[i].id}" data-p-id="${data[i].pId}">${data[i].title}</span>
					<input class="file-change-name" value="" type="text" data-id="${data[i].id}" data-p-id="${data[i].pId}"/>
				</div>`;
		str+=`</li>`;
	}
	return str;
}

function createFileNode(){
	// var weiyunFile=document.createElement('li');
	// weiyunFile.className='file_item';

	// var fileCheckbox=document.createElement('i');//勾选框
	// fileCheckbox.className='file-checkbox';

	// var fileImg=document.createElement('img');//文件夹的图片
	// fileImg.src='img/pic.png';
	// // newImg.className='';
	
	// var fileName = document.createElement('div');
 //  	fileName.className = 'file-name';

	// var fileShowName=document.createElement('span');
	// fileShowName.innerHTML=fileShowName.title='';
	// fileShowName.className='file-show-name active';

	// var fileChangeName=document.createElement('input');
	// // fileChangeName.style.display='block';
	// fileChangeName.type = 'text';
	// fileChangeName.className='file-change-name';

	// fileName.appendChild(fileShowName);
 //  	fileName.appendChild(fileChangeName);

	// weiyunFile.appendChild(fileCheckbox);
	// weiyunFile.appendChild(fileImg);
	// weiyunFile.appendChild(fileName);
	// return weiyunFile;
	

	var weiyunFile=document.createElement('li');
	weiyunFile.className='file_item';

	var str='';
	str=`<i class="file-checkbox"></i>
		<img src="img/pic.png"/>
		<div class="file-name">
			<span class="file-show-name active"></span>
			<input value="" type="text" style="display:block" class="file-change-name"/>
		</div>`;


	weiyunFile.innerHTML= str;
	return weiyunFile;
}
