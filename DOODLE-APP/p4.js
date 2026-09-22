let canvas;
let classifier;

function setup()
{
    canvas = createCanvas(400, 400);
    background('white')
    canvas.center()
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis; // text to voice
}

function preload()
{
    classifier = ml5.imageClassifier('DoodleNet',modelload)
}

function modelload()
{
    console.log("model is loaded")
}

function draw()
{
    strokeWeight(25)
    if(mouseIsPressed)
    {
        line(pmouseX,pmouseY,mouseX,mouseY)
    }
}

function classifyCanvas()
{
    if(classifier)
    {
        classifier.classify(canvas,gotResult)
    }
    else{
        console.log("classifier is not loaded yet")
    }
}

function gotResult(result)
{
   console.log(result);
   var l = result[0].label;
   var con = (result[0].confidence * 100).toFixed(2)
   document.getElementById('object').innerText= "This is " + l ;
   document.getElementById('acc').innerText="Accuracy is : "+ con + "%"

   let say = new SpeechSynthesisUtterance('This is '+l)
   synth.speak(say)


}

function clear_canvas()
{
    background('white')
}