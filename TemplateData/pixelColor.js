var adsShown = false;
function PixelColor(x,y){
    var canvas = document.getElementsByTagName("canvas")[document.getElementsByTagName("canvas").length-1];
    var context = canvas.getContext('webgl', {preserveDrawingBuffer: true}) || canvas.getContext('webgl2', {preserveDrawingBuffer: true});;
    var pixelR, pixelG, pixelB, pixelA;   

    // ***** SET VALUES HERE *********\\
    var detected = [[245,245,245]]; 
    //********************************\\
    
    if(context != null){
        var pixels = new Uint8Array(
            4 * context.drawingBufferWidth * context.drawingBufferHeight
        );
        context.readPixels(
            0,
            0,
            context.drawingBufferWidth,
            context.drawingBufferHeight,
            context.RGBA,
            context.UNSIGNED_BYTE,
            pixels
        );
        // And here's components of a pixel on (x, y):
        pixelR = pixels[4 * (y * context.drawingBufferWidth + x)];
        pixelG = pixels[4 * (y * context.drawingBufferWidth + x) + 1];
        pixelB = pixels[4 * (y * context.drawingBufferWidth + x) + 2];
        pixelA = pixels[4 * (y * context.drawingBufferWidth + x) + 3];
    }else
    {
        context = canvas.getContext('2d');
        var pixels = context.getImageData(0, 0, 1, 1).data;
        pixelR = pixels[0];
        pixelG = pixels[1];
        pixelB = pixels[2];
        pixelA = pixels[3];
    }
    for(var i = 0; i < detected.length; i++){
        if(Math.abs(pixelR - detected[i][0]) < 5 
        && Math.abs(pixelG - detected[i][1]) < 5 
        && Math.abs(pixelB - detected[i][2]) < 5)
        {
            let name = prompt("Player Name:");
            if(name){
                var i = 0;
                while(i < 30)
                {
                    i++;
                    window.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':8}));
                    window.dispatchEvent(new KeyboardEvent('keypress',{'keyCode':8}));
                    window.dispatchEvent(new KeyboardEvent('keyup',{'keyCode':8}));
                }
                for(i = 0; i < name.length; i++){
                    window.dispatchEvent(new KeyboardEvent('keydown',{'charCode':name.charCodeAt(i)}));
                    window.dispatchEvent(new KeyboardEvent('keypress',{'charCode':name.charCodeAt(i)}));
                    window.dispatchEvent(new KeyboardEvent('keyup',{'charCode':name.charCodeAt(i)}));
                }
            }
            setTimeout(function(){
                window.MasterMute = false;                
            }, 500)
        }
    }
}