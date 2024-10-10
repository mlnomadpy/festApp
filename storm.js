var Sand = {
    el: "#sand", 
    density: 10000, // higher = fewer bits
    maxHSpeed: 5, // How much do you want them to move horizontally
    minFallSpeed: 2,
      canvas: null,
      ctx: null, 
    particles: [],
    colors: [],
    mp: 1,
    quit: false,
    init(){
      this.canvas = document.querySelector(this.el);
      this.ctx = this.canvas.getContext("2d");
      this.reset();
      requestAnimationFrame(this.render.bind(this));
      window.addEventListener("resize", this.reset.bind(this));
    },
    reset(){
      this.w = window.innerWidth;
      this.h = window.innerHeight;
      this.canvas.width = this.w;
      this.canvas.height = this.h;
      this.particles = [];
      this.mp = Math.ceil(this.w * this.h / this.density);
              for(var i = 0; i < this.mp; i++) {
          var size = Math.random() * 1 + 2; // smaller size for sand grains
          this.particles.push({
              x: Math.random()*this.w + this.w/2, // x-coordinate
              y: Math.random()*this.h - this.h/2, // y-coordinate
              w: size,
              h: size,
              vy: Math.random() * 1 - 0.5, // subtle vertical movement, simulating the turbulent effect of wind
              vx: this.maxHSpeed + Math.random(), // faster horizontal movement for sand
              fill: "#c2b280", // sandy color
              s: (Math.random() * 0.2) - 0.1
          });
      }
  
    },
    
    render(){
          this.ctx.clearRect(0, 0, this.w, this.h);
          this.particles.forEach((p,i) => {
        p.y += p.vy;
              p.x += p.vx;
              this.ctx.fillStyle = p.fill;
              this.ctx.fillRect(p.x, p.y, p.w, p.h);
        if(p.x > this.w+5 || p.x < -5 || p.y > this.h){
          p.x = Math.random()*this.w + this.w/2;
          p.y = Math.random()*this.h - this.h/2;
        
        }
      });
      if(this.quit){
        return;
      }
          requestAnimationFrame(this.render.bind(this));
    },
    destroy(){
      this.quit = true;
    }
      
  };
  
  var confetti = Sand.init();