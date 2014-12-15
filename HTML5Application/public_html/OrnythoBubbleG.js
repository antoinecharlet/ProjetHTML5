/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//(y2 - y1 )² + (x2 -x1)² < 4R²

var monCanvas = document.getElementById('Dessin');

if (monCanvas.getContext) {
    var ctx = monCanvas.getContext('2d');

    
    monCanvas.width = 400;
    monCanvas.height = 600;
    ctx.fillStyle = "#000000";
 
    ctx.fillStyle = "#0000FF";
    ctx.fillRect(0, 0, 400, 600);

    ctx.fill();




}