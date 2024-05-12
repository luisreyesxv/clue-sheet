const clue_sheet_cookie = 'clue_sheet1';
const journal_cookie = 'history_table';
const life_cookie = 'life-history';
const starting_life = 30;

function refresh_sheet(){

  let results = getCookie(clue_sheet_cookie);

  results && Object.keys(results).forEach((clue, index) => {
    let class_name = 'unchecked';
    switch (results[clue]) {
      case "x":
        class_name = 'x';
        $('#clue-sheet-' + clue).toggleClass('x').siblings().removeClass('checked');
        break
      case "!":
        class_name= 'checked';
        $('#clue-sheet-' + clue).toggleClass('checked').siblings().removeClass('x')
        break
      case "?":
        class_name = 'question';
        break;
      case "me":
        class_name = 'me';
        break;
      default:
        class_name = 'unchecked';
        $('#clue-sheet-' + clue).removeClass('x checked')
        
    }
    $('#sheet-row-' + clue).attr('class', class_name);
    $('#input-'+ clue).val(results[clue]).change();
  })
}


function save_sheet_to_cookie(id, value){
  let parsed_cookie = getCookie(clue_sheet_cookie);
  let saved_results = {};
  if(!Array.isArray(parsed_cookie) && Object.keys(parsed_cookie).length){
    saved_results = parsed_cookie;
  }

  let name = id.replaceAll(' ', '_');

  saved_results[name] = value;

  setCookie(clue_sheet_cookie,saved_results);
}

function save_life_to_cookie(status = 'lose'){
  let parsed_cookie = getCookie(life_cookie);
  let saved_results = {
    'life': starting_life,
    'history': []
  };
  let history = {date: '', amount: ''};

  let new_life = parseInt($('#life-change').val())

  if(!new_life && !Number.isInteger(new_life)){
    return;
  }

  if(status === 'gain'){
    new_life *= -1;
  }

  if(parsed_cookie?.history?.length){
    saved_results = parsed_cookie;
  }

  saved_results.life -= new_life;

  history.date = new Date().toLocaleString();
  history.amount = new_life;

  saved_results.history.unshift(history);

  if(saved_results.history.length >10){
    saved_results.history.length = 10;
  }


  setCookie(life_cookie,saved_results);
  refresh_life();
}

function refresh_life(){

  let results = getCookie(life_cookie) ||  {
    'life': starting_life,
    'history': []
  };

  let life_change_field = $('#life-change');
  let navbar_counter = $('#nav-life');
  let life_counter = $('#counter');

  life_change_field.val('');
  navbar_counter.text(results.life);
  life_counter.text(results.life);

  results.history.forEach((value, i)=>{
    let date = results.history[i].date;
    let amount = results.history[i].amount;

    if(amount > 0){
      amount = "-"+amount
    } else { 
      amount = '+' + (amount *-1);

    }
    $('#life-history-date-'+ i).text(date);
    $('#life-history-amount-'+ i).text(amount);
    $('#life-history-'+ i).show();

  })
}


function refresh_history(index){

  let results = getCookie(journal_cookie) || [];

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
  let parsed_cookie = getCookie(journal_cookie);
  let saved_results = [];
  if(parsed_cookie.length){
    saved_results = parsed_cookie;
  }
  if(index < 0){
    let temp = prepare_history_cookie_values(-1);
    if(Object.values(temp).join('')){
      saved_results.push(temp);
    } else {
      return;
    }
    
  } else {
    saved_results[index] = prepare_history_cookie_values(index)
  }

  setCookie(journal_cookie, saved_results);
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
  setCookie(clue_sheet_cookie, 1, -1);
  setCookie(journal_cookie, 1, -1);
  setCookie(life_cookie, 1, -1);
  location.reload();
}



// $(window).on('load', ()=> {
  $( document ).ready(()=>{
  refresh_history();
  refresh_sheet();
  refresh_life();
});
