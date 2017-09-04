var Data = {
	files: [
		{
			title:'根目录',
			id:0,
			maxId:17,
			type:'root',
			child:[
				{
					title:'我的音乐',
					id:1,
					pId:0,
					checked: false,
	          		type: 'folder',
					child:[
						{
							title:'周杰伦',
							id:3,
							pId:1,
							checked: false,
			          		type: 'folder',
							child:[
								{
									title:'七里香',
									id:5,
									pId:3,
									checked: false,
					          		type: 'folder'
								},
								{
									title:'1',
									id:16,
									pId:3,
									checked: false,
					          		type: 'folder'
								}
							]
						},
						{
							title:'陈奕迅',
							id:4,
							pId:1,
							checked: false,
					        type: 'folder'
						}
					]
				},
				{
					title:'我的电影',
					id:2,
					pId:0,
					checked: false,
					type: 'folder',
					child:[
						{
							title:'微电影',
							id:12,
							pId:2,
							checked: false,
					        type: 'folder'
						},
						{
							title:'大电影',
							id:15,
							pId:2,
							checked: false,
					        type: 'folder'
						},
						{
							title:'1',
							id:17,
							pId:2,
							checked: false,
					        type: 'folder'
						}
					]
				}
			]
		}
	]
}