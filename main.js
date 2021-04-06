(function(){ //Main BaleadaPlay 1.0.0-By Jocsanex5

    //Globales()

    let game = document.getElementById('game');
        G = game.getContext('2d'),
        ancho = 1000, largo = 500,
        cont=1000,
        btnJugar = document.getElementById('btnJugar'),
        srcPlayer = 'p_1_e',
        y = 200,
        aguacateX = 1000,aguacateY = 400,
        nubeX = 1000, nubeY = 300,
        pts = 0;

    let game_over = false, T;

    let moverBaleada, timePrincipal; //!!! 

    var audio = new Audio();
            audio.src = 'recursos/salto.mp3';

    let music = new Audio();
            music.src = 'recursos/musicBJ.mp3';

    //Functions()
        const borrar = () =>{
            game.width = ancho;
            game.heigth = largo;
        }
        
        class baleada{

                constructor(X, Y){

                    this.posX = X;
                    this.posY = Y;
                }

            posiciones(pos){

                if( pos == 'x' ){

                    return this.posX;
                
                } else{

                    return this.posY;
                } 
            }

            dibujar(){

                    let face = new Image();
                        
                    face.src = `recursos/${srcPlayer}.png`;

                    G.drawImage( face, this.posX, this.posY, 100, 100 );
            }

            mover(){

                    this.posY += 8;

                    if( this.posY >= 510 ){

                        clearInterval(moverBaleada);

                        GameOver();
                    }
            }

            saltar(){

                    this.posY -= 60;
            }
        }

        class aguacate{

                constructor(X, Y){

                    this.posX = X;
                    this.posY = Y;
                }

            dibujar(img, tamX, tamY){

                    let face = new Image();
                        
                    face.src = `recursos/${img}.png`;

                    G.drawImage( face, this.posX, this.posY, tamX, tamY ); 
            }

            wind(pX){

                    if( Baleada.posiciones('x') + 100 >= this.posX ){

                        pts++; pX = Math.floor(Math.random() * 500); audio.play();
                    } 
            }
        }

        class nube extends aguacate{}

    const obst = (x) =>{

            //paisaje del fondo
            G.beginPath();
                G.fillStyle = 'yellow';
                G.arc(1, 1, 100, 0, Math.PI*2, false);
            G.fill();

                //Murallas de obstaculos
                G.beginPath();
                    G.lineWidth = 50;
                    G.lineCap = 'round';
                    G.strokeStyle = '#000';

                    G.moveTo(x, 0);
                    G.lineTo(x, y);

                    G.moveTo(x,500);
                    G.lineTo(x, y+150);

                G.stroke();

                const choque = () =>{

                    if( Baleada.posiciones('y') <= y && Baleada.posiciones('x') + 90 == x){ 

                        GameOver();
                    
                    } else if( Baleada.posiciones('y') + 100 >= y + 150 && Baleada.posiciones('x') + 100 == x){

                        GameOver();
                    }
                }

            choque();
    }


    const Time = () =>{ let cont = 0;

        T = setInterval(function(){ cont++;

            document.querySelector('#datos p:nth-child(1) span').innerHTML = cont;
            document.querySelector('#perder div:nth-child(3) span').innerHTML = cont;

        }, 1000);
    }

    //--------------------Principal Function----------------------

     let Baleada = new baleada(100, 10), 
         Aguacate, Nube1;

        document.querySelector('#play').style.animation = '3s perderV';
        
        document.getElementById('creador').onclick = function(){
            
          Swal.fire({
              html: '<h2 class="font_title">Creador</h2>' +
              
              '<img width="200px" src="recursos/creador.png" class="img_alert">' +
              
              '<p class="font_cont">Creada y desarrollada por Jocsanex5 -Mi correo para consultas o sujerencias: -jocsanex5@gmail.com</p>'
          })
        }
        
        document.getElementById('ayuda').onclick = function(){
            
            Swal.fire({
                html: '<h2 class="font_title">Necesitas Ayuda?</h2>' +
                
                '<p class="font_cont">Lo único que debes de hacer es tocar la pantalla para hacer que la baleada salte, es fácil!!! o no??? (°^°)</p>' +
                
                '<img width="200px" class="img_alert" src="recursos/cubiertos.gif">'
            })
        }
        

    btnJugar.onclick = function(){ music.play();

        document.addEventListener('keydown', function(evento){

            if(evento.keyCode==73){Baleada.saltar(); srcPlayer = 'p_1_c';}
        });

        game.onclick = function(){ Baleada.saltar(); srcPlayer = 'p_1_c';}

        document.querySelector('#play').style.visibility = 'hidden';
        document.querySelector('#play').style.animation = '1s perderNV';
        document.querySelector('.wrapper').style.visibility = 'visible';
        btnJugar.style.visibility = 'hidden';

        Time(); //time del juego

        cambioY = setInterval(function(){ 

            y = Math.floor(Math.random() * 500); 

            if(y>400){ y -= 200 };

        }, 3150); 

        cambioAguacate = setInterval(function(){ aguacateY = Math.floor(Math.random() * 500); }, 4000);
        cambioNube = setInterval(function(){ 

            nubeY = Math.floor(Math.random() * 500); 

            if(nubeY>=400){nubeY-=400}

        }, 10500);

            imgplayer = setInterval(function(){srcPlayer = 'p_1_e';}, 1000/6);

            moverBaleada = setInterval(function(){

                Baleada.mover();
        
            }, 1000/30); //FPS


            //----------------------------------------

            const Principal = () =>{ 

                Aguacate = new aguacate(aguacateX, aguacateY); if(aguacateX<=0){aguacateX=1000;}else{aguacateX-=5;}
                Nube1 = new nube(nubeX, nubeY); if(nubeX<=-200){nubeX=1000;}else{nubeX-=3;}

                if(cont<=0){cont=1000;}else{cont-=10;} 

                borrar();
                Baleada.dibujar();
                Nube1.dibujar('nube', 150, 100);
                Aguacate.dibujar('aguacate', 50, 60); Aguacate.wind(1, aguacateY);

                obst(cont);
                document.querySelector('#AR').innerHTML = pts;
            }

            timePrincipal = setInterval(function(){ Principal() }, 1000/60); //FPS
    }

    const GameOver = () =>{

        clearInterval(timePrincipal); clearInterval(moverBaleada); clearInterval(T);
        document.getElementById('perder').style.visibility = 'visible';
        document.getElementById('perder').style.animation = '1s perderV';
        document.querySelector('.wrapper').style.visibility = 'hidden';
        
        music.src='';

        console.log(`Aguacates = ${pts}`);
    }

    document.getElementById('V_a_jugar').onclick = function(){ location.reload(); }

}())