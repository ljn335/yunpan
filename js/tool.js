/**
 * 微云的用来操作数据的工具方法
 */

var wy = {};

// 通过指定的id获取到对应的数据
wy.getItemById = function (data, id){
  var current = null;
  for(var i=0; i<data.length; i++){
    if(data[i].id === id){
      current = data[i];
      break;
    }
    if(!current && data[i].child){
      current = this.getItemById(data[i].child, id);
      if(current){
        break;
      }
    }
  }
  return current;
};

// 获取到一组数据data中指定id的所有的子集
wy.getChildrenById = function (data, id){
  var current = this.getItemById(data, id);
  if(current && current.child){
    return current.child;
  }
};

// 通过指定的id获取到自己以及自己所有的父级
wy.getParentsById = function (data, id){
  var parents = [];
  var current = this.getItemById(data, id);
  if(current){
    parents.push(current);
    parents = parents.concat(this.getParentsById(data, current.pId));
  }
  return parents;
};

// 获取根节点
function getRoot(data){
  for(var i=0; i<data.length; i++){
    if(data[i].type === 'root'){
      return data[i];
    }
  }
}

// 设置并返回最大id
function maxId(data){
  return getRoot(data).maxId = getRoot(data).maxId + 1;
}

// 判断名字是否可用
function nameCanUse(data, name){
  if (!data) {
    data=[];
    return true;
  };
  // console.log(data)

  for(var i=0; i<data.length; i++){
    if(data[i].title === name){
      return false;
    }
  }
  return true;
}

// 判断是否全选
function isCheckedAll(data){
  console.log(data);
  for(var i=0; i<data.length; i++){
    if(!data[i].checked){
      return false;
    }
  }
  return true;
}


function getRect(obj, type){
      var rect = obj.getBoundingClientRect();
      switch(type){
        case 'left':
          return rect.left;
        break;
        case 'top':
          return rect.top;
        break;
        case 'right':
          return rect.right;
        break;
        case 'bottom':
          return rect.bottom;
        break;
      }
    };
    
    function duang(current, target){
      var currentRect = current.getBoundingClientRect();
      var targetRect = target.getBoundingClientRect();
      var currentLeft = currentRect.left, 
          currentTop = currentRect.top,
          currentRight = currentRect.right,
          currentBottom = currentRect.bottom;
      var targetLeft = targetRect.left, 
          targetTop = targetRect.top,
          targetRight = targetRect.right,
          targetBottom = targetRect.bottom;
      return currentRight > targetLeft && currentBottom > targetTop && currentLeft < targetRight && currentTop < targetBottom;
    };





    function drapEle(eleDown, eleMove, scope){
      eleDown.onmousedown = function (e){
        e.preventDefault();
        var dx = e.pageX - getRect(eleMove, 'left');
        var dy = e.pageY - getRect(eleMove, 'top');
        document.onmousemove = function (e){
          var L = e.pageX - dx - getRect(eleMove.offsetParent, 'left');
          var T = e.pageY - dy - getRect(eleMove.offsetParent, 'top');
          
          if(scope){
            L = L <=0 ? 0 : L;
            T = T <=0 ? 0 : T;
            L = L > eleMove.offsetParent.clientWidth - eleMove.offsetWidth ? eleMove.offsetParent.clientWidth - eleMove.offsetWidth : L;
            T = T > eleMove.offsetParent.clientHeight - eleMove.offsetHeight ? eleMove.offsetParent.clientHeight - eleMove.offsetHeight : T;
          }
          
          eleMove.style.left = L + 'px';
          eleMove.style.top = T + 'px';
        };
        document.onmouseup = function (){
          this.onmouseup = this.onmousemove = null;
        }
      };
    }