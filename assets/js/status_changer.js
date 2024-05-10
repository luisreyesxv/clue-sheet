function statusButtonChanger (control) {
  const Data = [
    { status: 'unchecked', value: '' },
    { status: 'x', value: 'x' },
    { status: 'question', value: '?' },
    { status: 'checked', value: '!' }
  ]

  let index = Data.map(function (e) { return e.value }).indexOf(control.value)
  index++
  if ((index) >= Data.length) {
    index = 0
  }
  control.value = Data[index].value

  const clue = $(control).closest('td').siblings('.guess-component') // eslint-disable-line no-undef
  let name = clue.text().replaceAll(' ', '_');
  $("#sheet-row-" + name).attr('class', Data[index].status);


  save_sheet_to_cookie(name, Data[index].value)
  switch (Data[index].status) {
    case 'x':
      clue.toggleClass('x').siblings().removeClass('checked')
      break
    case 'checked':
      clue.toggleClass('checked').siblings().removeClass('x')
      break
    default:
      clue.removeClass('x checked')
  }
}

// Attach function to all checkboxes
window.onload = function () {
  const elements = document.getElementsByClassName('multi-checkbox')
  for (let i = 0; i < elements.length; i++) {
    elements[i].onclick = function () {
      statusButtonChanger(this)
    }
  }
}
