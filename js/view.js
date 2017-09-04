function createViewHtml(data, id){
  createTreeHtml(data, id);
  createNavsHtml(data, id);
  return createFilsHtml(data, id);
}


// 生成左侧的树状菜单
function createTreeHtml(data, id){
  var html = createTree(data, id);
  treeList.innerHTML = html;
  return data;
}


// 生成面包屑导航
function createNavsHtml(data, id){
  var item = wy.getParentsById(data, id);
  var navHtml = createRightNav(item, id);
  navList.innerHTML = navHtml;
  return item;
}


// 生成所有的文件
function createFilsHtml(data, id){
  var items = wy.getChildrenById(data, id);
  var nodeHtml = createFiles(items, id);
  filesList.innerHTML = nodeHtml;
  return items;
}
