document.getElementById("myForm").addEventListener("submit",saveBookmark);



//  localStorage shi chamateba   
function saveBookmark(e){
	e.preventDefault();

	let siteName=document.getElementById("siteName").value;
	let siteUrl=document.getElementById("siteUrl").value;

	if(!siteName || !siteUrl){
		alert("Please Enter URL ")

	}else{
		var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);

        if(!siteUrl.match(regex)){
        	alert("Please valid url");
        	return false;
        }
	        const bookmark={
				name:siteName,
				url:siteUrl
			}



			if(localStorage.getItem("bookmarks") === null){
				const bookmarks=[];
				bookmarks.push(bookmark);
				localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
			}else{
				const bookmarks=JSON.parse(localStorage.getItem("bookmarks"));
				


				bookmarks.push(bookmark);
				localStorage.setItem("bookmarks", JSON.stringify(bookmarks));


			}

			fetchBookmarks();
			document.getElementById("siteName").value="";
			document.getElementById("siteUrl").value="";


		

      

	}


}

// gamotana   

function fetchBookmarks(){
		const bookmarks=JSON.parse(localStorage.getItem("bookmarks"));
		

		const bookmarksResults=document.getElementById("bookmarksResults");
		

		bookmarksResults.innerHTML="";
		bookmarks.forEach(bookmark => {
			const name=bookmark.name;
			const url=bookmark.url;

			bookmarksResults.innerHTML+=`<div class="card card-body bg-light">
			<h3>${name} <a class="btn btn-outline-primary" href="${url}" target="_blank">Visit</a>
			<a class="btn btn-danger"  onclick="deleteBookmark('${url}')">Delete</a> 
			 </h3> 
			 
			</div> <br>`;
		})
   	
}


//washla 
function deleteBookmark(url){
		const bookmarks=JSON.parse(localStorage.getItem("bookmarks"));
		bookmarks.forEach((bookmark,index) => {
			
			
			if(bookmark.url === url){
				bookmarks.splice(index,1);

			}

		})
	
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

		fetchBookmarks();



}
