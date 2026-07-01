const MenuCube = document.querySelector(".MenuCube");
const Add = document.querySelector(".Add");
const DataFrame = document.querySelector(".DataFrame");

const ButtonCircle = document.querySelector(".Circle");
const TextScore = document.querySelector(".Score");
const CircleDown = document.querySelector(".CircleDown");
const TypeText = document.querySelector(".TypeText");

const BoxSelecting = document.querySelector(".BoxSelecting");
const Box = document.querySelectorAll(".Box");

const ExitCube = document.querySelector(".ExitCube");
const BoxAccept = document.querySelector(".BoxAccept");
const TextInfoForBoxAccept = document.querySelector(".TextInfoForBoxAccept");
const AcceptButton = document.querySelector(".AcceptButton");
const AcceptText = document.querySelector(".AcceptText");
const CancelButton = document.querySelector(".CancelButton");
const CancelText = document.querySelector(".CancelText");

let Open = false;
let Clicked = false;
let IsWindowOpen = false;
let Wait = false;

let URL = "https://backend-8wpx.onrender.com";

let Link = `${URL}/Dictionary`;
let Link2 = `${URL}/FrameTemple`;
let Link3 = `${URL}/Point`;
let Link4 = `${URL}/Save`;
let Link5 = `${URL}/SelectBox`;
let Link6 = `${URL}/WordNow`;
let Link7 = `${URL}/GetData`;

let indexFrames = 0;

function HoverDataFrame() {
    setTimeout(function () {
        document.querySelectorAll(".DataFrame").forEach(function (Frame) {
            if (Frame.getAttribute("DataAllow") == "true") {

                Frame.setAttribute("DataAllow", "false");

                Frame.addEventListener("pointerover", function () {
                    Frame.style.transform = "scale(0.9)";
                });

                Frame.addEventListener("pointerout", function () {
                    Frame.style.transform = "scale(1)";
                });

                Frame.addEventListener("click", async function () {
                    let back = await fetch(Link6, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id: localStorage.getItem("Player"),
                            IDFrame: Frame.getAttribute("id")
                        })
                    })

                    console.log("status:", back.status);

                    let l = await back.json();
                    
                    TypeText.textContent = l.Word1;
                    TextScore.textContent = l.Score1;

                    PageOneOut();
                    PageThreeIn();
                    CancelClicking();
                });
            }
        });
    }, 800);
}

setTimeout(function() {
    if (!localStorage.getItem("Player")) {
        function Id() {
            let Result_ID = "";
            let Word = [
                "q", "w", "e", "r", "t", "y", "u", "+",
                "i", "o", "p", "a", "s", "d", "f", "g",
                "h", "j", "k", "l", "z", "x", "c", "v",
                "b", "n", "m", "Q", "W", "E", "R", "T",
                "Y", "U", "I", "O", "P", "A", "S", "D",
                "F", "G", "H", "J", "K", "L", "Z", "X",
                "C", "V", "B", "N", "M", "1", "2", "3",
                "4", "5", "6", "7", "8", "9", "0", "!",
                "@", "#", "$", "^", "&", "*", "-", "?",
            ]

            for (let i = 0; i < 25; i++) {
                let RandomNumber = Math.floor(Math.random() * Word.length);
                Result_ID += Word[RandomNumber];
            }
            return Result_ID;
        }
        localStorage.setItem("Player", Id());

        fetch(Link, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: localStorage.getItem("Player") })
        })
    } else {
async function GetDataPlayer() {
    let DataDictionary = await fetch(Link7, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({id: localStorage.getItem("Player")})
    })

    if (!DataDictionary.ok) {
        console.log("Player not found, skipping data load");
        return;
    }

    let On = await DataDictionary.json();

            for (i in On.Datas) {
                let FrameTemple = On.FrameTemple;
                let DataIndex = On.Datas[i];
                MenuCube.insertAdjacentHTML("beforeend", FrameTemple);
                let NewFrame = MenuCube.lastElementChild;

                NewFrame.querySelector(".DateCreate").textContent = DataIndex.DateCreate;
                NewFrame.querySelector(".TodayEnter").textContent = DataIndex.TodayEnter;
                NewFrame.querySelector(".TodayClock").textContent = DataIndex.TodayClock;
                NewFrame.querySelector(".CreateClock").textContent = DataIndex.CreateClock;
                NewFrame.querySelector(".Type").textContent = DataIndex.Word;
                NewFrame.querySelector(".Points").textContent = DataIndex.Score;
                
                NewFrame.setAttribute("id", i);
                NewFrame.setAttribute("DataAllow", "true")
                indexFrames ++;
            }
        }
        GetDataPlayer();
    }
    HoverDataFrame();
}, 25);
indexFrames = 0;

            // 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 
let ZINDEXs = [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10];

function DownAll() {
    MenuCube.style.zIndex = ZINDEXs[0];
    Add.style.zIndex = ZINDEXs[1];

    ButtonCircle.style.zIndex = ZINDEXs[2];
    TextScore.style.zIndex = ZINDEXs[3];
    CircleDown.style.zIndex = ZINDEXs[4];
    TypeText.style.zIndex = ZINDEXs[5];

    BoxSelecting.style.zIndex = ZINDEXs[6];
    document.querySelectorAll(".Box").forEach(function(Box) {
        Box.style.zIndex = ZINDEXs[7];
    });

    ExitCube.style.zIndex = ZINDEXs[8];
    BoxAccept.style.zIndex = ZINDEXs[9];
    TextInfoForBoxAccept.style.zIndex = ZINDEXs[10];
    AcceptButton.style.zIndex = ZINDEXs[11];
    AcceptText.style.zIndex = ZINDEXs[12];
    CancelButton.style.zIndex = ZINDEXs[13];
    CancelText.style.zIndex = ZINDEXs[14];
}
let Back = ZINDEXs;
ZINDEXs[0] = 12
ZINDEXs[1] = 11
DownAll();
ZINDEXs = Back;

function FrameDown() {
    document.querySelectorAll(".DataFrame").forEach(function(Frame) {
        Frame.style.zIndex = 1;
    });
}

function FrameTop() {
    document.querySelectorAll(".DataFrame").forEach(function(Frame) {
        Frame.style.zIndex = 110;
    });
}

function Main() {
    DownAll();
    FrameTop();

    MenuCube.style.opacity = 1;
    Add.style.opacity = 1;

    MenuCube.style.zIndex = 3;
    Add.style.zIndex = 4;

    ButtonCircle.style.opacity = 0;
    TextScore.style.opacity = 0;
    CircleDown.style.opacity = 0;
    TypeText.style.opacity = 0;

    BoxSelecting.style.zIndex = 1;
    document.querySelectorAll(".Box").forEach(function(Box) {
        Box.style.opacity = 0;
    });

    ExitCube.style.opacity = 0;
    BoxAccept.style.opacity = 0;
}

setTimeout(function() {
    Main()
}, 10);

function PageOneIn() {
    DownAll();
    FrameTop()
    MenuCube.style.zIndex = 99;
    Add.style.zIndex = 100;

    let MenuCubeTransition = MenuCube.style.transition;
    let AddTransition = Add.style.transition

    MenuCube.style.transition = "0s";
    Add.style.transition = "0s";

    MenuCube.style.transform = "translate(0%,10%)";
    Add.style.transform = "translate(0%,370%)";

    MenuCube.style.opacity = "0";
    Add.style.opacity = "0";

    MenuCube.style.display = "grid";
    Add.style.display = "";

    setTimeout(function() {
        MenuCube.style.transition = "1s";
        Add.style.transition = "1s";

        MenuCube.style.transform = "translate(0%,0%)";
        Add.style.transform = "translate(0%,300%)";

        MenuCube.style.opacity = "1";
        Add.style.opacity = "1";

        setTimeout(function(){
            MenuCube.style.transition = MenuCubeTransition;
            Add.style.transition = AddTransition;
        }, 1025);
    }, 25);

}

function PageOneOut() {

    let MenuCubeTransition = MenuCube.style.transition;
    let AddTransition = Add.style.transition;

    setTimeout(function() {
        MenuCube.style.transition = "1s";
        Add.style.transition = "1s";

        MenuCube.style.transform = "translate(0%,20%)";
        Add.style.transform = "translate(0%,380%)";

        MenuCube.style.opacity = "0";
        Add.style.opacity = "0";

        MenuCube.style.transition = MenuCubeTransition;
        Add.style.transition = AddTransition;

        setTimeout(function(){
            MenuCube.style.transition = MenuCubeTransition;
            Add.style.transition = AddTransition;

            MenuCube.style.display = "none";
            Add.style.display = "none";
        }, 1000);

    }, 25);

}

function PageTooIn() {
    FrameDown()
    DownAll();
    BoxSelecting.style.zIndex = 99;

    document.querySelectorAll(".Box").forEach(function(Box) {
        Box.style.opacity = 1;
        Box.style.zIndex = 10;
    });
    
    let BoxSelectingTransition = BoxSelecting.style.transition;

    BoxSelecting.style.transition = "0s";
    BoxSelecting.style.opacity = "0";
    BoxSelecting.style.transform = "translate(0%,10%)";
    
    BoxSelecting.style.display = "grid";

    setTimeout(function() {
        BoxSelecting.style.transition = "0.75s";

        BoxSelecting.style.transform = "translate(0%,0%)";
        BoxSelecting.style.opacity = "1";
    }, 25);
}

function PageTooOut() {
    let BoxSelectingTransition = BoxSelecting.style.transition;
    setTimeout(function() {
        BoxSelecting.style.transition = "0.5s ";

        BoxSelecting.style.transform = "translate(0%,10%)";
        BoxSelecting.style.opacity = "0";
    }, 25);

    setTimeout(function() {
        BoxSelecting.style.display = "none";
    }, 1000);
}

function PageThreeIn() {
    FrameDown()
    DownAll();
    ButtonCircle.style.zIndex = 100;
    CircleDown.style.zIndex = 99;
    TextScore.style.zIndex = 99;
    TypeText.style.zIndex = 99;
    ExitCube.style.zIndex = 99;

    let ButtonCircleTransition = ButtonCircle.style.transition;

    ButtonCircle.style.transition = "0s";
    ButtonCircle.style.opacity = "0";
    ButtonCircle.style.transform = "translate(0%,10%)";

    CircleDown.style.transition = "0s";
    CircleDown.style.opacity = "0";
    CircleDown.style.transform = "translate(0%,30%)";

    TextScore.style.transition = "0s";
    TextScore.style.opacity = "0";
    TextScore.style.transform = "translate(-50%, -40%)";

    TypeText.style.transition = "0s";
    TypeText.style.opacity = "0";
    TypeText.style.transform = "translate(-50%, -40%)";

    ExitCube.style.transition = "0s";
    ExitCube.style.opacity = "0";
    ExitCube.style.transform = "translate(-50%, -40%)";

    ButtonCircle.style.display = "";
    CircleDown.style.display = "";
    TextScore.style.display = "";
    TypeText.style.display = "";
    ExitCube.style.display = "";

    setTimeout(function() {
        ButtonCircle.style.transition = "1s";

        ButtonCircle.style.transform = "translate(0%,0%)";
        ButtonCircle.style.opacity = "1";

        CircleDown.style.transition = "1s";

        CircleDown.style.transform = "translate(0%,20%)";
        CircleDown.style.opacity = "1";

        TextScore.style.transition = "1s";

        TextScore.style.transform = "translate(-50%, -50%)";
        TextScore.style.opacity = "1";

        TypeText.style.transition = "1s";

        TypeText.style.transform = "translate(-50%, -50%)";
        TypeText.style.opacity = "1";

        ExitCube.style.transition = "1s";

        ExitCube.style.transform = "translate(-50%, -50%)";
        ExitCube.style.opacity = "1";

        Clicked = true;

        setTimeout(function() {
            ButtonCircle.style.transition = "0.2s";
            ExitCube.style.transition = "0.2s";
            Clicked = false;
        }, 1000);
    }, 25);
}

function PageThreeOut() {
    let ButtonCircleTransition = ButtonCircle.style.transition;
    setTimeout(function() {
        ButtonCircle.style.transition = "1s ";

        ButtonCircle.style.transform = "translate(0%,10%)";
        ButtonCircle.style.opacity = "0";

        CircleDown.style.transition = "1s ";

        CircleDown.style.transform = "translate(0%,30%)";
        CircleDown.style.opacity = "0";

        TextScore.style.transition = "1s ";

        TextScore.style.transform = "translate(-50%, -40%)";
        TextScore.style.opacity = "0";
        
        TypeText.style.transition = "1s ";

        TypeText.style.transform = "translate(-50%, -40%)";
        TypeText.style.opacity = "0";

        ExitCube.style.transition = "1s ";

        ExitCube.style.transform = "translate(-50%, -40%)";
        ExitCube.style.opacity = "0";

        setTimeout(function() {
            ButtonCircle.style.transition = "0.2s";
        }, 1000);
    }, 25);

    setTimeout(function() {
        ButtonCircle.style.display = "none";
        CircleDown.style.display = "none";
        TextScore.style.display = "none";
        TypeText.style.display = "none";
        ExitCube.style.display = "none";
    }, 1000);
}

function OpenWindowAccept() {
    let BackTrans1 = ButtonCircle.style.transition;
    let BackTrans2 = CircleDown.style.transition;

    ButtonCircle.style.transition = "0s";
    CircleDown.style.transition = "0s";

    BoxAccept.style.zIndex = 3; 
    ButtonCircle.style.zIndex = 2;
    CircleDown.style.zIndex = 1;
    ExitCube.style.zIndex = 4;

    BoxAccept.style.display = "block";
    let BoxAcceptTransition = BoxAccept.style.transition;

    BoxAccept.style.transition = "0s";
    BoxAccept.style.transform = "translate(-50%, -30%)";
    BoxAccept.style.opacity = "0";

    setTimeout(function() {
        BoxAccept.style.transition = BoxAcceptTransition;
        BoxAccept.style.transform = "translate(-50%, -50%)";
        BoxAccept.style.opacity = "1";

        ButtonCircle.style.transition = BackTrans1;
        CircleDown.style.transition = BackTrans2;
    }, 25);
}

function CloseWindowAccept() {
    BoxAccept.style.transform = "translate(-50%, -20%)";
    BoxAccept.style.opacity = "0";

    setTimeout(function() {
        ButtonCircle.style.zIndex = 100;
        CircleDown.style.zIndex = 99;
        TextScore.style.zIndex = 99;
        TypeText.style.zIndex = 99;
        
        BoxAccept.style.display = "none";
    }, 300);
}

function CancelClicking() {
    document.body.style.pointerEvents = "none";
    setTimeout(function() {
        document.body.style.pointerEvents = "auto";
    }, 700);
}

Add.addEventListener("click", function() {
    if (Open == false) {
        Open = true;

        void MenuCube.offsetHeight;
        PageOneOut();
        CancelClicking();

        requestAnimationFrame(() => PageTooIn());

        setTimeout(async function () {
            let l = await fetch(Link2, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: localStorage.getItem("Player"),
                    Text: TypeText.textContent
                })
            })

            let h = await l.text();
            TextScore.textContent = 0;

            MenuCube.insertAdjacentHTML("beforeend", h);
            HoverDataFrame();
        }, 700)
    }
})

Add.addEventListener("pointerover", function() {
    Add.style.boxShadow = "0px 1px 0 #09b171";
    Add.style.transform = "translate(0,310%)";
})

Add.addEventListener("pointerout", function() {
    Add.style.boxShadow = "0px 5px 0 #09b171";
    Add.style.transform = "translate(0,300%)";
})

ButtonCircle.onclick = async function() {
    if (Clicked == false) {
        Clicked = true;
        
        ButtonCircle.style.transition = "0.2s";
        ButtonCircle.style.boxShadow = "0px 15px 0px #920532";
        ButtonCircle.style.transform = "translate(0%, 0%)"

        setTimeout(function () {
            ButtonCircle.style.boxShadow = "0px 2.5px 0px #920532";
            ButtonCircle.style.transform = "translate(0%, 10%)";
            ButtonCircle.style.transition = "0.4s";
        }, 200);

        let l = await fetch(Link3, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({id: localStorage.getItem("Player")})
        });
        
        TextScore.textContent = await l.text();

        setTimeout(function() {
            Clicked = false;
        }, 300);
    }
}

ButtonCircle.addEventListener("pointerover", function() {
    ButtonCircle.style.boxShadow = "0px 2.5px 0px #920532";
    ButtonCircle.style.transform = "translate(0%, 10%)";
})

ButtonCircle.addEventListener("pointerout", function(){
    ButtonCircle.style.boxShadow = "0px 15px 0px #920532";
    ButtonCircle.style.transform = "translate(0%, 0%)"
})

document.querySelectorAll(".Box").forEach(function(Box) {
    Box.addEventListener("pointerover", function() {
        Box.style.transform = "scale(0.9)";
    })

    Box.addEventListener("pointerout", function() {
        Box.style.transform = "scale(1)";
    })

    Box.onclick = async function() {   
        let Word = await fetch(Link5, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                id: localStorage.getItem("Player"),
                NumberFrame: Box.getAttribute("NumberFrameID")
            })
        })

        let CurrectWord = await Word.json();

        document.querySelectorAll(".DataFrame").forEach(function(Frame) {
            if (Frame.getAttribute("id") == CurrectWord.IDFrame) {
                Frame.querySelector(".Type").textContent = CurrectWord.Word;
                TypeText.textContent = CurrectWord.Type;
            }
        });

        PageTooOut();
        CancelClicking();

        setTimeout(function(){
            PageThreeIn();
            ButtonCircle.style.transition = "0.5s";
        }, 100);
    }
});

ExitCube.addEventListener("pointerover", function() {
    ExitCube.style.transform = "translate(-50%, -50%) scale(0.9)";
});

ExitCube.addEventListener("pointerout", function() {
    ExitCube.style.transform = "translate(-50%, -50%) scale(1)";
});

AcceptButton.addEventListener("pointerover", function() {
    AcceptButton.style.boxShadow = "0px 0px 0 #09b171";
    AcceptButton.style.transform = "translate(-50%, -45%)";
});

AcceptButton.addEventListener("pointerout", function() {
    AcceptButton.style.boxShadow = "0px 3px 0 #09b171";
    AcceptButton.style.transform = "translate(-50%, -50%)";
});

CancelButton.addEventListener("pointerover", function() {
    CancelButton.style.boxShadow = "0px 0px 0 #b1094c";
    CancelButton.style.transform = "translate(-50%, -45%)";
});

CancelButton.addEventListener("pointerout", function() {
    CancelButton.style.boxShadow = "0px 3px 0 #b1094c";
    CancelButton.style.transform = "translate(-50%, -50%)";
});

AcceptButton.addEventListener("click", async function() {
    PageOneIn();
    CloseWindowAccept();
    PageThreeOut();
    CancelClicking();

    IsWindowOpen = false;
    Open = false;

    let m = await fetch(Link4, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: localStorage.getItem("Player") })
    });

    console.log(m.status);
    let dic = await m.json();
    
    console.log(dic);

    document.querySelectorAll(".DataFrame").forEach(function (Box) {
        if (Box.getAttribute("id") == dic.IDframe) {
            console.log("Found");

            Box.querySelector(".DateCreate").textContent = dic.DateCreate1;
            Box.querySelector(".TodayEnter").textContent = dic.TodayEnter1;
            Box.querySelector(".TodayClock").textContent = dic.TodayClock1;
            Box.querySelector(".CreateClock").textContent = dic.CreateClock1;
            Box.querySelector(".Points").textContent = dic.Score;
            Box.querySelector(".Type").textContent = dic.Word;
        }
    });
});

CancelButton.addEventListener("click", function() {
    CloseWindowAccept();
});

ExitCube.addEventListener("click", function() {
    if (IsWindowOpen == false) {
        if (Wait == false) {
            OpenWindowAccept();
            CancelClicking();
            IsWindowOpen = true;
            Wait = true;

            setTimeout(function() {
                Wait = false;
            }, 500);
        }
    }
    else {
        if (Wait == false) {
            CloseWindowAccept();
            CancelClicking();
            IsWindowOpen = false;
            Wait = true;

            setTimeout(function() {
                Wait = false;
            }, 500);
        }
    }
});
