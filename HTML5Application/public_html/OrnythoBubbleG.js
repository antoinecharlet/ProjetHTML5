	var monCanvas = document.getElementById('dessin');

	//monCanvas.width=document.body.clientWidth;
	//monCanvas.height=document.body.clientHeight;

	if (monCanvas.getContext) {

        var ctx = monCanvas.getContext('2d');


    }
    else {
        alert('Failed to retrieve browser');
    }


   
    var Bulles = new Array();
    var vitesseX = 0;
    var vitesseY = 0;
    var dX = 0;
    var dY = 0;
    var vitesse = 5;
    var CompteurSouris = 0;
    var Clic1 = 1;
    var Clic2 = 1;
    var Clic3 = 1;
	var Chrono=0;
    var rayon = 25;
    var limite = 70;
	

	var scoresMax=[0,0,0];
    Cercles = [[monCanvas.width / 2, monCanvas.height - 20, "black"]];
    cercle(Cercles[0][0], Cercles[0][1], Cercles[0][2]);
    var intervaljouer = setInterval(jouer, 1);

    var HauteurToit = 0;
    var Toitlvl2 = "";
    var vitesseToit = 3000;

    var Toitlvl3 = "";

   
    monCanvas.addEventListener('click', click, false);

    //Fonction permettant de récupérer le clic de la souris
    function click(e) {
        xSourisDoc = e.pageX;
        ySourisDoc = e.pageY;
        var xCanvas = monCanvas.offsetLeft;
        var yCanvas = monCanvas.offsetTop;
        var xSourisCan = xSourisDoc - xCanvas;
        var ySourisCan = ySourisDoc - yCanvas;
        DeplacementBulle(xSourisCan, ySourisCan);
    }

       //Dessiner le cercle
    function cercle(x, y, noir) {
        ctx.fillStyle = noir;
        ctx.beginPath();
        ctx.arc(x, y, rayon, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }

      //Mise à jour des boules
    function balleUp() {
        for (var i = 0; i < Bulles.length; i++) {
            cercle(Bulles[i][0], Bulles[i][1], Bulles[i][2]);
            //Permet de cloturer une partie une fois la limite atteinte
            if ((Bulles[i][1] + rayon) >= monCanvas.height - limite || HauteurToit >= monCanvas.height - limite) {
                alert("Perdu! Essaie encore et essaie de battre: " + Bulles.length + " points!");
				
				
				Bulles.splice(0, Bulles.length);
                HauteurToit = 0;
            }
        }
    }

    //Arrêter la balle lors d'un contact
    function detecterBall() {
        for (var i = 0; i < Bulles.length; i++) {
            //Distance entre deux boules
            distance = Math.sqrt(((Cercles[0][0] - Bulles[i][0]) * (Cercles[0][0] - Bulles[i][0])) + ((Cercles[0][1] - Bulles[i][1]) * (Cercles[0][1] - Bulles[i][1])));
            if ((distance - (rayon * 2)) <= 0) {
                vitesseY *= 0;
                vitesseX *= 0;
                Bulles.push([Cercles[0][0], Cercles[0][1], Cercles[0][2]]);
                Cercles.push([monCanvas.width / 2, monCanvas.height - 20, "black"]);
                Cercles.shift();
                cercle(Cercles[0][0], Cercles[0][1], Cercles[0][2]);
                CompteurSouris = 0;
            }
        }
    }

    
    function jouer() {
		
        ctx.save();

        ctx.clearRect(0, 0, monCanvas.width, monCanvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, monCanvas.width, HauteurToit);


        balleUp();

        cercle(Cercles[0][0], Cercles[0][1], Cercles[0][2]);

        //Condition pour que la boule rebondisse
        if (((Cercles[0][0] + rayon) >= monCanvas.width) || (Cercles[0][0] <= rayon)) {
            vitesseX *= -1;
        }

          //Stopper la balle une fois arrivée au toit
        if (Cercles[0][1] <= rayon + HauteurToit) {
            vitesseY *= 0;
            vitesseX *= 0;
            Bulles.push([Cercles[0][0], Cercles[0][1], Cercles[0][2]]);
            Cercles.push([monCanvas.width / 2, monCanvas.height - 20, "black"]);
            Cercles.shift();//Permet d'enlever le 1er element
            cercle(Cercles[0][0], Cercles[0][1], Cercles[0][2]);
            CompteurSouris = 0;
        }

        //Stopper la boule au contact
        detecterBall();

        //Accèlere la boule
        Cercles[0][0] += vitesseX * vitesse;
        Cercles[0][1] += vitesseY * vitesse;
        ctx.restore();

       
       // affichage du score
		document.getElementById('score').innerHTML=Bulles.length;
		
    }

   //vitesse et sens de la boule
    function DeplacementBulle(x, y) {
       //Empeche de modifier la direction une fois le clic effectué
        if (CompteurSouris === 0) {
            dX = (x - Cercles[0][0]);
            dY = (y - Cercles[0][1]);
            vitesseX = dX / Math.sqrt(dX * dX + dY * dY);
            vitesseY = dY / Math.sqrt(dX * dX + dY * dY);
            CompteurSouris++;
        }
    }

    //Permet de rejouer
    function restart() {
        HauteurToit = 0;
        for (var i = 0; i < Bulles.length; i++) {
            Bulles.splice(0, Bulles.length);
        }
        Clic1 = 1;
        Clic2 = 1;
        Clic3 = 1;
    }

    //lancer niveau 1
    function Jouerlvl1() {
        if (Clic1 === 1) {
            clearInterval(Toitlvl2);
            clearInterval(Toitlvl3);
            vitesse = 20;
            restart();
            Clic1 = 0;
            Clic2 = 1;
            Clic3 = 1;
        }
    }

    //lancer niveau 2
    function Jouerlvl2() {
        if (Clic2 === 1) {
            restart();
            clearInterval(Toitlvl3);
            vitesseToit=2000;
            Toitlvl2 = setInterval(DescenteToit, vitesseToit);
            for (var i = 0; i < Bulles.length; i++) {
                Bulles.splice(0, Bulles.length);
            }
            vitesse = 10;
            Clic2 = 0;
            Clic1 = 1;
            Clic3 = 1;
        }
    }

    //lancer niveau 3
    function Jouerlvl3() {
        if (Clic3 === 1) {
            restart();
            clearInterval(Toitlvl2);
            vitesseToit = 800;
            Toitlvl3 = setInterval(DescenteToit, vitesseToit);
            for (var i = 0; i < Bulles.length; i++) {
                Bulles.splice(0, Bulles.length);
            }
            vitesse = 5;
            Clic3 = 0;
            Clic1 = 1;
            Clic2 = 1;
        }
    }


    //Descente du toit selon le level
    function DescenteToit() {
        HauteurToit += 20;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, monCanvas.width, HauteurToit);
        for (var i = 0; i < Bulles.length; i++) {
            Bulles[i][1] += 20;
        }
        cercle(Cercles[0][0], Cercles[0][1], Cercles[0][2]);
    }