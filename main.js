Webcam.set(
{
width:350,
height:300,
image_format:'png',
png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
Prediction1="";
Prediction2="";
function take_snapshot(){
Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
});
}
console.log('ml5 version', ml5.version)
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6nqrOefsT/model.json', modelLoaded);
function modelLoaded(){
console.log("modelLoaded")
}
function speak(){
var synth=window.speechSynthesis;
speak_data1="The first prediction is "+Prediction1;
speak_data2="The second prediction is "+Prediction2;
var utterthis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
synth.speak(utterthis)
}
function check(){
img=document.getElementById('captured_image');
classifier.classify(img,gotResult);
}
function gotResult(error,results){
if(error){
console.error(error);
}
else{
console.log(results);
document.getElementById("result_emotion_name1").innerHTML=results[0].label;
document.getElementById("result_emotion_name2").iinerHTML=results[1].label;
Prediction1=results[0].label
Prediction2=results[1].label
speak();
if(results[0].label=="happy"){
document.getElementById("update_emoji1").innerHTML="&#128522;"

}
if(results[0].label=="sad"){
    document.getElementById("update_emoji1").innerHTML="&#128532;"
    
    }
   
    if(results[1].label=="happy"){
        document.getElementById("update_emoji2").innerHTML="&#128522;"
        
        }
        if(results[1].label=="sad"){
            document.getElementById("update_emoji2").innerHTML="&#128532;"
            
            }
            if(results[1].label=="angry"){
                document.getElementById("update_emoji2").innerHTML="&#128545;"
            }
}
}