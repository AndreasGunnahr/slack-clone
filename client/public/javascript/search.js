
document.getElementById("search").addEventListener("input", handleSearch);

function handleSearch(e){
    let title = e.target.value;
    if(title == ""){
        title = "''";
    }
}
//     socket.emit('find_user', title);
// };

// socket.on('find_user_result', function(user) {
//     console.log(user);
// });
//     const option =  {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }
//     fetch("http://localhost:5000/customers/search/" + title, option)
//       .then(response => { 
//         response.json().then(function(data) {
//             let tr = document.querySelectorAll(".table-row");
//             let index = 0;
//             tr.forEach(row => {
//                 let rowID = row.attributes[1].nodeValue;
//                 let maxRange = data.searchValues.length;
//                 if(maxRange == 0){
//                     row.style.display = "";
//                 }else{
//                     if(Number(rowID) == Number(data.searchValues[index].id)){
//                         row.style.display = "";
//                         index ++;
//                         if(index == maxRange){
//                             index = 0;
//                         }
//                     }else{
//                         row.style.display = "none";
//                     }
//                 }
//             });
//         });
//     })
// }
