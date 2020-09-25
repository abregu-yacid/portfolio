$(function(){
    insertUX();
    insertOptions();
    $("#navbar-option-mobile > button").on("click",toggleMobileOptions)
    $("#btnSeeUI").on("click",scrollToUI);
    $("#btnSeeFrontend").on("click",scrollToFrontend);
})
function toggleMobileOptions(){
    $("#options-mobile").toggle();
    $(this).toggleClass("mobile-button-active");
}
class Option{
    constructor(obj){
        this.title=obj.title;
        this.section = obj.section;
    }
    build(){
        const optionContainer=$("#grid-header-options");
        const other =$("#navbar-options");
        const mobile =$("#options-mobile");
        optionContainer
        .append($("<div>",{class:"option",html:this.title,
            click: makeScrollToSection(this.section)  }))
        other
        .append($("<div>",{class:"option",html:this.title,
            click: makeScrollToSection(this.section)  }))
        mobile
        .append($("<div>",{class:"option",html:this.title,
            click: makeScrollToSection(this.section)  }))
    
    }
}
function makeScrollToSection(section){
    
    
    return function(){
        $("#options-mobile").hide();
        $([document.documentElement, document.body])
        .animate({scrollTop:
            $(section).offset().top-56},1000)
    };

}
const scrollToUI=makeScrollToSection("#grid-general-ui")
const scrollToFrontend=makeScrollToSection("#grid-general-frontend");

class SectionPortfolio{
    constructor(obj){
        this.id = obj.id;
        this.title = obj.title;
        this.directory = obj.directory;
        this.images = obj.images;
        this.year = obj.year;
        this.description = obj.description;
        this.selectors = [];
        this.buttons = obj.buttons?obj.buttons:[] ;
    }
    buildUI(){
        this.build("#grid-general-ui");
    }
    buildFrontEnd(){
        this.build("#grid-general-frontend");
    }
    buildProject(){
        this.build("#grid-general-projects");
    }
    build(parent){
        const buttonShower = $("<div>",{class:"button-shower"});
        const imageShower = $("<div>",{class:"image-shower"});
        $(parent)
        .append($("<div>",{class:"section-shower"})
            .append(imageShower)
            .append($("<div>",{class:"description-shower"})
                .append($("<div>",{class:"title-shower",html:this.title})
                    .append($("<div>",{class:"year-shower",html:this.year})))
            .append($("<p>",{html:this.description}))
            .append(buttonShower)));

        this.buttons.forEach(function(val){
            buttonShower.append($("<button>",{html:val.title,click:val.click}));
        });
        //buttonShower.append($("<button>",{html:"Preview"}));
        this.images = this.images.map(x => $("<img>",{src:"images/"+this.directory+"/"+x}));
        this.images
        .forEach(x => imageShower.append(x));
        if(this.images.length > 1)
            this.insertImageSelector(imageShower);
    }
    insertImageSelector(imageContainer){
        const imageSelector=$("<div>",{class:"image-selector"});
        imageContainer.append(imageSelector);
        this.selectors = this.images
                        .map((x,y) => $("<i>",{class:"fa fa-circle",
                            click:()=>this.showImageInSelector(x,y)}))
        this.selectors
        .forEach(x => imageSelector.append(x));
        this.showImageInSelector(this.images[0],0);
    }
    showImageInSelector(x,y){
        this.images.forEach(z => z.hide());
        this.selectors.forEach((z,index) => {
            z.removeClass("fa-circle");
            z.removeClass("fa-circle-o");
            if(index === y){
                z.addClass("fa-circle");
            }else{
                z.addClass("fa-circle-o");
            }
        });
        x.fadeIn(1000);

    }
}
function insertOptions(){
    const listOptions=[
        {title:"Home",section:"#grid-general-start"},
        {title:"Projects",section:"#grid-general-projects"},
        {title:"Contact",section:"#grid-general-contact"},
    ]
    listOptions
    .map(z => new Option(z))
    .forEach(z => z.build());
}
function insertUX(){
    const listUI = [
        {id:"divs",title:"Upgrade from plain HTML",
        description:"The web application I worked on used static code and pre ES6 Javascript to "+
            "handle presentation, so I upgraded using modern frameworks", 
        directory:"ux",year:2017,
            images:["img1.png","img2.png","img4.png","img3.png"]},
        {id:"",title:"Improve Data import workflow",
        description:"Before, a user needed to copy all the cells from his Excel file and copy them "+
            "to the import window. After a few interface modifications, and upgrades in the backend, I manged to develop a "+
            " tool that allowed the user to upload the Excel file (based on a template) an quickly import his data.", 
        directory:"ux",year:2018,
            images:["img5.png","img6.png"]},
    ];
    const listFrontEnd = [
        {id:"",title:"Canvas signature",
        description:"Using canvas to create a signature in an HTML form and then save it as an image. Can be used from any device.", 
        directory:"frontend",year:2018,
            images:["img1.png","img2.png"]},
        {id:"",title:"Power BI for graphics",
        description:"After analazing client data in diverse areas of the company, "
        +"used Power BI to develop modern graphics in less time than using old frameworks.  ", 
        directory:"frontend",year:2018,
            images:["img5.png","img4.png"]},
        {id:"",title:"Modern Audit Checklist",
        description:"Clients needed to do audits to some areas in their companies, and they used Excel to keep track of all the improvements they needed. "
        +"This tool allowed them to have all their information integrated and with easy steps to follow.  ", 
        directory:"frontend",year:2017,
            images:["img6.png","img7.png"]},
            {id:"",title:"Kanban (organize tasks)",
            description:"The team I worked with, needed a more efficient way to handle tasks and the management needed to know how  "+
            " efficient the IT area was. So, instead of using emails and manual Excel sheets, I developed a tool to asign task to the programmers and "+
            " track when they start them, when they finished them and other characteristics that could be evaluated by management.", 
            directory:"frontend",year:2017,
                images:["img8.png"]},
       
    ];
    const listProject = [
        {id:"divs",title:"GOSST",
        description:"Is a web application developed by <a target='_blank' href='https://aswan.pe'>Aswan Technologies</a>. "+
        " While I worked there, I designed, developed, and analyzed safety software to comply with law requirements for "+
        "medium-sized companies. Contributed as key developer maintaining "+
        "coding standards and leading 2 junior developers .", 
        directory:"projects",year:2017,
            images:["gosst.png","aswan.jpg"]},
        {id:"divs",title:"Image Cropper",
        description:"Clients needed to modify the images they uploaded as logos, so I developed a toold"+
            " to help them crop their images using a fixed square, a circle or a variable rectangle as cropping frames", 
        directory:"projects",year:2020,
            images:["img5.png"]},
        {title:"Therapy Template",
        description:"A template I developed and design to be used as a way to "+
            " conect people with professional therapists.", 
        directory:"projects",year:2020,
        buttons:[{title:"Visit website",click:makeRedirectTo("https://abregu-yacid.github.io/therapy/")}],
            images:["img6.png"]},
        
    ];
    
    listProject
    .map(z => new SectionPortfolio(z))
    .forEach(y => y.buildProject())
    listUI
    .map(z => new SectionPortfolio(z))
    .forEach(y => y.buildUI())
    listFrontEnd
    .map(z => new SectionPortfolio(z))
    .forEach(y => y.buildFrontEnd())
}
function makeRedirectTo(link){
    return function(){
        window.open(link);
    }
}