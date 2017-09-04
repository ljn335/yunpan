//获取到数据
var data=Data.files;

//获取到树状菜单的父容器ul
var treeList=document.querySelector('.content_left');

//获取到文件夹列表的父容器ul
var filesList=document.querySelector('.content_right_list');

//获取到面包屑导航的父容器ul
var navList=document.querySelector('.right_top_list');

//获取到全选框
var allChoose=document.querySelector('.chose_ico a');

//用于判断最大id
var n = 0;

//当前层级，默认是根目录0
var current=0;

// 用来缓存当前层级的所有子数据，提高查找效率
var currentData = null;

// 初始化渲染页面
currentData=createViewHtml(data, current);






// 三者交互------------------------------------------------------------------------------------


// 左侧树状菜单点击----------------------------------------------------------------------------
treeList.addEventListener('click', function (e){
  var target = e.target;
  if(target.nodeName.toUpperCase() === 'DIV'){
    var id = target.dataset.id * 1;
    if(current === id) return;
    currentData = createViewHtml(data, current = id);
    initChecked();
  }
});

// // 右侧面包屑导航点击-----------------------------------------------------------------------
navList.addEventListener('click', function (e){
  var target = e.target;
  if(target.nodeName.toUpperCase() === 'SPAN'){
    var id = target.dataset.id * 1;
    if(current === id) return;
    currentData = createViewHtml(data, current = id);
    initChecked();
  }
});

// // 右侧点击文件列表------------------------------------------------------------------------
filesList.addEventListener('click', function (e){
  var target = e.target;
  if(target.nodeName.toUpperCase()==='LI'||target.nodeName.toUpperCase()==='IMG'){
    var id = target.dataset.id * 1;
    if(current === id) return;
    currentData = createViewHtml(data, current = id);
    initChecked();
  }

  if(target.classList.contains('file-show-name')){
    initChecked();//取消全选
    rename(target, target.dataset.id * 1);//重命名文件
  }

  if(target.classList.contains('file-checkbox')){
    checkedItem(target.parentNode);//选中文件夹
  }

});



// 重命名按钮功能-------------------------------------------------------------------------------
var Rename = document.querySelector('.renameFile');//重命名按钮
Rename.onclick = function (){
  var checkedItems = isCheckedFile(currentData);// 获取被选中的文件
  if(!checkedItems.length){//如果被选中的文件不存在
    alert('请选择文件');
    return;
  }
  if(checkedItems.length > 1){//如果被选中的文件长度大于1
    alert('只能选择一个文件');
    return;
  }
  if(checkedItems.length === 1){//如果被选中的是一个文件
    var reNameChild = getChildNode(filesList, currentData);//返回的是被选中的节点
    var showName = reNameChild.querySelector('.file-show-name');
    initChecked();
    rename(showName, showName.dataset.id*1);
  }
}

// 根据数据查找对应的节点
function getChildNode(parentNode, data){
  var children = parentNode.children;//文件夹列表的所有子集
  for(var i=0; i<children.length; i++){
    if(children[i].dataset.id*1 === data[i].id){
      return children[i];
    }
  }
  return null;
}


// 重命名文件
function rename(ele, id){
  var nextSibling = ele.nextElementSibling;//span的下一个元素input
  ele.classList.remove('active');//让span 隐藏
  nextSibling.classList.add('active');//让input显示
  nextSibling.value = ele.title;//把span的title(data[i].name)赋给input
  nextSibling.select();//input的内容被选中
  isName=true;
  nextSibling.onblur = function (){//input失去焦点的时候
    var val = this.value;
    if(val === '' || val === ele.innerHTML){//如果input的值为空或者等于之前span的值时
      nextSibling.classList.remove('active');//让input隐藏
      ele.classList.add('active');//让span显示
    }else{
      if(nameCanUse(currentData, val)){//如果名字可用
        var currentItem = wy.getItemById(currentData, id);//通过指定id获取到对应的数据
        currentItem.title = val;//就把input的值赋给这组数据的title
        ele.title = ele.innerHTML = val;//span的titie和innerHTML都是input的值
        nextSibling.classList.remove('active');//让input隐藏
        ele.classList.add('active');//让span显示
        currentData=createViewHtml(data, current);
        console.log(current,currentData)
        isName=false;
      }else{
        alert('命名冲突');//名字不可用
        this.select();//选中input的文字
      }
    }
  };
}

//-----------------------------------------------------------------

// 选中文件夹
function checkedItem(obj){//传的是勾选框的父级li
  var checked = false;//默认没选中
  obj.classList.toggle('active');//勾选框的父级div添加/移除active
  if(obj.classList.contains('active')){//如果div有active
    checked = true;
  }else{
    checked = false;
  }
  // 更新数据
  var targetData = wy.getItemById(currentData, obj.dataset.id*1);// 通过指定的id获取到对应的数据
  targetData.checked = checked;
  if(isCheckedAll(currentData)){//如果是全选
    allChoose.classList.add('active');//全选框添加active
  }else{
    allChoose.classList.remove('active');
  }
}

// 全选
allChoose.onclick = function (){
  this.classList.toggle('active');//全选框添加/移出active
  if(currentData.length==0){
  	this.classList.add('active')
  }else{
  	for(var i=0; i<currentData.length; i++){
	    if(this.classList.contains('active')){
	      currentData[i].checked = true;
	      filesList.children[i].classList.add('active');
	    }else{
	      currentData[i].checked = false;
	      filesList.children[i].classList.remove('active');
	    }
	}
  }
};

// 新建取消全选
function initChecked(){
  allChoose.classList.remove('active');
  for(var i=0; i<currentData.length; i++){
    currentData[i].checked = false;
    filesList.children[i].classList.remove('active');
  }
}

// 判断是否全选----------------------------------------------
function isCheckedAll(data){//传的是currentData
  for(var i=0; i<data.length; i++){
    if(!data[i].checked){
      return false;
    }
  }
  return true;
}


// ----------------------------------------------------------------------------
// 新建文件夹
var newFile = document.querySelector('.newFile'); // 获取新建文件夹按钮

newFile.addEventListener('click', function (e){
  // 取消全选
  initChecked();
  // 创建文件夹节点
  var newFolderNode = createFileNode();
  // 将节点插入到页面中
  filesList.insertBefore(newFolderNode, filesList.firstElementChild);
  
  renameFile(newFolderNode, data)//
});



var isName=false;
// 新建重命名功能
function renameFile(fileNode, data){
var showName = fileNode.querySelector('.file-show-name');//文件夹中的span
var renameInput = fileNode.querySelector('.file-change-name');//文件夹中的input
showName.classList.remove('active');//让span隐藏
renameInput.classList.add('active');//让input隐藏
renameInput.focus();//让input获得焦点
isName=true;
// 失去焦点
renameInput.onblur = function (){
    if(this.value === ''){//如果input的值为空
      fileNode.parentNode.removeChild(fileNode);//删除这个文件夹
    }else{
      // var currentItems = getChildrenById(data, id);
      if(nameCanUse(currentData, this.value)){//如果名字可用
        var filesData = {//创建一组数据
          title: this.value,
          id: maxId(data),
          pId: current,//当前层级
          type: 'folder',
          checked: false,
          child: []
        };
        currentData.unshift(filesData);//添加在currentData这组最前面数据
        currentData = createViewHtml(data, current);//重新渲染
        // console.log(currentData)
        isName=false;
      	}else{
        	alert('文件命名冲突！');
        	this.select();
      	}
    }
};
  
  // 回车键
  window.onkeydown = function (e){
    if(e.keyCode === 13 && renameInput.value !== ''){
      renameInput.blur();
    }
  };
}


// // ----------------------------------------------------------------------------
// // 删除功能
var deletsFile = document.querySelector('.deletsFile');//获取到删除键
deletsFile.onclick = function (){//当点击删除键的时候
  var checked = isCheckedFile(currentData);//获取到被选中的数据
  // console.log(checked);
  if(checked.length){//如果被选中的数据存在
    var isDelete = confirm('确定要删除嘛?');
    // alert('确定要删除吗？');
    if(!isDelete) return;//???????????????????????????????????????????????????????
    deleteCheckedFile(currentData);
    currentData = createViewHtml(data, current);
    initChecked();
  }else{
    alert('请选择要删除的内容!');
  }
};

// 获取被选中的文件
function isCheckedFile(data){
  var arr = [];//创建一个新数组，用来存储被选中的数据
  for(var i=0; i<data.length; i++){//循环被选中的数据
    if(data[i].checked){//如果checked为真，被选中
      arr.push(data[i]);//添加到arr中
    }
  }
  return arr;
}

// 删除被选中的文件
function deleteCheckedFile(data){//data传的是currentData
  for(var i=0; i<data.length; i++){
    if(data[i].checked){
      data.splice(i, 1);
      i--;
    }
  }
  return data;
}





//鼠标画框选中
// var chooseBox=document.querySelector('.choose_box');
filesList.onmousedown = function (e){
  if (isName) {return};
	var target = e.target;
      
    if(target.classList.contains('file_item')){
        return;
    }

	e.preventDefault();//清除默认样式
  	var x = e.pageX, y = e.pageY;
  	var chooseBox = document.createElement('div');
  	chooseBox.className = 'choose_box';
    this.appendChild(chooseBox);
  	this.onmousemove = function (e){
    	var cx = e.pageX, cy = e.pageY;
    	var L = Math.min(cx - getRect(filesList, 'left'), x - getRect(filesList, 'left') );
        var T = Math.min(cy - getRect(filesList, 'top'), y - getRect(filesList, 'top') );
        var W = Math.abs(cx - x);
        var H = Math.abs(cy - y);

        pengzhuang(chooseBox);

        chooseBox.style.left = L + 'px';
        chooseBox.style.top = T + 'px';
        chooseBox.style.width = W + 'px';
        chooseBox.style.height = H + 'px';
  	}
  	document.onmouseup = function (){
    	this.onmouseup = filesList.onmousemove = null;
    	filesList.removeChild(chooseBox);
  	}
};
function pengzhuang(ele){//chooseBox
    for(var i=0; i<filesList.children.length; i++){
        if(duang(ele, filesList.children[i]) && filesList.children[i] != ele){
        	filesList.children[i].classList.add('active');
          	currentData[i].checked=true;
          	if(isCheckedAll(currentData)){//如果是全选
			    allChoose.classList.add('active');//全选框添加active
			}
        }else{
	        if(filesList.children[i].classList.contains('active')){
        		filesList.children[i].classList.remove('active');
        		allChoose.classList.remove('active');
        		currentData[i].checked=false;
        	}
      	}
    }
}










//移动到-----------------------------
var moveFile=document.querySelector('.moveFile');//获取到“移动到”按钮
var moveFileKuang=document.querySelector('.moveFile_kuang');//获取到“移动框父级”
var kuangBody=document.querySelector('.moveFile_kuang_body');//获取到“移动框的列表部分”
var kuangHead=document.querySelector('.moveFile_kuang_head');//获取到“移动框的头部”
var btns=document.querySelectorAll('.moveFile_kuang_foot button');//获取到“移动框”按钮

//当点击“移动到”按钮的时候
moveFile.onclick=function (){
	var checked = isCheckedFile(currentData);//获取到被选中的数据
	if(checked.length){//如果被选中的数据存在
		moveFileKuang.style.display='block';//当移动框显示
		drapEle(kuangHead, moveFileKuang, true);//移动框的拖拽

    kuangBody.innerHTML=createTree(data,current);//移动框的列表部分内容就等于生成的结构

    kuangBody.addEventListener('click', function (e){
      var target = e.target;
      if(target.nodeName.toUpperCase() === 'DIV'){
        var id = target.dataset.id * 1;
        if(current === id) return;
        kuangBody.innerHTML = createTree(data, current = id);
        console.log(current,currentData);//current代表：移动框被选中层级的id.  currentData代表：文件夹列表的每一项
      }
    });
  }else{
		alert('请选择要移动的内容!');
	}


  btns[0].onclick=function (){
    var arr=wy.getChildrenById(data,current);
    for(var i=0;i<currentData.length;i++){
      if(currentData[i].checked){
        if(!nameCanUse(arr,currentData[i].title)){
          if(confirm('是否重命名？')){
            currentData[i].pId=current;
            currentData[i].checked=false;       
            arr.unshift(currentData.splice(i,1)[0]);
            currentData=createViewHtml(data, current);
            var showName = filesList.firstElementChild.querySelector('.file-show-name');//文件夹中的span
            rename(showName, current);
            i--;
          }
        }else{
          currentData[i].pId=current;
            currentData[i].checked=false;       
            arr.unshift(currentData.splice(i,1)[0]);
            currentData=createViewHtml(data, current);
            i--;
        }
      }
    }
    moveFileKuang.style.display='';
  };


  // btns[0].onclick=function (){
  //   var arr=wy.getChildrenById(data,current);
  //   // console.log(1);
  //   for(var i=0;i<currentData.length;i++){
  //       if(currentData[i].checked){
  //         if(!nameCanUse(arr,currentData[i].title)){
  //           // console.log('重名了！'); 
  //           if(confirm('是否重命名？')){
  //             // console.log(1)
  //             // var showName = filesList.children[i].querySelector('.file-show-name');//文件夹中的span
  //             // var renameInput = filesList.children[i].querySelector('.file-change-name');//文件夹中的input
  //             // showName.classList.remove('active');
  //             // renameInput.classList.add('active');
  //             // console.log(filesList.firstElementChild)
  //             // renameInput.focus();
  //             // rename(showName, current);
  //             currentData[i].pId=current;
  //             currentData[i].checked=false;       
  //             arr.unshift(currentData.splice(i,1)[0]);
  //             i--;
  //           }
  //         }else{
  //           currentData[i].pId=current;
  //             currentData[i].checked=false;       
  //             arr.unshift(currentData.splice(i,1)[0]);
  //             i--;
  //         }
  //       }
  //   }
  //   console.log(arr);
  //   moveFileKuang.style.display='';
  //   currentData=createViewHtml(data, current);
  //   var showName = filesList.firstElementChild.querySelector('.file-show-name');//文件夹中的span
  //   // var renameInput = filesList.firstElementChild.querySelector('.file-change-name');//文件夹中的input
  //   // showName.classList.remove('active');
  //   // renameInput.classList.add('active');
  //   // console.log(filesList.firstElementChild)
  //   // renameInput.focus();
  //   rename(showName, current);
  //   console.log(currentData)
  //   console.log(current);
  //   console.log(showName.nextElementSibling.value)

  // };

  // btns[0].onclick=function (){
  //   var arr=wy.getChildrenById(data,current);
  //   console.log(arr);
  //   for(var i=0;i<currentData.length;i++){
  //       if(currentData[i].checked){
  //         if(!nameCanUse(arr,currentData[i].title)){
  //           // console.log('重名了！'); 
              
  //             if(confirm('是否重命名？')){
  //               var showName = filesList.children[i].querySelector('.file-show-name');//文件夹中的span
  //               var renameInput = filesList.children[i].querySelector('.file-change-name');//文件夹中的input
  //               showName.classList.remove('active');
  //               renameInput.classList.add('active');
  //               renameInput.focus();
  //               // rename(showName, current);

  //             }
  //            // currentData[i].title='555'; 
  //            currentData[i].checked=false;       
  //         }
  //         currentData[i].pId=current;
  //         arr.unshift(currentData.splice(i,1)[0]);
  //         i--;
  //       }
  //   }
  //   console.log(arr);
  //   moveFileKuang.style.display='';
  //   currentData=createViewHtml(data, current);
  // };

  
  btns[1].onclick=function (){
    moveFileKuang.style.display='';
    for(var i=0;i<currentData.length;i++){
      if(currentData[i].checked){
        currentData[i].checked=false;
        filesList.children[i].classList.remove('active');
      }
    }
  };
};