function refresh_history(){

  let results = getCookie('history_table') || [];

  results.forEach((value,i)=>{
    console.log(i,value)

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


$(window).on('load', refresh_history);
// window.onload = function () {
//   refresh_history();

// }