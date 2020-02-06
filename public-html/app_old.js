
(() => {
    const textArea = document.getElementById("corpus");
    textArea.addEventListener("input",() => {
        let t = textArea.value;
        if (t.length > 0) {
            let n = t.length;
            let char = t[n - 1];
            //console.log("Char -> " + char);
            if (" " === char) {
                loadDoc();
            }
        }
        let textLn = textArea.value.length;
        if (textLn >= 100) {
            textArea.style.fontSize = "10pt";
        }
    });
})();
var url = "https://ehrnotes-ask.azurewebsites.net/entview";
url = "http://localhost:8000/entview";
function loadDoc() {
    console.log("Loading doc");
    var xmlhttp = new XMLHttpRequest();

    var corpus = document.getElementById("corpus").value;
    var content = { corpus: corpus };

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Got response");
            console.log(this.response);
            //var myArr = JSON.parse(this.responseText);
            myFunction(this.response);
        }
    };
    xmlhttp.open("POST",url,true);
    xmlhttp.send(JSON.stringify(content));
}

function myFunction(arr) {
    var data = JSON.parse(arr);
    document.getElementById("nlp_result").innerHTML = data.data;
}
