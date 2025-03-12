document.addEventListener("DOMContentLoaded", () => {
  // text 채워지는 모션
  const textElements = gsap.utils.toArray(".scroll-text-section .text");
  textElements.forEach((text) => {
    gsap.to(text, {
      backgroundSize: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: text,
        start: "center 80%",
        end: "center 20%",
        scrub: true,
      },
    });
  });


  const images = gsap.utils.toArray(".skill-section .item");
  const imageSize = images.length;
  const total = images.length;
  const degree = 360 / total;

  gsap.registerPlugin(ScrollTrigger);

  const init = () => {
    const timeline = gsap.timeline();

    images.forEach((image, index) => {
      const sign = Math.floor((index / 2) % 2) ? 1 : -1; // 짝수/홀수에 따라 방향 설정
      const value = Math.floor((index + 4) / 4) * 4; // 회전 값 계산
      const rotation = index > imageSize - 3 ? 0 : sign * value;
      console.log(rotation);

      gsap.set(image, {
        rotation: rotation,
        scale: 0.5,
      });

      timeline.from(
        image, {
          x: () =>
            index % 2 ?
            window.innerWidth + image.clientWidth * 4 :
            -window.innerWidth - image.clientWidth * 4,
          y: () => window.innerHeight - image.clientHeight,
          rotation: index % 2 ? 200 : -200,
          scale: 4,
          opacity: 1,
          ease: "power4.out",
          duration: 1,
          delay: 0.15 * Math.floor(index / 2),
        },
        0
      );

      let rotationAngle = index * degree;
      timeline.to(
        image, {
          scale: 1,
          duration: 0,
        },
        0.15 * (imageSize / 2 - 1) + 1
      );

      timeline.to(
        image, {
          transformOrigin: "center 150vh",
          rotation: index > imageSize / 2 ?
            -degree * (imageSize - index) : rotationAngle,
          duration: 1,
          ease: "power1.out",
        },
        0.15 * (imageSize / 2 - 1) + 1
      );
    });
  };

  const draggable = () => {
    let start = 0;
    Draggable.create(".skill-section .items", {
      type: "rotation",

      onDragStart: function () {
        start = this.rotation;
      },
      onDragEnd: function () {
        const rotation = this.rotation;
        const offset = Math.abs(rotation - start);
        if (rotation > start) {
          if (rotation - start < degree / 2) {
            gsap.to(".skill-section .items", {
              rotation: `-=${offset}`,
            });
          } else {
            gsap.to(".skill-section .items", {
              rotation: `+=${2 * degree - offset}`,
            });
          }
        } else {
          if (Math.abs(rotation - start) < degree / 2) {
            gsap.to(".skill-section .items", {
              rotation: `+=${offset}`,
            });
          } else {
            gsap.to(".skill-section .items", {
              rotation: `-=${2 * degree - offset}`,
            });
          }
        }
      },
    });
  };

  const items = document.querySelectorAll(".portfolio-list li");
  const numItems = items.length;

  ScrollTrigger.create({
    trigger: ".skill-section",
    start: `top+=${numItems * 800} top`, // 섹션의 상단이 뷰포트의 상단에 도달할 때
    onEnter: init, // 섹션이 화면에 들어올 때 init 함수 호출
    once: true, // 한 번만 실행
  });

  draggable();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".portfolio-section",
      pin: true,
      pinSpacing: true,
      start: "top top",
      end: `+=${numItems * 800}`,
      scrub: 1,
    },
  });

  items.forEach((item, index) => {
    if (index === 0) {
      timeline.to(item, {
        x: 0,
        duration: 1,
        ease: "none",
      });
    } else {
      timeline.to(item, {
        x: `-${window.innerWidth - 16}px`, // 화면 너비만큼 이동
        duration: 1,
        ease: "none",
      });
    }
  });

  const skillData = [{
      title: "HTML",
      description: "Semantic Tag를 이용해서 HTMl로 레이아웃 구성 할 수 있습니다",
      type: "type01",
    },
    {
      title: "CSS",
      description: "Semantic Tag를 이용해서 HTMl로 레이아웃 구성 할 수 있습니다",
      type: "type03",
    },
    {
      title: "SCSS",
      description: "Semantic Tag를 이용해서 HTMl로 레이아웃 구성 할 수 있습니다",
      type: "type04",
    },
    {
      title: "Javascript",
      description: "Semantic Tag를 이용해서 HTMl로 레이아웃 구성 할 수 있습니다",
      type: "type05",
    },
    {
      title: "Jquery",
      description: "Semantic Tag를 이용해서 HTMl로 레이아웃 구성 할 수 있습니다",
      type: "type06",
    },
    {
      title: "Vue",
      description: "Semantic Tag를 이용해서 HTMl로 레이아웃 구성 할 수 있습니다",
      type: "type07",
    },
    {
      title: "Figma",
      description: "Semantic Tag를 이용해서 HTMl로 레이아웃 구성 할 수 있습니다",
      type: "type02",
    },
  ];

  // const cardItemArea = document.querySelector("#cardItemArea");

  // skillData.forEach((item) => {
  //   cardItemArea.innerHTML += `
  //   <div class="item">
  //           <div class="card ${item.type}">
  //             <dl class="text-list">
  //               <dt>${item.title}</dt>
  //               <dd>
  //                 ${item.description}
  //               </dd>
  //             </dl>
  //           </div>
  //         </div>
  //   `;
  // });

});