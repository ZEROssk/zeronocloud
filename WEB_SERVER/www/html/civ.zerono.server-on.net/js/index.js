'usestrict'
let thumbnail_list = ['Twitter-1174215925614223360-hirame_sa-EEunKGoW4AAJVaB.jpg','Twitter-1174214910642991104-riosi_RRR-EEumO9zXYAAuPc8.jpg','Twitter-1173645323442372608-hiraga_matsuri-EEmgMhrU8AY2G91.jpg','Twitter-1173588320120557568-herumonnnulu-EElruLEU8AIdTnF.jpg','Twitter-1173243158664110086-TYBAyosizawa-EEgybnDU8AEuby2.jpg']

document.addEventListener("DOMContentLoaded", function() {
	let rootContainer = document.getElementById("root-container");

	addContent(rootContainer);

	const pNum = "1";

	//fetch(`http://civ_qpi:5200/api/v1/twimg/page?p=${pNum}`)
	fetch(`http://civ.zerono.server-on.net:8888/api`)
		.then(response => {
			console.log(response.status); 

			if (!response.ok) {
				console.error("Server error", response);
			} else {
				response.json().then(userInfo => {
					console.log(userInfo);
				});
			}
		}).catch(error => {
			console.error("Network error", error);
		});
});

function open_OriginalImg() {
	console.log("click!");
}

function addContent(rootC) {
	let content = document.createElement("div");
	content.setAttribute('id', 'content');
	rootC.appendChild(content);

	let media = document.createElement("div");
	media.setAttribute('id', 'media');
	content.appendChild(media);


	let imgContainer = document.createElement("div");
	imgContainer.setAttribute('id', 'img-container');
	media.appendChild(imgContainer);

	for(let i=0; i<thumbnail_list.length; i++) {
		let thumbnail =
			'<div class="content-thumbnail" target="_blank">'+
				'<img class="thumbnail-img" onclick="open_OriginalImg()" src="../IMAGE/'+ thumbnail_list[i] +'"/>'+
			'</div>'
		;

		document.getElementById('img-container').insertAdjacentHTML('beforeend', thumbnail);
	}
}
