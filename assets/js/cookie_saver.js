function refresh_sheet(){

  let results = getCookie('clue_sheet');

  results && Object.keys(results).forEach((clue, index) => {
    switch (results[clue]) {
      case "\u274c":
        $('#clue-sheet-' + clue).toggleClass('x').siblings().removeClass('checked');
        break
      case "\u2705":
        $('#clue-sheet-' + clue).toggleClass('checked').siblings().removeClass('x')
        break
      default:
        $('#clue-sheet-' + clue).removeClass('x checked')
    }
    
    $('#input-'+ clue).val(results[clue]).change();
   
  })
}

function save_sheet_to_cookie(id, value){
  let parsed_cookie = getCookie('clue_sheet');
  let saved_results = {};
  if(!Array.isArray(parsed_cookie) && parsed_cookie.length){
    saved_results = parsed_cookie;
  }

  let name = id.replace(' ', '_');

  saved_results[name] = value;

  setCookie('clue_sheet',saved_results);
}


function refresh_history(index){

  let results = getCookie('history_table') || [];

  if(index < 0 ){
    $('#player--1').text('');
    $('#suspect--1').text('');
    $('#hacker--1').val('').change();
    $('#virus--1').val('').change();
    $('#program--1').val('').change();
  }

  results.forEach((value,i)=>{

    $('#player-'+ i).text(results[i].player);
    $('#suspect-'+ i).text(results[i].suspect);
    $('#hacker-'+ i).val(results[i].hacker).change();
    $('#virus-'+ i).val(results[i].virus).change();
    $('#program-'+ i).val(results[i].program).change();
    $('#reveal-'+ i).val(results[i].reveal).change();

    $('#history-'+i).show();
  })


}

function save_history_to_cookie(index = -1){
  let parsed_cookie = getCookie('history_table');
  let saved_results = [];
  if(parsed_cookie.length){
    saved_results = parsed_cookie;
  }
  if(index < 0){
    saved_results.push(prepare_history_cookie_values(-1));
  } else {
    saved_results[index] = prepare_history_cookie_values(index)
  }

  setCookie('history_table', saved_results);
  refresh_history(index);

}

function prepare_history_cookie_values (key){
  let answer = {};

  let player = $('#player-'+ key).text();
  let suspect = $('#suspect-'+ key).text();
  let hacker = $('#hacker-'+ key).val();
  let virus = $('#virus-'+ key).val();
  let program = $('#program-'+ key).val();
  let reveal = $('#reveal-'+ key).val();

  answer = {
    player,
    suspect,
    hacker,
    virus,
    program,
    reveal
  }


  return answer;


}

function setCookie(cname, cvalue, exdays = 1) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString()+";";
  var cookie = [cname, '=', JSON.stringify(cvalue), '; domain=.', window.location.host.toString(), '; path=/;', expires].join('');
  document.cookie = cookie;
}

function getCookie(cname) {

    let result = document.cookie.match(new RegExp(cname + '=([^;]+)')) ?? '';
    result && (result = JSON.parse(result[1]));
    return result;

}

function reset_all_cookies(){
  setCookie('clue_sheet', 1, -1);
  setCookie('history_table', 1, -1);
  location.reload();
}


$(window).on('scroll',myFunction());

let navbar = document.getElementById("navbar");
let sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}


$(window).on('load', ()=> {
  refresh_history();
  refresh_sheet();
  
});
