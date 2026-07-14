// ==========================
// Smooth Scrolling
// ==========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


// ==========================
// Animated Statistics
// ==========================

const counters = document.querySelectorAll("#stats h3");

const speed = 40;

counters.forEach(counter => {

    const animate = () => {

        const text = counter.innerText;

        const target = parseFloat(text);

        const current = parseFloat(counter.dataset.count || 0);

        const increment = target / speed;

        if(current < target){

            const next = Math.min(current + increment, target);

            counter.dataset.count = next;

            if(text.includes("%")){

                counter.innerText = next.toFixed(1) + "%";

            }

            else if(text.includes("+")){

                counter.innerText = Math.floor(next) + "+";

            }

            else{

                counter.innerText = Math.floor(next);

            }

            requestAnimationFrame(animate);

        }

    };

    animate();

});


// ==========================
// Navbar Shadow on Scroll
// ==========================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 30){

        header.style.boxShadow = "0 6px 20px rgba(0,0,0,.15)";

    }

    else{

        header.style.boxShadow = "0 2px 15px rgba(0,0,0,.05)";

    }

});