let opened = false;
let started = false;
window.addEventListener('message', async (event) => {
    let e = event.data;
    if (e.showCar) {
        let Speedo = document.querySelector('.carhud');
        let sValue = localStorage.getItem('hideSpeedo');
        if (sValue) {
            if (sValue == "truee") {
                Speedo.style.display = "none";
            } else {
                Speedo.style.display = "block";
            }          
        } else {
            $('.carhud').fadeIn(500);
        }
        if (!started) {
            setupAllComponents();
            started = true;
        }
        $('.healthTextt').html(Math.round(e.vehicleHealth*0.1) + "%");
        $('.gearBox').fadeIn(500);
        $('.gearTextt').html(Math.round(e.currentGear))
        $('.speedUnit').html(e.speedUnit.toUpperCase());
        $('.speedText').html(Math.round(e.speed));
        $('.fuelBottom').css('width', `${e.fuel}%`)
        $('.fuelTextt').html(Math.round(e.fuel)+"%")
        if (e.action == "openEditor") {
            $('.modal').show();
            $('.modal').draggable();
            if (!opened) {
                configureSpeedometerSettings();
                opened = true;
            }
        } else if (e.action == "closeEditor") {
            $('.modal').hide();
            opened = false;
        }
    } else {
        $('.carhud').hide();
        $('.gearBox').fadeOut(500);
        started = false;
    }
});
function setupAllComponents() {
    let sValueSpeedo = document.querySelector('#flexCheckIndeterminate');
    let sValue = localStorage.getItem('hideSpeedo');
    if (sValue) {
        if (sValue == "truee") {
            sValueSpeedo.checked = true;
        } else {
            sValueSpeedo.checked = false;
        }
    } else {
        sValueSpeedo.checked = false;
    }
    let vFuelV = document.querySelector('#fuelflexCheckIndeterminate');
    let vFuelD = localStorage.getItem('hideFuel');
    let Gearbox = document.querySelector('.fuelText');
    let Gearbox1 = document.querySelector('.fuelBottom');
    if (vFuelD) {
        if (vFuelD == 'truee') {
            Gearbox.style.display = "none";
            Gearbox1.style.display = "none";
            $('.health').css('display', 'none');
            $('.carhud').css('height', 'calc(100% - 95%)');
            $('.carhud').css('width', 'calc(100% - 92.5%)')
            vFuelV.checked = true;
        } else {
            vFuelV.checked = false;
            Gearbox.style.display = "block";
            Gearbox1.style.display = "block";
            $('.health').css('display', 'block');

            $('.carhud').css('height', 'calc(100% - 87.5%)');
            $('.carhud').css('width', 'calc(100% - 85%)')
        }
    } else {
        Gearbox.style.display = "block";
        Gearbox1.style.display = "block";
        $('.carhud').css('height', 'calc(100vh - 87.5%)');
        $('.carhud').css('width', 'calc(100% - 85%)')
    }
    // if (value == 'truee') {
    //     Gearbox.style.display = "none";
    //     Gearbox1.style.display = "none";
    //     $('.carhud').css('height', 'calc(100% - 92.5%)');
    // } else {
    //     Gearbox.style.display = "block";
    //     Gearbox1.style.display = "block";
    //     $('.carhud').css('height', 'calc(100vh - 87.5%)');
    // }
    let sValueGear = document.querySelector('.gearBox');
    let sValueGeC = document.getElementById('GearflexCheckIndeterminate');
    let sValueGe = localStorage.getItem('hideGearbox');
    if (sValueGe) {
        if (sValueGe == 'truee') {
            sValueGeC.checked = true;
            sValueGear.style.display = "none";
        } else {
            sValueGeC.checked = false;
            sValueGear.style.display = "block";
        }
    } else {
        sValueGeC.checked = false;
        sValueGear.style.display = "block";
    }
    let currentFontSize = localStorage.getItem('currentFontSize'); // get current font size from localStorage
    let curFont = 8; // current font size value, not real size from localStorage only to change it later from localStorage
    if (currentFontSize) {
        curFont = currentFontSize;
    } else {
        curFont = 52;
    }
    $('.speed').css('font-size', curFont+"px");
    let curBgColor = "black";
    let currentbgColor = localStorage.getItem('currentBgColor'); // get current font size from localStorage // current font size value, not real size from localStorage only to change it later from localStorage
    if (currentbgColor) {
        curBgColor = currentbgColor;
    } else {
        curBgColor = "black";
    }
    $('.carhud').css('background-color', curBgColor);
    let currentFontColor = localStorage.getItem('currentColorSpeed');
    let curColor = "white";
    if (currentFontColor) {
        curColor = currentFontColor;
    }else{
        curColor = "white";
    }
    $('.speed').css('color', curColor);
    $('.fuelText').css('color', curColor);
    $('.healthText').css('color', curColor);
    let curSpeedFont = "black";
    let currentSpeedFont = localStorage.getItem('currentSpeedFont'); // get current font size from localStorage // current font size value, not real size from localStorage only to change it later from localStorage
    if (currentSpeedFont) {
        curSpeedFont = currentSpeedFont;
    } else {
        curSpeedFont = "Gobold";
    }
    $('.speed').css('font-family', curSpeedFont)
}
function configureSpeedometerSettings() {
    let selectMenu = $('.fontSelection');
    let fontSizes = [
        {
            name: '8px',
            value: 8
        },
        {
            name: '12px',
            value: 12
        },
        {
            name: '16px',
            value: 16
        },
        {
            name: '22px',
            value: 22
        },
        {
            name: '26px',
            value: 26
        },
        {
            name: '32px',
            value: 32
        },
        {
            name: '36px',
            value: 36
        },
        {
            name: '42px',
            value: 42
        },
        {
            name: '46px',
            value: 46
        },
        {
            name: '52px',
            value: 52
        }
    ];
    let currentFontSize = localStorage.getItem('currentFontSize'); // get current font size from localStorage
    let curFont = 8; // current font size value, not real size from localStorage only to change it later from localStorage
    if (currentFontSize) {
        curFont = currentFontSize;
    } else {
        curFont = 52;
    }
    let appendableFontOptions = "<option selected disabled value='1'>Select the font size</option>\n";
    fontSizes.forEach((fontSizes) => {
        if (fontSizes.value == curFont) {
            appendableFontOptions += `<option disabled value="${fontSizes.value}">${fontSizes.name}</option>`;
        } else {
            appendableFontOptions += `<option value="${fontSizes.value}">${fontSizes.name}</option>`;
        }
    });
    selectMenu.html(appendableFontOptions);
    // Color Selection Box
    let speedColor = $('#speedColorSelectBox');
    let colorsList = [
        {
            code: 'black',
            name: 'Black'
        },
        {
            code: 'cyan',
            name: 'Cyan'
        },
        {
            code: 'white',
            name: 'White'
        },
        {
            code: 'blue',
            name: 'Blue'
        },
        {
            code: 'orange',
            name: 'Orange'
        },
        {
            code: 'yellow',
            name: 'Yellow'
        },
        {
            code: 'green',
            name: 'Green'
        },
        {
            code: 'red',
            name: 'Red'
        },
        {
            code: 'purple',
            name: 'Purple'
        },
        {
            code: 'magenta',
            name: 'Magenta'
        },
        {
            code: 'pink',
            name: 'Pink'
        },
        {
            code: 'whitesmoke',
            name: 'Whitesmoke'
        }
    ];
    let currentFontColor = localStorage.getItem('currentColorSpeed');
    let curColor = "white";
    if (currentFontColor) {
        curColor = currentFontColor;
    }else{
        curColor = "white";
    }
    let appendableColorList = "<option selected disabled value='1'>Select the font size</option>\n";
    colorsList.forEach((fontSizes) => {
        if (fontSizes.value == curColor) {
            appendableColorList += `<option disabled value="${fontSizes.code}">${fontSizes.name}</option>`;
        } else {
            appendableColorList += `<option value="${fontSizes.code}">${fontSizes.name}</option>`;
        }
    });
    speedColor.html(appendableColorList);
    let bgColor = $('#carhudBgColorSelectBox');
    let curBgColor = "black";
    let currentbgColor = localStorage.getItem('currentBgColor'); // get current font size from localStorage
    if (currentbgColor) {
        curBgColor = currentbgColor;
    } else {
        curBgColor = "black";
    }
    let appendableBgColorList = "<option selected disabled value='1'>Select the background color</option>\n";
    colorsList.forEach((fontSizes) => {
        if (fontSizes.value == curBgColor) {
            appendableBgColorList += `<option disabled value="${fontSizes.code}">${fontSizes.name}</option>`;
        } else {
            appendableBgColorList += `<option value="${fontSizes.code}">${fontSizes.name}</option>`;
        }
    });
    bgColor.html(appendableBgColorList)
    let speedFont = $('#speedFontSelectBox');
    let curSpeedFont = "black";
    let currentSpeedFont = localStorage.getItem('currentSpeedFont'); // get current font size from localStorage // current font size value, not real size from localStorage only to change it later from localStorage
    if (currentSpeedFont) {
        curSpeedFont = currentSpeedFont;
    } else {
        curSpeedFont = "Gobold";
    }
    let speedFontList = [
        {
            name: 'Gobold',
            code: 'Gobold'
        },
        {
            name: 'Arial',
            code: 'arial'
        },
        {
            name: 'Quicksand',
            code: 'quicksand'
        },
        {
            name: 'Oswald',
            code: 'oswald'
        }
    ];
    let appendableSpeedFontList = "<option selected disabled value='1'>Select the speed box font</option>\n";
    speedFontList.forEach((fontList) => {
        if (fontList.code == curSpeedFont) {
            appendableSpeedFontList += `<option disabled value="${fontList.code}">${fontList.name}</option>`;
        } else {
            appendableSpeedFontList += `<option value="${fontList.code}">${fontList.name}</option>`;
        }
    });
    speedFont.html(appendableSpeedFontList)
}
function setNewValuesToFont(type, v) {
    if (type == "size") {
        $('.speed').css('font-size', v+"px");
        configureSpeedometerSettings()
    } else if (type == "color") {
        let sText = document.querySelector('.speed');
        sText.style.color = v;
        configureSpeedometerSettings()
    } else if (type == "bgcolor") {
        let cColor = document.querySelector('.carhud');
        cColor.style.backgroundColor = v;
        configureSpeedometerSettings()
    } else if (type == "font") {
        let sText = document.querySelector('.speed');
        sText.style.fontFamily = v;
        configureSpeedometerSettings()
    }
}
function saveCurrentConfigValues() {
    var fontSizeE = document.getElementById("fontSizeSelectBox").value; // getting selected value from FontSizeSelectBox
    let fontSizeV;
    if (fontSizeE != 1) {
        fontSizeV = fontSizeE;
        localStorage.setItem('currentFontSize', fontSizeE);
        setNewValuesToFont('size', fontSizeE);
    }
    var fontCE = document.getElementById("speedColorSelectBox").value; // getting selected value from SpeedColorSelectBox
    let fontCV;
    if (fontCE != 1) {
        fontCV = fontCE;
        localStorage.setItem('currentColorSpeed', fontCE);
        setNewValuesToFont('color', fontCE);
        $('.fuelText').css('color', fontCE);
        $('.healthText').css('color', fontCE);

    }
    var bgCE = document.getElementById('carhudBgColorSelectBox').value;
    let bgCV;
    if (bgCE != 1) {
        bgCV = bgCE;
        localStorage.setItem('currentBgColor', bgCV);
        setNewValuesToFont('bgcolor', bgCV);
    }
    var fontCE2 = document.getElementById('speedFontSelectBox').value;
    let fontCV2;
    if (fontCE2 != 1) {
        fontCV2 = fontCE2;
        localStorage.setItem('currentSpeedFont', fontCV2);
        setNewValuesToFont('font', fontCV2);
        console.log(fontCE2)
    }
}
function closeEditor() {
    if (opened) {
        $.post('https://zeskoCarhud/exitEditor', JSON.stringify({}));
    }
}
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        closeEditor()
    }
};
function setNewValue(type, value) {
    if (type == 'hideSpeedo') {
        localStorage.setItem('hideSpeedo', value);
        let Speedo = document.querySelector(".carhud");
        if (value == 'truee') {
            Speedo.style.display = "none";  
        } else {
            Speedo.style.display = "block";
        }
    } else if (type == 'hideGearbox') {
        localStorage.setItem('hideGearbox', value);
        let Gearbox = document.querySelector('.gearBox');
        if (value == 'truee') {
            Gearbox.style.display = "none";
        } else {
            Gearbox.style.display = "block";
        }
    } else if (type == "hideFuel") {
        localStorage.setItem('hideFuel', value);
        let Gearbox = document.querySelector('.fuelText');
        let Gearbox1 = document.querySelector('.fuelBottom');
        if (value == 'truee') {
            Gearbox.style.display = "none";
            Gearbox1.style.display = "none";
            $('.carhud').css('height', 'calc(100% - 95%)');
            $('.carhud').css('width', 'calc(100% - 92.5%)');
            $('.health').css('display', 'none');
        } else {
            Gearbox.style.display = "block";
            Gearbox1.style.display = "block";
            $('.carhud').css('height', 'calc(100vh - 87.5%)');
            $('.carhud').css('width', 'calc(100% - 85%)');
            $('.health').css('display', 'block');
        }
    }
}
function checkIfCheckedMoveSpeedo() {
    // Get the checkbox
    var checkBox = document.getElementById("flexCheckIndeterminate");
    // Get the output text
    var text = document.getElementById("text");
    console.log(checkBox.checked)
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
      setNewValue('hideSpeedo', "truee");
    } else {
        setNewValue('hideSpeedo', "falsee")
    }
} 
function checkIfCheckedHideGearbox() {
    let checkBox = document.getElementById('GearflexCheckIndeterminate');
    console.log(checkBox.checked);
    if (checkBox.checked == true) {
        setNewValue('hideGearbox', 'truee');
    } else {
        setNewValue('hideGearbox', 'falsee');
    }
}

function checkIfCheckedFuel() {
    let checkBox = document.getElementById('fuelflexCheckIndeterminate');
    if (checkBox.checked == true) {
        setNewValue('hideFuel', 'truee');
    } else {
        setNewValue('hideFuel', 'falsee');
    }
}
