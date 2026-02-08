const container = document.getElementById("cards-container");
const layers = document.querySelectorAll(".layer");

let lastSpawn = 0;
let cards = [];

document.addEventListener("mousemove",(e)=>{

// PARALLAX FUNDO
let x = (window.innerWidth/2 - e.clientX)/40;
let y = (window.innerHeight/2 - e.clientY)/40;

layers.forEach((layer,i)=>{
gsap.to(layer,{
x:x*(i+1),
y:y*(i+1),
duration:1
});
});

// CONTROLE DE SPAWN (evita flood)
if(Date.now() - lastSpawn > 250){
spawnCard(e.clientX,e.clientY);
lastSpawn = Date.now();
}

});

function spawnCard(mouseX,mouseY){

if(cards.length > 12){
cards[0].remove();
cards.shift();
}

// OFFSET ALEATÓRIO (estilo KPR)
let offsetX = (Math.random()-0.5)*300;
let offsetY = (Math.random()-0.5)*300;

let finalX = mouseX + offsetX;
let finalY = mouseY + offsetY;

let startX = finalX + (Math.random()*400-200);
let startY = finalY + (Math.random()*400-200);

let card = document.createElement("div");
card.classList.add("card");

card.innerHTML = `
<img src="https://picsum.photos/400/300?random=${Math.random()}">
`;

card.style.left = startX+"px";
card.style.top = startY+"px";

container.appendChild(card);
cards.push(card);

// ANIMAÇÃO ENTRANDO
gsap.fromTo(card,
{opacity:0,scale:0.6},
{
x: finalX-startX,
y: finalY-startY,
opacity:1,
scale:1,
duration:0.6,
ease:"power3.out"
});

}
// ===== TIMELINE KPR STYLE =====

// 2. Animação de Scroll (KPR Storytelling)
        const storyCards = gsap.utils.toArray(".story-card");
        const mainTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".scroll-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        });

        // Loop para cada card surgir do fundo e sumir
        storyCards.forEach((card, i) => {
            mainTl.to(card, {
                opacity: 1,
                transform: "translateZ(0px)",
                duration: 1,
                pointerEvents: "auto"
            })
            .to(card, {
                opacity: 0,
                transform: "translateZ(500px) translateY(-100px)",
                duration: 1,
                pointerEvents: "none"
            }, "+=0.5");
        });

        // 3. Efeito Final: Cards se unem em fileira
        mainTl.to(".final-grid-container", {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out"
        });

        // Efeito de flutuação nos itens finais
        gsap.to(".final-item", {
            y: -20,
            duration: 2,
            repeat: -1,
            yoyo: true,
            stagger: 0.2,
            ease: "sine.inOut"
        });
        