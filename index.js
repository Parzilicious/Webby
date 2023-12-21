var active;
var totalamt = 0;
var totalamt2 = 0;
sessionStorage.setItem('name2', document.getElementById('name').textContent);
sessionStorage.setItem('msgd2', document.getElementById('msgd').textContent);
sessionStorage.setItem('amtd2', document.getElementById('amtd').textContent);

document.addEventListener('click', function(event) {
    var on = event.target;
    var inputs = ['custom', 'custom2'];
    var buttons = ['1', '2', '3', '4', '2.1', '2.2', '2.3', '2.4'];

    if (on.tagName.toLowerCase() === 'button' && buttons.includes(on.id)) {
        console.log('Button with id ' + on.id + ' clicked.');
        active = on.id;
    }

    else if (on.tagName.toLowerCase() === 'input' && inputs.includes(on.id)) {
        console.log('Input with id ' + on.id + ' clicked.');
        active = on.id;
    }
});

var amt;
var amt2 =0; 
sessionStorage.setItem('amt', amt);
sessionStorage.setItem('amt2', amt2);

function donatecalc(){
    if(active === '1'){  
        amt = 50;
    }
    else if(active === '2'){
        amt = 100;
    }
    else if(active === '3'){
        amt = 500;
    }
    else if(active === '4'){
        amt = 10000;
    }
    else if(active === '2.1'){
        amt2 = 1000;
    }
    else if(active === '2.2'){
        amt2 = 2000;
    }
    else if(active === '2.3'){
        amt2 = 3000;
    }
    else if(active === '2.4'){
        amt2 = 5000;
    }
    else if(active === 'custom'){
        var custom = document.getElementById(active);
        if (!isNaN(parseFloat(custom.value))) {
            amt = parseFloat(custom.value);
        }
        else {
            alert('Input is not a number');
            return;
        }
    }
    else if(active === 'custom2'){
        var custom2 = document.getElementById(active);
        if (!isNaN(parseFloat(custom2.value))) {
            amt2 = parseFloat(custom2.value);
        }
        else {
            alert('Input is not a number');
            return;
        }
    }
    else {
        alert('Select a donation first');
        return;
    }

    var tree = ['1','2','3','4','custom'];
    var coral = ['2.1','2.2','2.3','2.4','custom2'];

    if (tree.includes(active)) {
        sessionStorage.setItem('kind', 'tree');
        sessionStorage.setItem('amt', amt);

        var totalamt = parseFloat(sessionStorage.getItem('totalamt'));
        totalamt += amt;
        sessionStorage.setItem('totalamt', totalamt.toString());
    
        console.log(totalamt);
    }
    else if (coral.includes(active)) {
        sessionStorage.setItem('kind', 'coral');
    
        var amt2Value = parseFloat(amt2) || 0;  
    
        sessionStorage.setItem('amt2', amt2Value);
    
        var totalamt2 = parseFloat(sessionStorage.getItem('totalamt2')) || 0;
        totalamt2 += amt2Value;
        sessionStorage.setItem('totalamt2', totalamt2.toString());
    
        console.log(totalamt2);
    }

    var info = document.getElementById('info');
      info.click();

}

console.log(sessionStorage.getItem('totalamt'));
console.log(sessionStorage.getItem('totalamt2'));

var pbar = document.getElementById('pbar');

function pbarTree() {
  var totalamt = parseFloat(sessionStorage.getItem('totalamt')) || 0;

  var limit = 1000000;
  var width = (totalamt / limit) * 100;
  width = Math.min(width, 100);

  pbar.style.setProperty('--width', width + '%');
  pbar.setAttribute('data-label', width + '%');
  console.log(width);
}

pbarTree();

var pbar2 = document.getElementById('pbar2');

function pbarCoral() {
  var totalamt2 = parseFloat(sessionStorage.getItem('totalamt2')) || 0;

  var limit = 1000000;
  var width = (totalamt2 / limit) * 100;
  width = Math.min(width, 100);

  pbar2.style.setProperty('--width', width + '%');
  pbar2.setAttribute('data-label2', width + '%');
  console.log(width);
}

pbarCoral();

var tree = ['1','2','3','4','custom'];
var coral = ['2.1','2.2','2.3','2.4','custom2'];

var nonoptional;

function donateinfo(){

    var fname = document.getElementById("fname");
    var lname = document.getElementById("lname");
    var card = document.getElementById("card");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");
    var msg = document.getElementById("msg");
    var amt1 = sessionStorage.getItem('amt');

    nonoptional = [card.value , email.value];

    if (nonoptional.some(field => field === "")) {
        alert('At least one required field is empty.');
        return;
    } else {
        console.log('All non-optional fields have values.');
        var sname = sessionStorage.getItem('name2');
        var smsgd = sessionStorage.getItem('msgd2');
        var samtd = sessionStorage.getItem('amtd2');
    
        sname = fname.value + '' + lname.value;
        smsgd = msg.value;
        samtd = amt1;

        sessionStorage.setItem('name3', sname);
        sessionStorage.setItem('msgd3', smsgd);
        sessionStorage.setItem('amtd3', samtd);

        console.log(sname);
        console.log(smsgd);
        console.log(samtd);

        var home = document.getElementById('homepage');
        home.click();

    }

}

var name3 = sessionStorage.getItem('name3');
var msgd3 = sessionStorage.getItem('msgd3');
var amtd3 = sessionStorage.getItem('amtd3');

var kind = sessionStorage.getItem('kind');
var treedon = document.getElementById('treedon');
var coraldon = document.getElementById('coraldon');

if (kind === 'tree'){
    var tdclone = treedon.cloneNode(true);

    var nameElement = tdclone.querySelector('#name');
    var msgdElement = tdclone.querySelector('#msgd');
    var amtdElement = tdclone.querySelector('#amtd');

        nameElement.textContent = name3;
        msgdElement.textContent = msgd3;
        amtdElement.textContent = amtd3 + ' trees';

        var hs = document.getElementById('history');
        hs.appendChild(tdclone);
}
else if (kind === 'coral'){
    var cdclone = coraldon.cloneNode(true);

    var nameElement = cdclone.querySelector('#name2');
    var msgdElement = cdclone.querySelector('#msgd2');
    var amtdElement = cdclone.querySelector('#amtd2');

    nameElement.textContent = name3;
    msgdElement.textContent = msgd3;
    amtdElement.textContent = amtd3 + ' corals';

    var hs2 = document.getElementById('history');
    hs2.appendChild(cdclone);
}


